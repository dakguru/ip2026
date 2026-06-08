import { QUIZ_DATA } from "@/data/quizzes";
import { PSGB_QUIZ_DATA } from "@/data/psgbQuizzesData";
import { QuizTopic, Question } from "@/lib/quizTypes";
import { CourseMode } from "@/contexts/CourseContext";

/**
 * Shared, browser-agnostic source of truth for the admin "Question Paper PDF"
 * feature. It reuses the exact same static topic data that powers the MCQ /
 * Quiz section (`QUIZ_DATA` for LDCE IP, `PSGB_QUIZ_DATA` for PS Gr B) so the
 * topic list, paper labels, question counts, ordering and "Coming Soon" state
 * stay perfectly in sync with the existing practice section. No duplicate topic
 * data is created here.
 *
 * Importable from both the server (admin API route) and the client (page +
 * PDF generators) because it has no browser dependencies.
 */

/** Lightweight metadata returned to the client / admin API (no answers). */
export interface QuestionPaperTopicMeta {
    id: string;
    title: string;
    paper: string;          // e.g. "Paper I" / "Paper III"
    questionCount: number;
    comingSoon: boolean;    // true when no questions are available yet
}

export interface QuestionPaperTopic extends QuestionPaperTopicMeta {
    questions: Question[];  // flattened in stored/displayed order
}

/** Resolve the static dataset for the active course (mirrors quiz/page.tsx). */
function dataForCourse(course: CourseMode): QuizTopic[] {
    return course === "PS_GR_B" ? PSGB_QUIZ_DATA : QUIZ_DATA;
}

/** Flatten a topic's sets into a single question list, preserving stored order. */
function flattenQuestions(topic: QuizTopic): Question[] {
    return topic.sets.flatMap((s) => s.questions);
}

/**
 * Returns every topic for the given course with its full question list, in the
 * same order they appear in the MCQ/Quiz section.
 */
export function getQuestionPaperTopics(course: CourseMode): QuestionPaperTopic[] {
    return dataForCourse(course).map((topic) => {
        const questions = flattenQuestions(topic);
        return {
            id: topic.id,
            title: topic.title,
            paper: topic.category,
            questionCount: questions.length,
            comingSoon: questions.length === 0,
            questions,
        };
    });
}

/** Strip a full topic down to metadata (safe to send over the wire). */
export function toTopicMeta(topic: QuestionPaperTopic): QuestionPaperTopicMeta {
    const { id, title, paper, questionCount, comingSoon } = topic;
    return { id, title, paper, questionCount, comingSoon };
}

/** Metadata-only list for the given course (used by the admin API). */
export function getQuestionPaperTopicMetas(course: CourseMode): QuestionPaperTopicMeta[] {
    return getQuestionPaperTopics(course).map(toTopicMeta);
}

/** Look up a single topic (with questions) by id for the given course. */
export function getQuestionPaperTopicById(
    course: CourseMode,
    topicId: string
): QuestionPaperTopic | undefined {
    return getQuestionPaperTopics(course).find((t) => t.id === topicId);
}
