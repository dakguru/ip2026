export type TopicType = 'heavy' | 'light' | 'practice' | 'mock' | 'revision';

export interface Topic {
    id: string;
    title: string;
    category: string;
    type: TopicType;
    duration?: number;
    tips?: string[]; // Custom tips for mastering this topic
}

export interface PlanItem {
    date: string; // ISO string
    title: string;
    type: TopicType;
    topicId?: string;
    isHoliday?: boolean;
    tips?: string[]; // Carried over from Topic
    category?: string;
}

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface ProgressRecord {
    completed: boolean;
    confidence: ConfidenceLevel | null;
    completedAt: string; // ISO string
}

export type ProgressData = Record<string, ProgressRecord>;
