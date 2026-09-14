import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth-utils";
import { getMockTestCatalog } from "@/lib/mock-test-catalog";
import { CourseMode } from "@/contexts/CourseContext";

/**
 * Admin-only endpoint returning eligible mock tests (completed ones, plus all Full Length Mock Tests)
 * for a course, as metadata only - no questions, answers or explanations are
 * sent in this response. Non-admins receive 403.
 */
export async function GET(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const courseParam = searchParams.get("course");
    const course: CourseMode = courseParam === "PS_GR_B" ? "PS_GR_B" : "LDCE_IP";

    const allTests = getMockTestCatalog().filter(m => m.course === course);
    // Include completed mock tests AND all Full Length mock tests (even if active)
    const availableTests = allTests.filter(m => m.completed || m.id.startsWith("fl-"));

    const tests = availableTests.map(({ id, title, examName, group, dateLabel, questionCount }) => ({
        id,
        title,
        examName,
        group,
        dateLabel,
        questionCount,
    }));

    return NextResponse.json({ course, tests });
}