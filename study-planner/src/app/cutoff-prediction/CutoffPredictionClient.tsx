"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import {
    ArrowLeft, Award, BarChart3, CheckCircle2, Crown, Download, FileCheck2, Gauge,
    Info, Loader2, Lock, Medal, PencilLine, Search, Share2, ShieldCheck, Sparkles, Target, TrendingUp, Trophy, Users,
} from "lucide-react";

// ─── Config ────────────────────────────────────────────────────────────────
const MAX = { paper1: 250, paper2: 50, paper3: 300 } as const;
const GRAND_TOTAL = MAX.paper1 + MAX.paper2 + MAX.paper3;
const TOKEN_KEY = "dg_cutoff_ldce_ip_2026_token";
const ANSWER_KEY_PDF = "/pdfs/LDCE_IP_2026_Provisional_Answer_Keys.pdf";

const CIRCLES = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "North East",
    "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Army Postal Service (Base Circle)",
];

const PAPERS = [
    { key: "paper1", label: "Paper I", max: MAX.paper1, hint: "Objective · verify with official key", from: "from-sky-400", to: "to-indigo-500", glow: "rgba(56,189,248,0.45)", text: "text-sky-300" },
    { key: "paper2", label: "Paper II", max: MAX.paper2, hint: "Descriptive · your honest estimate", from: "from-fuchsia-400", to: "to-pink-500", glow: "rgba(232,121,249,0.45)", text: "text-fuchsia-300" },
    { key: "paper3", label: "Paper III", max: MAX.paper3, hint: "Objective · verify with official key", from: "from-amber-300", to: "to-orange-500", glow: "rgba(251,191,36,0.45)", text: "text-amber-300" },
] as const;

type PaperKey = typeof PAPERS[number]["key"];
type IconType = ComponentType<{ className?: string }>;
const errorMessage = (e: unknown, fallback: string) => (e instanceof Error && e.message ? e.message : fallback);

interface Entry {
    id: string;
    rank: number;
    name: string;
    circle: string;
    paper1: number;
    paper2: number;
    paper3: number;
    total: number;
}

interface Mine extends Omit<Entry, "rank"> {
    rank: number;
    percentile: number;
}

interface Stats {
    count: number;
    average: Record<PaperKey | "total", number>;
    highest: Record<PaperKey | "total", number>;
    percentiles: { p50: number; p75: number; p90: number; p95: number };
    projection: { low: number; high: number; basis: string } | null;
    minEntriesForProjection: number;
    distribution: { from: number; to: number; count: number }[];
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0$/, ""));

function readToken() {
    try { return localStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; }
}
function writeToken(t: string) {
    try { localStorage.setItem(TOKEN_KEY, t); } catch { /* storage unavailable */ }
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function CutoffPredictionClient() {
    const [leaderboard, setLeaderboard] = useState<Entry[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [mine, setMine] = useState<Mine | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const [form, setForm] = useState({ name: "", circle: "", paper1: "", paper2: "", paper3: "", website: "" });
    const [declaration, setDeclaration] = useState(false);
    const [editing, setEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [query, setQuery] = useState("");
    const [copied, setCopied] = useState(false);

    const load = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const token = readToken();
            const res = await fetch(`/api/cutoff-prediction${token ? `?token=${encodeURIComponent(token)}` : ""}`, { cache: "no-store" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load");
            setLeaderboard(data.leaderboard || []);
            setStats(data.stats || null);
            setMine(data.mine || null);
            setLoadError("");
        } catch (e) {
            if (!silent) setLoadError(errorMessage(e, "Unable to load leaderboard."));
        } finally {
            if (!silent) setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
        const id = setInterval(() => load(true), 60000);
        return () => clearInterval(id);
    }, [load]);

    const marks = useMemo(() => {
        const parse = (v: string, max: number) => {
            if (v.trim() === "") return null;
            const n = Number(v);
            return Number.isFinite(n) && n >= 0 && n <= max ? n : NaN;
        };
        return {
            paper1: parse(form.paper1, MAX.paper1),
            paper2: parse(form.paper2, MAX.paper2),
            paper3: parse(form.paper3, MAX.paper3),
        };
    }, [form.paper1, form.paper2, form.paper3]);

    const liveTotal = (["paper1", "paper2", "paper3"] as PaperKey[]).reduce((sum, k) => {
        const v = marks[k];
        return sum + (typeof v === "number" && !Number.isNaN(v) ? v : 0);
    }, 0);

    const formValid = form.name.trim().length >= 2 &&
        (["paper1", "paper2", "paper3"] as PaperKey[]).every(k => typeof marks[k] === "number" && !Number.isNaN(marks[k])) &&
        declaration;

    const startEdit = () => {
        if (!mine) return;
        setForm({ name: mine.name, circle: mine.circle || "", paper1: String(mine.paper1), paper2: String(mine.paper2), paper3: String(mine.paper3), website: "" });
        setDeclaration(false);
        setEditing(true);
        setSuccess("");
        document.getElementById("predict")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!formValid) {
            setError("Please fill in your name, valid marks for all three papers and tick the declaration.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/cutoff-prediction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    circle: form.circle,
                    paper1: marks.paper1,
                    paper2: marks.paper2,
                    paper3: marks.paper3,
                    website: form.website,
                    declaration,
                    token: readToken(),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Submission failed");
            writeToken(data.token);
            setMine(data.mine);
            setEditing(false);
            setSuccess(data.updated ? "Your prediction has been updated." : "Your prediction is live on the leaderboard!");
            setForm({ name: "", circle: "", paper1: "", paper2: "", paper3: "", website: "" });
            setDeclaration(false);
            await load(true);
            setTimeout(() => document.getElementById("standing")?.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
        } catch (e) {
            setError(errorMessage(e, "Something went wrong. Please try again."));
        } finally {
            setSubmitting(false);
        }
    };

    const share = async () => {
        const url = typeof window !== "undefined" ? `${window.location.origin}/cutoff-prediction` : "https://dakguru.com/cutoff-prediction";
        const text = "LDCE IP 2026 Cut-Off Prediction — enter your marks & see the all-India leaderboard (no login needed)";
        try {
            if (navigator.share) {
                await navigator.share({ title: "LDCE IP 2026 Cut-Off Prediction", text, url });
                return;
            }
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* user cancelled */ }
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return leaderboard;
        return leaderboard.filter(e => e.name.toLowerCase().includes(q) || (e.circle || "").toLowerCase().includes(q));
    }, [leaderboard, query]);

    const showForm = !mine || editing;
    const podium = query ? [] : leaderboard.slice(0, 3);
    const rest = query ? filtered : leaderboard.slice(3);

    return (
        <div className="relative min-h-screen bg-[#06041a] text-white overflow-x-hidden font-sans selection:bg-fuchsia-500/40">
            {/* ── Ambient background ── */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-indigo-600/25 blur-[120px] cop-drift"></div>
                <div className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-fuchsia-600/20 blur-[120px] cop-drift [animation-delay:-6s]"></div>
                <div className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full bg-cyan-500/15 blur-[120px] cop-drift [animation-delay:-10s]"></div>
                <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)" }}></div>
            </div>

            {/* ── Top bar ── */}
            <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#06041a]/70 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/40 shadow-[0_0_15px_rgba(99,102,241,0.6)]">
                            <Image src="/dak-guru-new-logo.png" alt="Dak Guru" fill className="object-cover scale-110" />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">Dak Guru</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <a href="#leaderboard" className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                            <Trophy className="w-3.5 h-3.5" /> Leaderboard
                        </a>
                        <button onClick={share} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/10 text-xs font-bold transition-colors">
                            <Share2 className="w-3.5 h-3.5" /> {copied ? "Link copied" : "Share"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
                {/* ── Hero ── */}
                <section className="pt-12 sm:pt-20 pb-10 text-center cop-rise">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Live · Crowd-Sourced · No Login</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02]">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-fuchsia-300 to-cyan-300 cop-gradient-flow">LDCE IP 2026</span>
                        <span className="block text-white mt-1">Cut-Off Prediction</span>
                    </h1>
                    <p className="mt-5 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Enter your marks for all three papers, discover your all-India standing and help every candidate get a
                        clearer picture of the likely cut-off.
                    </p>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
                        <HeroStat icon={Users} label="Predictions" value={stats ? String(stats.count) : "—"} tint="text-sky-300" />
                        <HeroStat icon={Gauge} label="Average Total" value={stats?.count ? fmt(stats.average.total) : "—"} tint="text-fuchsia-300" />
                        <HeroStat icon={Crown} label="Highest" value={stats?.count ? fmt(stats.highest.total) : "—"} tint="text-amber-300" />
                        <HeroStat icon={Target} label="Max Marks" value={String(GRAND_TOTAL)} tint="text-emerald-300" />
                    </div>
                </section>

                {/* ── Verification notice ── */}
                <section className="cop-rise [animation-delay:120ms]">
                    <GradientFrame>
                        <div className="p-5 sm:p-8">
                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.4)]">
                                            <ShieldCheck className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Before you predict</p>
                                            <h2 className="text-xl sm:text-2xl font-extrabold">Feed only your genuine, verified marks</h2>
                                        </div>
                                    </div>
                                    <ol className="space-y-3 text-sm text-white/70">
                                        <Step n={1}>Take out your <b className="text-white">Carbonless Copy of the OMR Answer Sheet</b> for Paper I and Paper III.</Step>
                                        <Step n={2}>Download the <b className="text-white">Official Provisional Answer Keys</b> published by the Department of Posts and note your Question Booklet Series (A/B/C/D).</Step>
                                        <Step n={3}>Compare every response carefully, question by question, and compute your marks honestly.</Step>
                                        <Step n={4}>For <b className="text-white">Paper II</b> (descriptive), enter a realistic, conservative estimate.</Step>
                                    </ol>
                                    <p className="mt-4 text-xs text-white/45 leading-relaxed">
                                        Inflated or casual entries distort the prediction for everyone. The leaderboard is only as reliable as the data you feed.
                                    </p>
                                </div>

                                <div className="lg:w-[340px] shrink-0">
                                    <a href={ANSWER_KEY_PDF} target="_blank" rel="noopener noreferrer" download
                                        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 hover:border-emerald-300/40 transition-all">
                                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent cop-sweep pointer-events-none"></div>
                                        <div className="relative flex items-start gap-4">
                                            <div className="w-12 h-14 rounded-lg bg-gradient-to-b from-rose-500 to-red-700 flex flex-col items-center justify-center shadow-lg shrink-0">
                                                <FileCheck2 className="w-5 h-5 text-white" />
                                                <span className="text-[8px] font-black text-white/90 mt-0.5">PDF</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300 mb-1">Official · DoP (DE Section)</p>
                                                <p className="font-bold text-white leading-snug">Provisional Answer Keys — LDCE IP 2026</p>
                                                <p className="text-xs text-white/50 mt-1">Paper I &amp; Paper III · Letter dated 29.09.2026</p>
                                            </div>
                                        </div>
                                        <div className="relative mt-4 flex items-center justify-center gap-2 rounded-xl bg-white text-[#12093a] py-2.5 text-sm font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] transition-shadow">
                                            <Download className="w-4 h-4" /> Download Answer Key
                                        </div>
                                    </a>
                                    <p className="mt-3 text-[11px] text-white/45 leading-relaxed flex gap-1.5">
                                        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                        As per the DoP letter, objections on the provisional keys are to be sent in Annexure-I format to your Circle by 17:30 hrs on 06.10.2026.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </GradientFrame>
                </section>

                {/* ── Form + Standing ── */}
                <section id="predict" className="mt-10 grid lg:grid-cols-5 gap-6 scroll-mt-24">
                    <div className="lg:col-span-3 cop-rise [animation-delay:200ms]">
                        <Glass className="p-5 sm:p-8 h-full">
                            {showForm ? (
                                <form onSubmit={submit} noValidate>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-300">{editing ? "Update entry" : "Your prediction"}</p>
                                            <h2 className="text-2xl font-extrabold mt-1">Enter your marks</h2>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-white/45">
                                            <Lock className="w-3.5 h-3.5" /> No login required
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                        <Field label="Your Name" required>
                                            <input
                                                value={form.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                maxLength={60}
                                                placeholder="e.g. Arun Selvaraj"
                                                autoComplete="name"
                                                className="cop-input"
                                            />
                                        </Field>
                                        <Field label="Postal Circle">
                                            <select value={form.circle} onChange={e => setForm(f => ({ ...f, circle: e.target.value }))} className="cop-input appearance-none cursor-pointer">
                                                <option value="" className="bg-[#140c33]">Select circle (optional)</option>
                                                {CIRCLES.map(c => <option key={c} value={c} className="bg-[#140c33]">{c}</option>)}
                                            </select>
                                        </Field>
                                    </div>

                                    {/* Honeypot — hidden from humans */}
                                    <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} className="hidden" aria-hidden="true" />

                                    <div className="space-y-4">
                                        {PAPERS.map(p => {
                                            const v = marks[p.key];
                                            const invalid = typeof v === "number" && Number.isNaN(v);
                                            const pct = typeof v === "number" && !Number.isNaN(v) ? (v / p.max) * 100 : 0;
                                            return (
                                                <div key={p.key} className={`rounded-2xl border ${invalid ? "border-rose-400/60" : "border-white/10"} bg-white/[0.03] p-4 transition-colors focus-within:border-white/30`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-baseline gap-2">
                                                                <span className={`text-base font-extrabold ${p.text}`}>{p.label}</span>
                                                                <span className="text-[11px] text-white/40 font-semibold">out of {p.max}</span>
                                                            </div>
                                                            <p className="text-[11px] text-white/40 mt-0.5">{p.hint}</p>
                                                        </div>
                                                        <div className="relative w-28 sm:w-32">
                                                            <input
                                                                inputMode="decimal"
                                                                value={form[p.key]}
                                                                onChange={e => setForm(f => ({ ...f, [p.key]: e.target.value.replace(/[^0-9.]/g, "").slice(0, 6) }))}
                                                                placeholder="0"
                                                                aria-label={`${p.label} marks out of ${p.max}`}
                                                                className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2.5 pr-12 text-right text-xl font-black tabular-nums text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:ring-4 focus:ring-white/5"
                                                            />
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-white/35">/{p.max}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                                        <div className={`h-full rounded-full bg-gradient-to-r ${p.from} ${p.to} transition-[width] duration-500 ease-out`} style={{ width: `${Math.min(pct, 100)}%`, boxShadow: `0 0 12px ${p.glow}` }}></div>
                                                    </div>
                                                    {invalid && <p className="mt-2 text-[11px] font-semibold text-rose-300">Enter a value between 0 and {p.max}.</p>}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Live total */}
                                    <div className="mt-6 relative overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300 cop-gradient-flow">
                                        <div className="rounded-[calc(1rem-1.5px)] bg-[#0d0828] px-5 py-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Grand Total</p>
                                                <p className="text-xs text-white/40 mt-0.5">{((liveTotal / GRAND_TOTAL) * 100).toFixed(1)}% of {GRAND_TOTAL}</p>
                                            </div>
                                            <p className="text-4xl font-black tabular-nums">
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-fuchsia-200 to-amber-200">{fmt(Math.round(liveTotal * 100) / 100)}</span>
                                                <span className="text-lg text-white/30 font-bold"> / {GRAND_TOTAL}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <label className="mt-6 flex items-start gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={declaration} onChange={e => setDeclaration(e.target.checked)} className="peer sr-only" />
                                        <span className="mt-0.5 w-5 h-5 shrink-0 rounded-md border border-white/25 bg-white/5 flex items-center justify-center peer-checked:bg-emerald-500 peer-checked:border-emerald-400 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-300 transition-colors">
                                            {declaration && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </span>
                                        <span className="text-[13px] leading-relaxed text-white/65 group-hover:text-white/80">
                                            I confirm these marks are my <b className="text-white">genuine prediction</b>, arrived at by comparing my Carbonless Copy of the OMR Sheet with the Official Provisional Answer Key.
                                        </span>
                                    </label>

                                    {error && <div className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}

                                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                        <button type="submit" disabled={submitting || !formValid}
                                            className="relative flex-1 overflow-hidden rounded-xl py-3.5 font-extrabold text-[15px] text-[#12093a] bg-gradient-to-r from-amber-200 via-white to-cyan-200 cop-gradient-flow shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all active:scale-[0.99]">
                                            <span className="relative inline-flex items-center justify-center gap-2">
                                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                                {submitting ? "Submitting…" : editing ? "Update My Prediction" : "Submit My Prediction"}
                                            </span>
                                        </button>
                                        {editing && (
                                            <button type="button" onClick={() => { setEditing(false); setError(""); }} className="rounded-xl px-5 py-3.5 font-bold text-sm text-white/70 border border-white/10 hover:bg-white/5">
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            ) : (
                                <div className="h-full flex flex-col justify-center text-center py-6">
                                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.45)] mb-5">
                                        <CheckCircle2 className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold">{success || "Your prediction is on the board"}</h2>
                                    <p className="text-sm text-white/55 mt-2 max-w-md mx-auto">
                                        Your entry is saved on this device. You can update it any time — for example after the final answer keys are published.
                                    </p>
                                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                                        <button onClick={startEdit} className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-sm bg-white/[0.07] border border-white/15 hover:bg-white/10">
                                            <PencilLine className="w-4 h-4" /> Edit my marks
                                        </button>
                                        <button onClick={share} className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-extrabold text-sm text-[#12093a] bg-white hover:bg-white/90">
                                            <Share2 className="w-4 h-4" /> {copied ? "Link copied" : "Invite fellow candidates"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Glass>
                    </div>

                    <div id="standing" className="lg:col-span-2 cop-rise [animation-delay:280ms]">
                        <StandingCard mine={mine} stats={stats} />
                    </div>
                </section>

                {/* ── Insights ── */}
                <section className="mt-10 cop-rise [animation-delay:340ms]">
                    <SectionTitle icon={BarChart3} eyebrow="Analytics" title="Cut-off insights" />
                    <div className="grid lg:grid-cols-5 gap-6">
                        <Glass className="lg:col-span-2 p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">Indicative cut-off zone</p>
                            {stats?.projection ? (
                                <>
                                    <p className="mt-3 text-5xl font-black tabular-nums">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-300">{fmt(stats.projection.low)}</span>
                                        <span className="text-white/30 text-3xl mx-2">–</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300">{fmt(stats.projection.high)}</span>
                                    </p>
                                    <p className="text-xs text-white/45 mt-2">out of {GRAND_TOTAL} · based on {stats.count} predictions</p>
                                </>
                            ) : (
                                <>
                                    <p className="mt-3 text-3xl font-black text-white/80">Gathering data…</p>
                                    <p className="text-xs text-white/45 mt-2">
                                        The zone unlocks after {stats?.minEntriesForProjection ?? 20} predictions
                                        {stats ? ` (${stats.count} so far)` : ""}. Share the link to get there faster.
                                    </p>
                                </>
                            )}
                            <div className="mt-6 space-y-2.5">
                                <Benchmark label="Top 5% scored above" value={stats?.count ? stats.percentiles.p95 : null} color="bg-amber-300" />
                                <Benchmark label="Top 10% scored above" value={stats?.count ? stats.percentiles.p90 : null} color="bg-pink-400" />
                                <Benchmark label="Top 25% scored above" value={stats?.count ? stats.percentiles.p75 : null} color="bg-fuchsia-400" />
                                <Benchmark label="Median total" value={stats?.count ? stats.percentiles.p50 : null} color="bg-sky-400" />
                            </div>
                            <p className="mt-5 text-[11px] text-white/40 leading-relaxed">
                                Method: the zone spans the 75th–90th percentile of totals submitted here. It is a crowd estimate only — the actual cut-off depends on vacancies, category-wise norms and the final answer keys.
                            </p>
                        </Glass>

                        <Glass className="lg:col-span-3 p-6">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">Score distribution</p>
                                {mine && <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>Your band</span>}
                            </div>
                            <Distribution stats={stats} myTotal={mine?.total ?? null} />
                            <div className="mt-6 grid grid-cols-3 gap-3">
                                {PAPERS.map(p => (
                                    <div key={p.key} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
                                        <p className={`text-xs font-extrabold ${p.text}`}>{p.label}</p>
                                        <p className="mt-1.5 text-lg font-black tabular-nums">{stats?.count ? fmt(stats.average[p.key]) : "—"}<span className="text-xs text-white/35 font-bold"> avg</span></p>
                                        <p className="text-[11px] text-white/45 tabular-nums">Top: {stats?.count ? fmt(stats.highest[p.key]) : "—"} / {p.max}</p>
                                    </div>
                                ))}
                            </div>
                        </Glass>
                    </div>
                </section>

                {/* ── Leaderboard ── */}
                <section id="leaderboard" className="mt-14 scroll-mt-24 cop-rise [animation-delay:400ms]">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                        <SectionTitle icon={Trophy} eyebrow="All India" title="Toppers leaderboard" className="mb-0" />
                        <div className="relative sm:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name or circle" className="cop-input pl-10" />
                        </div>
                    </div>

                    {loading ? (
                        <Glass className="p-12 flex items-center justify-center gap-3 text-white/50"><Loader2 className="w-5 h-5 animate-spin" /> Loading leaderboard…</Glass>
                    ) : loadError ? (
                        <Glass className="p-10 text-center">
                            <p className="text-rose-200 font-semibold">{loadError}</p>
                            <button onClick={() => load()} className="mt-4 rounded-full px-5 py-2 text-sm font-bold bg-white/10 hover:bg-white/15">Retry</button>
                        </Glass>
                    ) : leaderboard.length === 0 ? (
                        <Glass className="p-12 text-center">
                            <Trophy className="w-10 h-10 text-amber-300/70 mx-auto mb-3" />
                            <p className="text-lg font-bold">Be the first on the board</p>
                            <p className="text-sm text-white/50 mt-1">Submit your verified marks above to open the leaderboard.</p>
                        </Glass>
                    ) : (
                        <>
                            {podium.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 sm:gap-5 items-end mb-6">
                                    {[podium[1], podium[0], podium[2]].map((e, i) => e ? <PodiumCard key={e.id} entry={e} place={[2, 1, 3][i] as 1 | 2 | 3} isMe={mine?.id === e.id} /> : <div key={i} />)}
                                </div>
                            )}

                            {rest.length > 0 && (
                                <Glass className="overflow-hidden">
                                    <div className="hidden sm:grid grid-cols-[64px_1fr_repeat(3,80px)_100px] gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/40 border-b border-white/[0.06]">
                                        <span>Rank</span><span>Candidate</span>
                                        <span className="text-right">P-I</span><span className="text-right">P-II</span><span className="text-right">P-III</span>
                                        <span className="text-right">Total</span>
                                    </div>
                                    <ul className="divide-y divide-white/[0.05]">
                                        {rest.map(e => <LeaderRow key={e.id} entry={e} isMe={mine?.id === e.id} />)}
                                    </ul>
                                </Glass>
                            )}
                            {query && filtered.length === 0 && (
                                <Glass className="p-8 text-center text-white/50 text-sm">No candidates match “{query}”.</Glass>
                            )}
                            <p className="mt-4 text-center text-[11px] text-white/35">Showing the top {leaderboard.length} predictions · refreshes automatically every minute</p>
                        </>
                    )}
                </section>

                {/* ── Disclaimer ── */}
                <section className="mt-14">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 flex gap-4">
                        <Info className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                        <div className="text-xs text-white/45 leading-relaxed space-y-2">
                            <p><b className="text-white/70">Disclaimer:</b> This is an unofficial, crowd-sourced prediction tool run by Dak Guru. Marks are self-reported by candidates and are not verified by Dak Guru or the Department of Posts. The indicative zone is a statistical estimate and is <b className="text-white/70">not</b> the official cut-off.</p>
                            <p>The official result, qualifying marks and cut-off will be notified only by the Department of Posts. Always rely on official notifications.</p>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}

// ─── Building blocks ───────────────────────────────────────────────────────
function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative rounded-3xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}>
            {children}
        </div>
    );
}

function GradientFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-400/70 via-sky-400/60 to-fuchsia-500/70 cop-gradient-flow shadow-[0_20px_70px_-25px_rgba(56,189,248,0.45)]">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-[#0b0724]/95 backdrop-blur-xl">{children}</div>
        </div>
    );
}

function HeroStat({ icon: Icon, label, value, tint }: { icon: IconType; label: string; value: string; tint: string }) {
    return (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md px-4 py-3.5 text-left">
            <div className="flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${tint}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">{label}</span>
            </div>
            <p className="mt-1.5 text-2xl font-black tabular-nums">{value}</p>
        </div>
    );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
    return (
        <li className="flex gap-3">
            <span className="w-6 h-6 shrink-0 rounded-full bg-white/[0.07] border border-white/15 text-[11px] font-black flex items-center justify-center text-white/80">{n}</span>
            <span className="leading-relaxed pt-0.5">{children}</span>
        </li>
    );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 mb-1.5">
                {label}{required && <span className="text-fuchsia-300"> *</span>}
            </span>
            {children}
        </label>
    );
}

function SectionTitle({ icon: Icon, eyebrow, title, className = "mb-6" }: { icon: IconType; eyebrow: string; title: string; className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white/80" />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{eyebrow}</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
            </div>
        </div>
    );
}

function Benchmark({ label, value, color }: { label: string; value: number | null; color: string }) {
    const pct = value !== null ? (value / GRAND_TOTAL) * 100 : 0;
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className="text-white/55 font-medium">{label}</span>
                <span className="font-black tabular-nums">{value !== null ? fmt(value) : "—"}</span>
            </div>
            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-[width] duration-700`} style={{ width: `${pct}%` }}></div>
            </div>
        </div>
    );
}

function StandingCard({ mine, stats }: { mine: Mine | null; stats: Stats | null }) {
    if (!mine) {
        return (
            <Glass className="p-6 sm:p-8 h-full flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">Your standing</p>
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                    <div className="relative w-28 h-28 mb-5">
                        <div className="absolute inset-0 rounded-full border border-dashed border-white/20 cop-spin-slow"></div>
                        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 flex items-center justify-center">
                            <TrendingUp className="w-9 h-9 text-white/60" />
                        </div>
                    </div>
                    <p className="font-bold text-lg">See where you stand</p>
                    <p className="text-sm text-white/50 mt-1.5 max-w-xs">Submit your marks to unlock your all-India rank, percentile and comparison with the indicative cut-off zone.</p>
                </div>
            </Glass>
        );
    }

    const zone = stats?.projection;
    const verdict = !zone ? null
        : mine.total >= zone.high ? { text: "Above the indicative zone", tone: "text-emerald-300 bg-emerald-400/10 border-emerald-300/25" }
            : mine.total >= zone.low ? { text: "Within the indicative zone", tone: "text-amber-200 bg-amber-400/10 border-amber-300/25" }
                : { text: "Below the indicative zone", tone: "text-rose-200 bg-rose-400/10 border-rose-300/25" };
    const pct = (mine.total / GRAND_TOTAL) * 100;
    const r = 52, c = 2 * Math.PI * r;

    return (
        <div className="relative h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-amber-300 via-fuchsia-400 to-cyan-400 cop-gradient-flow shadow-[0_20px_70px_-25px_rgba(232,121,249,0.55)]">
            <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#0d0828] p-6 sm:p-8">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-fuchsia-500/25 blur-[70px]"></div>
                <p className="relative text-[10px] font-black uppercase tracking-[0.2em] text-amber-200">Your standing</p>
                <p className="relative mt-1 font-bold text-white/85 truncate">{mine.name}{mine.circle ? <span className="text-white/40 font-medium"> · {mine.circle}</span> : null}</p>

                <div className="relative mt-6 flex items-center gap-6">
                    <div className="relative w-32 h-32 shrink-0">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                            <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
                            <circle cx="60" cy="60" r={r} stroke="url(#copRing)" strokeWidth="10" fill="none" strokeLinecap="round"
                                strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} className="transition-[stroke-dashoffset] duration-1000 ease-out" />
                            <defs>
                                <linearGradient id="copRing" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#fcd34d" /><stop offset="50%" stopColor="#e879f9" /><stop offset="100%" stopColor="#67e8f9" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black tabular-nums">{fmt(mine.total)}</span>
                            <span className="text-[10px] font-bold text-white/40">/ {GRAND_TOTAL}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">All-India rank</p>
                            <p className="text-3xl font-black tabular-nums">#{mine.rank}<span className="text-sm text-white/40 font-bold"> of {stats?.count ?? "—"}</span></p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">Percentile</p>
                            <p className="text-xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-200">{mine.percentile.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {verdict && (
                    <div className={`relative mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${verdict.tone}`}>
                        <Target className="w-3.5 h-3.5" /> {verdict.text}
                    </div>
                )}

                <div className="relative mt-6 grid grid-cols-3 gap-2">
                    {PAPERS.map(p => (
                        <div key={p.key} className="rounded-xl bg-white/[0.04] border border-white/[0.07] px-3 py-2.5">
                            <p className={`text-[10px] font-extrabold ${p.text}`}>{p.label}</p>
                            <p className="text-base font-black tabular-nums">{fmt(mine[p.key])}<span className="text-[10px] text-white/35">/{p.max}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Distribution({ stats, myTotal }: { stats: Stats | null; myTotal: number | null }) {
    const buckets = stats?.distribution ?? Array.from({ length: 12 }, (_, i) => ({ from: i * 50, to: i * 50 + 49, count: 0 }));
    const maxCount = Math.max(1, ...buckets.map(b => b.count));
    return (
        <div>
            <div className="flex items-end gap-1.5 sm:gap-2 h-44">
                {buckets.map((b, i) => {
                    const h = b.count ? Math.max(6, (b.count / maxCount) * 100) : 2;
                    const mineHere = myTotal !== null && myTotal >= b.from && (i === buckets.length - 1 || myTotal < buckets[i + 1].from);
                    const inZone = stats?.projection && b.to >= stats.projection.low && b.from <= stats.projection.high;
                    return (
                        <div key={i} className="group relative flex-1 h-full flex flex-col justify-end items-center">
                            <span className="absolute -top-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-white bg-black/60 rounded px-1.5 py-0.5 whitespace-nowrap -translate-y-full z-10">
                                {b.from}–{b.to}: {b.count}
                            </span>
                            <div
                                className={`w-full rounded-t-md cop-bar ${mineHere ? "bg-gradient-to-t from-emerald-600 to-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.6)]" : inZone ? "bg-gradient-to-t from-amber-600/80 to-pink-400/90" : "bg-gradient-to-t from-indigo-600/70 to-sky-400/80"}`}
                                style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
                            ></div>
                        </div>
                    );
                })}
            </div>
            <div className="flex gap-1.5 sm:gap-2 mt-2">
                {buckets.map((b, i) => (
                    <span key={i} className="flex-1 text-center text-[8px] sm:text-[10px] text-white/35 tabular-nums">{b.from}</span>
                ))}
            </div>
            {stats?.projection && (
                <p className="mt-3 text-[11px] text-white/45 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-amber-600 to-pink-400"></span> Bands overlapping the indicative cut-off zone</p>
            )}
        </div>
    );
}

function PodiumCard({ entry, place, isMe }: { entry: Entry; place: 1 | 2 | 3; isMe: boolean }) {
    const style = {
        1: { ring: "from-amber-200 via-yellow-400 to-amber-600", glow: "shadow-[0_0_50px_-5px_rgba(251,191,36,0.6)]", icon: Crown, iconTint: "text-amber-300", height: "pt-8 pb-7 sm:pt-10 sm:pb-9", label: "Champion" },
        2: { ring: "from-slate-100 via-slate-300 to-slate-500", glow: "shadow-[0_0_40px_-8px_rgba(203,213,225,0.45)]", icon: Medal, iconTint: "text-slate-200", height: "pt-6 pb-5 sm:pt-8 sm:pb-7", label: "2nd" },
        3: { ring: "from-orange-200 via-amber-600 to-orange-800", glow: "shadow-[0_0_40px_-8px_rgba(217,119,6,0.45)]", icon: Award, iconTint: "text-orange-300", height: "pt-5 pb-4 sm:pt-7 sm:pb-6", label: "3rd" },
    }[place];
    const Icon = style.icon;
    return (
        <div className={`relative rounded-2xl sm:rounded-3xl p-[1.5px] bg-gradient-to-b ${style.ring} ${style.glow} ${place === 1 ? "cop-rise" : ""}`}>
            <div className={`relative overflow-hidden rounded-[calc(1rem-1.5px)] sm:rounded-[calc(1.5rem-1.5px)] bg-[#0d0828] px-2 sm:px-5 text-center ${style.height}`}>
                {place === 1 && <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-amber-200/15 to-transparent cop-sweep pointer-events-none"></div>}
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto ${style.iconTint} drop-shadow-[0_0_10px_currentColor]`} />
                <p className="mt-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white/45">#{entry.rank} · {style.label}</p>
                <p className="mt-1.5 text-xs sm:text-base font-extrabold leading-tight line-clamp-2 break-words">{entry.name}</p>
                {entry.circle && <p className="text-[9px] sm:text-[11px] text-white/40 truncate mt-0.5">{entry.circle}</p>}
                <p className={`mt-2 sm:mt-3 text-xl sm:text-4xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b ${style.ring}`}>{fmt(entry.total)}</p>
                <p className="text-[9px] sm:text-[10px] text-white/35 font-bold">/ {GRAND_TOTAL}</p>
                {isMe && <span className="mt-2 inline-block rounded-full bg-emerald-400/15 border border-emerald-300/30 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-300">You</span>}
            </div>
        </div>
    );
}

function LeaderRow({ entry, isMe }: { entry: Entry; isMe: boolean }) {
    return (
        <li className={`grid grid-cols-[48px_1fr_auto] sm:grid-cols-[64px_1fr_repeat(3,80px)_100px] gap-2 items-center px-4 sm:px-5 py-3.5 transition-colors ${isMe ? "bg-emerald-400/[0.08]" : "hover:bg-white/[0.03]"}`}>
            <span className="text-sm font-black tabular-nums text-white/60">#{entry.rank}</span>
            <div className="min-w-0">
                <p className="font-bold truncate flex items-center gap-2">
                    {entry.name}
                    {isMe && <span className="rounded-full bg-emerald-400/15 border border-emerald-300/30 px-1.5 py-px text-[9px] font-black uppercase tracking-wider text-emerald-300">You</span>}
                </p>
                <p className="text-[11px] text-white/40 truncate">
                    {entry.circle || "—"}
                    <span className="sm:hidden"> · {fmt(entry.paper1)} / {fmt(entry.paper2)} / {fmt(entry.paper3)}</span>
                </p>
            </div>
            <span className="hidden sm:block text-right text-sm tabular-nums text-sky-200/80">{fmt(entry.paper1)}</span>
            <span className="hidden sm:block text-right text-sm tabular-nums text-fuchsia-200/80">{fmt(entry.paper2)}</span>
            <span className="hidden sm:block text-right text-sm tabular-nums text-amber-200/80">{fmt(entry.paper3)}</span>
            <span className="text-right">
                <span className="text-lg font-black tabular-nums">{fmt(entry.total)}</span>
            </span>
        </li>
    );
}
