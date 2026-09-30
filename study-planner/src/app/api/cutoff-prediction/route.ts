import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongoose";
import CutoffPrediction from "@/models/CutoffPrediction";
import { isAdmin } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

const EXAM = "LDCE_IP_2026";
const MAX = { paper1: 250, paper2: 50, paper3: 300 } as const;
const GRAND_TOTAL = MAX.paper1 + MAX.paper2 + MAX.paper3;
const LEADERBOARD_SIZE = 100;
const MIN_ENTRIES_FOR_PROJECTION = 20;
const CATEGORIES = ["UR", "ST", "SC", "PH"] as const;

function hashIp(req: Request) {
    const raw = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    return crypto.createHash("sha256").update(`${raw}|${process.env.IP_HASH_SALT || "dakguru-cutoff"}`).digest("hex");
}

function parseMark(value: unknown, max: number): number | null {
    if (value === "" || value === null || value === undefined) return null;
    const n = typeof value === "number" ? value : Number(String(value).trim());
    if (!Number.isFinite(n) || n < 0 || n > max) return null;
    // Allow quarter / half marks, store with 2 decimals
    return Math.round(n * 100) / 100;
}

function cleanText(value: unknown, maxLen: number) {
    return String(value ?? "")
        .replace(/[<>]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLen);
}

function percentile(sortedAsc: number[], p: number) {
    if (sortedAsc.length === 0) return 0;
    const idx = (sortedAsc.length - 1) * p;
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    const v = sortedAsc[lo] + (sortedAsc[hi] - sortedAsc[lo]) * (idx - lo);
    return Math.round(v * 100) / 100;
}

const avg = (arr: number[]) => arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100 : 0;

async function buildStats() {
    const all = await CutoffPrediction.find({ exam: EXAM, hidden: false })
        .select("paper1 paper2 paper3 total category")
        .lean<{ paper1: number; paper2: number; paper3: number; total: number; category?: string }[]>();

    const totals = all.map(e => e.total).sort((a, b) => a - b);
    const count = totals.length;

    // Histogram in 50-mark buckets (0–49, 50–99 … 550–600)
    const bucketSize = 50;
    const buckets = Array.from({ length: GRAND_TOTAL / bucketSize }, (_, i) => ({
        from: i * bucketSize,
        to: i === GRAND_TOTAL / bucketSize - 1 ? GRAND_TOTAL : (i + 1) * bucketSize - 1,
        count: 0,
    }));
    for (const t of totals) {
        const i = Math.min(Math.floor(t / bucketSize), buckets.length - 1);
        buckets[i].count++;
    }

    return {
        count,
        maxMarks: { ...MAX, total: GRAND_TOTAL },
        average: {
            paper1: avg(all.map(e => e.paper1)),
            paper2: avg(all.map(e => e.paper2)),
            paper3: avg(all.map(e => e.paper3)),
            total: avg(totals),
        },
        highest: {
            paper1: all.length ? Math.max(...all.map(e => e.paper1)) : 0,
            paper2: all.length ? Math.max(...all.map(e => e.paper2)) : 0,
            paper3: all.length ? Math.max(...all.map(e => e.paper3)) : 0,
            total: count ? totals[count - 1] : 0,
        },
        percentiles: {
            p50: percentile(totals, 0.5),
            p75: percentile(totals, 0.75),
            p90: percentile(totals, 0.9),
            p95: percentile(totals, 0.95),
        },
        // Crowd-sourced indicative band: 75th–90th percentile of submitted totals.
        projection: count >= MIN_ENTRIES_FOR_PROJECTION
            ? { low: percentile(totals, 0.75), high: percentile(totals, 0.9), basis: "P75–P90 of submitted totals" }
            : null,
        minEntriesForProjection: MIN_ENTRIES_FOR_PROJECTION,
        distribution: buckets,
        byCategory: CATEGORIES.map(category => {
            const t = all.filter(e => e.category === category).map(e => e.total).sort((a, b) => a - b);
            return {
                category,
                count: t.length,
                average: avg(t),
                highest: t.length ? t[t.length - 1] : 0,
                projection: t.length >= MIN_ENTRIES_FOR_PROJECTION
                    ? { low: percentile(t, 0.75), high: percentile(t, 0.9) }
                    : null,
            };
        }),
    };
}

interface StoredEntry {
    _id: unknown;
    name: string;
    circle: string;
    category?: string;
    paper1: number;
    paper2: number;
    paper3: number;
    total: number;
    hidden?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

async function findMine(token: string | null) {
    if (!token || token.length < 20) return null;
    const mine = await CutoffPrediction.findOne({ exam: EXAM, editToken: token })
        .select("name circle category paper1 paper2 paper3 total hidden createdAt updatedAt")
        .lean<StoredEntry>();
    if (!mine || mine.hidden) return null;
    const higher = await CutoffPrediction.countDocuments({ exam: EXAM, hidden: false, total: { $gt: mine.total } });
    const total = await CutoffPrediction.countDocuments({ exam: EXAM, hidden: false });
    const below = await CutoffPrediction.countDocuments({ exam: EXAM, hidden: false, total: { $lt: mine.total } });
    return {
        id: String(mine._id),
        name: mine.name,
        circle: mine.circle,
        category: mine.category || "",
        paper1: mine.paper1,
        paper2: mine.paper2,
        paper3: mine.paper3,
        total: mine.total,
        rank: higher + 1,
        percentile: total > 1 ? Math.round((below / (total - 1)) * 10000) / 100 : 100,
        updatedAt: mine.updatedAt,
    };
}

// Standard competition ranking (ties share a rank)
function rankEntries(entries: StoredEntry[]) {
    let lastTotal: number | null = null;
    let lastRank = 0;
    return entries.map((e, i) => {
        if (e.total !== lastTotal) { lastRank = i + 1; lastTotal = e.total; }
        return {
            id: String(e._id),
            rank: lastRank,
            name: e.name,
            circle: e.circle,
            category: e.category || "",
            paper1: e.paper1,
            paper2: e.paper2,
            paper3: e.paper3,
            total: e.total,
            createdAt: e.createdAt,
        };
    });
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const url = new URL(req.url);
        const token = url.searchParams.get("token");

        const [stats, mine, admin] = await Promise.all([buildStats(), findMine(token), isAdmin()]);

        // An entry already exists from this IP (e.g. submitted from another browser on the same connection).
        // Such visitors may not submit again, but they have contributed, so they can view the leaderboard.
        const ipSubmitted = !mine && !!(await CutoffPrediction.exists({ exam: EXAM, ipHash: hashIp(req) }));

        // The leaderboard is unlocked only for candidates who have submitted their marks.
        const locked = !mine && !ipSubmitted && !admin;
        const fetchTop = (extra: Record<string, unknown> = {}) => CutoffPrediction.find({ exam: EXAM, hidden: false, ...extra })
            .sort({ total: -1, createdAt: 1 })
            .limit(LEADERBOARD_SIZE)
            .select("name circle category paper1 paper2 paper3 total createdAt")
            .lean<StoredEntry[]>();

        const [overall, ...perCategory] = locked
            ? [[], ...CATEGORIES.map(() => [])] as StoredEntry[][]
            : await Promise.all([fetchTop(), ...CATEGORIES.map(category => fetchTop({ category }))]);

        const leaderboard = rankEntries(overall);
        // Category-wise toppers, ranked within the category
        const categoryLeaderboards = Object.fromEntries(CATEGORIES.map((c, i) => [c, rankEntries(perCategory[i])]));

        return NextResponse.json({ leaderboard, categoryLeaderboards, locked, ipSubmitted, stats, mine }, { headers: { "Cache-Control": "no-store" } });
    } catch (error) {
        console.error("Cutoff prediction GET error:", error);
        return NextResponse.json({ error: "Unable to load predictions right now." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));

        // Honeypot: bots fill hidden fields, humans don't.
        if (body.website) {
            return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
        }

        if (body.declaration !== true) {
            return NextResponse.json({ error: "Please confirm that your marks are verified against the official answer key." }, { status: 400 });
        }

        const name = cleanText(body.name, 60);
        const circle = cleanText(body.circle, 60);
        const category = typeof body.category === "string" ? body.category.trim().toUpperCase() : "";
        const paper1 = parseMark(body.paper1, MAX.paper1);
        const paper2 = parseMark(body.paper2, MAX.paper2);
        const paper3 = parseMark(body.paper3, MAX.paper3);

        if (name.length < 2) {
            return NextResponse.json({ error: "Please enter your name (at least 2 characters)." }, { status: 400 });
        }
        if (!(CATEGORIES as readonly string[]).includes(category)) {
            return NextResponse.json({ error: "Please select your category (UR / ST / SC / PH)." }, { status: 400 });
        }
        if (paper1 === null) return NextResponse.json({ error: `Paper I marks must be between 0 and ${MAX.paper1}.` }, { status: 400 });
        if (paper2 === null) return NextResponse.json({ error: `Paper II marks must be between 0 and ${MAX.paper2}.` }, { status: 400 });
        if (paper3 === null) return NextResponse.json({ error: `Paper III marks must be between 0 and ${MAX.paper3}.` }, { status: 400 });

        const total = Math.round((paper1 + paper2 + paper3) * 100) / 100;

        await dbConnect();
        const ipHash = hashIp(req);
        const token = typeof body.token === "string" ? body.token : "";

        // Update existing entry if the browser still holds its edit token
        if (token.length >= 20) {
            const existing = await CutoffPrediction.findOne({ exam: EXAM, editToken: token });
            if (existing && !existing.hidden) {
                existing.set({ name, circle, category, paper1, paper2, paper3, total });
                await existing.save();
                const mine = await findMine(token);
                return NextResponse.json({ success: true, updated: true, token, mine });
            }
        }

        // One entry per IP address. Hidden (moderated) entries still count, so spam can't simply be re-submitted.
        const alreadyFromIp = await CutoffPrediction.exists({ exam: EXAM, ipHash });
        if (alreadyFromIp) {
            return NextResponse.json({
                error: "A prediction has already been submitted from this IP address. Only one entry is allowed per candidate. If it is yours, you can edit it from the device you used to submit.",
                ipSubmitted: true,
            }, { status: 409 });
        }

        const duplicate = await CutoffPrediction.findOne({
            exam: EXAM, hidden: false,
            name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
            paper1, paper2, paper3,
        }).select("_id").lean();
        if (duplicate) {
            return NextResponse.json({ error: "An identical entry already exists on the leaderboard." }, { status: 409 });
        }

        const newToken = crypto.randomBytes(24).toString("hex");
        await CutoffPrediction.create({ exam: EXAM, name, circle, category, paper1, paper2, paper3, total, editToken: newToken, ipHash });

        const mine = await findMine(newToken);
        return NextResponse.json({ success: true, updated: false, token: newToken, mine }, { status: 201 });
    } catch (error) {
        console.error("Cutoff prediction POST error:", error);
        return NextResponse.json({ error: "Unable to save your prediction right now. Please try again." }, { status: 500 });
    }
}

// Admin moderation: hide an entry from the leaderboard (e.g. fake / abusive names)
export async function DELETE(req: Request) {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        const id = new URL(req.url).searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
        await dbConnect();
        await CutoffPrediction.updateOne({ _id: id, exam: EXAM }, { $set: { hidden: true } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Cutoff prediction DELETE error:", error);
        return NextResponse.json({ error: "Unable to remove entry." }, { status: 500 });
    }
}
