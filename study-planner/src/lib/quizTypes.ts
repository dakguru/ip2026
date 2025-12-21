export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // Index 0-3
    explanation?: string;
}

export interface QuizSet {
    id: string; // e.g., 'set-1'
    title: string; // e.g., 'Set 1: Basic Provisions'
    questions: Question[];
}

export interface QuizTopic {
    id: string; // Matches syllabus ID preferably, e.g., 'p1-act-1'
    title: string;
    category: 'Paper I' | 'Paper II' | 'Paper III' | 'PYQ';
    sets: QuizSet[];
}
