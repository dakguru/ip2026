import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth-utils";
import { getQuestionPaperTopicMetas } from "@/lib/question-paper-data";
import { CourseMode } from "@/contexts/CourseContext";

/**
 * Admin-only endpoint backing the "Question Paper PDF" page.
 *
 * Returns topic METADATA only (id, title, paper, question count, coming-soon
 * status) derived from the same static MCQ/Quiz dataset — deliberately WITHOUT
 * questions, answers or explanations, so no correct answers are ever exposed in
 * this response. A non-admin (or logged-out) caller hitting this route directly
 * receives 403.
 */
export async function GET(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const courseParam = searchParams.get("course");
    const course: CourseMode = courseParam === "PS_GR_B" ? "PS_GR_B" : "LDCE_IP";

    const topics = getQuestionPaperTopicMetas(course);
    return NextResponse.json({ course, topics });
}
