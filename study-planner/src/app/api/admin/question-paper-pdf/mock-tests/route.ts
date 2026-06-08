import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth-utils";
import { getCompletedMockTests } from "@/lib/mock-test-catalog";
import { CourseMode } from "@/contexts/CourseContext";

/**
 * Admin-only endpoint returning COMPLETED mock tests (with published questions)
 * for a course, as metadata only — no questions, answers or explanations are
 * sent in this response. Non-admins receive 403.
 */
export async function GET(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const courseParam = searchParams.get("course");
    const course: CourseMode = courseParam === "PS_GR_B" ? "PS_GR_B" : "LDCE_IP";

    const tests = getCompletedMockTests(course).map(({ id, title, examName, group, dateLabel, questionCount }) => ({
        id,
        title,
        examName,
        group,
        dateLabel,
        questionCount,
    }));

    return NextResponse.json({ course, tests });
}
