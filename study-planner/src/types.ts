export interface FlashCard {
    pdf_title: string;
    topic: string;
    card_no: number;
    question: string;
    answer: string;
    explanation?: string;
    exam_weight: "High" | "Medium" | "Low";
    keywords: string[];
    source_mcq_id?: string;
}
