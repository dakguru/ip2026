# Previous Year Questions (PYQ) System - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Data Structure](#data-structure)
5. [User Interface](#user-interface)
6. [Question Analysis](#question-analysis)
7. [Technical Implementation](#technical-implementation)
8. [User Guide](#user-guide)
9. [Developer Guide](#developer-guide)

---

## Overview

The Previous Year Questions (PYQ) System provides access to actual exam questions from past years, helping candidates understand exam patterns, frequently asked topics, and question difficulty levels.

### Purpose
- **Primary Goal**: Familiarize candidates with actual exam questions
- **Target Audience**: Postal service exam candidates
- **Content Type**: Previous year exam questions with solutions

### Key Characteristics
- **Year-wise Organization**: Questions grouped by exam year
- **Detailed Solutions**: Step-by-step explanations
- **Pattern Analysis**: Identify frequently asked topics
- **Difficulty Tracking**: Understand question complexity
- **Performance Comparison**: Compare with other candidates

---

## Features

### Core Features

#### 1. **Question Bank**
- Browse by exam year
- Filter by topic/subject
- Search specific questions
- Difficulty level indicators
- Frequency analysis

#### 2. **Practice Mode**
- Year-wise practice tests
- Topic-wise filtering
- Timed practice sessions
- Instant answer validation
- Detailed explanations

#### 3. **Analysis Dashboard**
- Topic frequency charts
- Difficulty distribution
- Year-wise trends
- Important topics identification
- Prediction insights

#### 4. **Performance Tracking**
- Accuracy by year
- Topic-wise performance
- Time management analysis
- Improvement tracking
- Weak area identification

#### 5. **Smart Recommendations**
- Suggested questions based on performance
- Priority topics to focus
- Similar questions grouping
- Revision recommendations

---

## Architecture

### Technology Stack

```
Frontend: Next.js 14 (React 18)
Charts: Recharts / Chart.js
Database: Supabase (PostgreSQL)
Analytics: Custom implementation
State Management: React Context + Zustand
```

### File Structure

```
src/
├── app/
│   └── pyq/
│       ├── page.tsx              # PYQ home
│       ├── [year]/
│       │   └── page.tsx          # Year-specific questions
│       ├── practice/
│       │   └── page.tsx          # Practice mode
│       └── analysis/
│           └── page.tsx          # Analysis dashboard
├── components/
│   └── pyq/
│       ├── YearCard.tsx          # Year selection card
│       ├── QuestionCard.tsx      # Question display
│       ├── AnalysisChart.tsx     # Analytics charts
│       ├── TopicFilter.tsx       # Filter component
│       └── SolutionView.tsx      # Solution display
├── lib/
│   ├── pyq-data.ts              # Questions data
│   ├── pyq-analytics.ts         # Analysis functions
│   └── pyq-utils.ts             # Utility functions
└── types/
    └── pyq.ts                   # TypeScript interfaces
```

---

## Data Structure

### PYQ Question Interface

```typescript
interface PYQQuestion {
    id: string;
    year: number;
    examName: string;
    questionNumber: number;
    section: string;
    topic: string;
    subtopic?: string;
    questionText: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    marks: number;
    negativeMarks?: number;
    timeToSolve: number; // seconds
    frequency: number; // how many times asked
    relatedQuestions: string[]; // IDs of similar questions
    tags: string[];
    source: string; // exam paper reference
}
```

### Exam Year Interface

```typescript
interface ExamYear {
    year: number;
    examDate: Date;
    totalQuestions: number;
    totalMarks: number;
    duration: number; // minutes
    sections: Section[];
    cutoffMarks: {
        general: number;
        obc: number;
        sc: number;
        st: number;
    };
    topicDistribution: Map<string, number>;
}

interface Section {
    name: string;
    questionCount: number;
    marks: number;
    topics: string[];
}
```

### User Attempt Interface

```typescript
interface PYQAttempt {
    id: string;
    userId: string;
    year: number;
    attemptDate: Date;
    answers: {
        questionId: string;
        selectedAnswer: 'A' | 'B' | 'C' | 'D';
        isCorrect: boolean;
        timeTaken: number;
    }[];
    score: number;
    percentage: number;
    rank?: number;
    analysis: AttemptAnalysis;
}

interface AttemptAnalysis {
    topicWiseScore: Map<string, number>;
    difficultyWiseScore: Map<string, number>;
    timeManagement: {
        averageTimePerQuestion: number;
        fastestQuestion: number;
        slowestQuestion: number;
    };
    comparisonWithCutoff: number;
}
```

---

## User Interface

### PYQ Home Screen

```
┌─────────────────────────────────────┐
│  Previous Year Questions            │
│  📊 Analysis  |  🎯 Practice        │
├─────────────────────────────────────┤
│                                     │
│  Select Exam Year:                  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 2024 Exam                   │   │
│  │ 100 Questions • 200 Marks   │   │
│  │ Attempted: 45/100 (45%)     │   │
│  │ Your Score: 72%             │   │
│  │ [View] [Practice] [Analysis]│   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 2023 Exam                   │   │
│  │ 100 Questions • 200 Marks   │   │
│  │ Attempted: 100/100 (100%)   │   │
│  │ Your Score: 78%             │   │
│  │ [View] [Practice] [Analysis]│   │
│  └─────────────────────────────┘   │
│                                     │
│  📈 Overall Statistics:             │
│  Total Attempted: 245/500           │
│  Average Score: 74%                 │
│  Strong Topics: PO Act, Money Order │
│  Weak Topics: PMLA, RMS             │
└─────────────────────────────────────┘
```

### Question View

```
┌─────────────────────────────────────┐
│ ← 2024 Exam        Q 25/100    ⭐   │
│ Topic: Post Office Act • Medium     │
├─────────────────────────────────────┤
│                                     │
│ Q25. What is the minimum deposit    │
│ required to open a Savings Account  │
│ under the Post Office Act, 2023?    │
│                                     │
│ ○ A. Rs. 50                         │
│ ○ B. Rs. 100                        │
│ ○ C. Rs. 500                        │
│ ○ D. Rs. 1000                       │
│                                     │
│ [Previous] [Show Answer] [Next]     │
│                                     │
│ 📊 Statistics:                      │
│ Asked: 3 times (2022, 2023, 2024)  │
│ Difficulty: Medium                  │
│ Average Time: 45 seconds            │
│ Success Rate: 68%                   │
└─────────────────────────────────────┘
```

### Analysis Dashboard

```
┌─────────────────────────────────────┐
│  PYQ Analysis Dashboard             │
├─────────────────────────────────────┤
│                                     │
│  Topic Frequency (Last 5 Years)     │
│  ┌─────────────────────────────┐   │
│  │ PO Act 2023    ████████ 35% │   │
│  │ Money Orders   ██████░░ 25% │   │
│  │ PMLA 2002      ████░░░░ 18% │   │
│  │ GSPR 2018      ███░░░░░ 12% │   │
│  │ Others         ██░░░░░░ 10% │   │
│  └─────────────────────────────┘   │
│                                     │
│  Difficulty Distribution            │
│  ┌─────────────────────────────┐   │
│  │ Easy: 40% | Medium: 45%     │   │
│  │ Hard: 15%                   │   │
│  │ [████████████░░░░░]         │   │
│  └─────────────────────────────┘   │
│                                     │
│  Trending Topics:                   │
│  🔥 Post Office Act (↑ 15%)        │
│  🔥 Digital Services (↑ 25%)       │
│  📉 Traditional Services (↓ 10%)   │
│                                     │
│  Predictions for 2026:              │
│  • High focus on PO Act 2023        │
│  • Digital initiatives questions    │
│  • Customer service scenarios       │
└─────────────────────────────────────┘
```

---

## Question Analysis

### Frequency Analysis

```typescript
function analyzeQuestionFrequency(questions: PYQQuestion[]): TopicFrequency[] {
    const topicCount = new Map<string, number>();
    
    questions.forEach(q => {
        const count = topicCount.get(q.topic) || 0;
        topicCount.set(q.topic, count + 1);
    });
    
    const totalQuestions = questions.length;
    
    return Array.from(topicCount.entries())
        .map(([topic, count]) => ({
            topic,
            count,
            percentage: (count / totalQuestions) * 100,
            trend: calculateTrend(topic, questions)
        }))
        .sort((a, b) => b.count - a.count);
}
```

### Difficulty Distribution

```typescript
function analyzeDifficulty(questions: PYQQuestion[]) {
    const distribution = {
        easy: 0,
        medium: 0,
        hard: 0
    };
    
    questions.forEach(q => {
        distribution[q.difficulty.toLowerCase()]++;
    });
    
    const total = questions.length;
    
    return {
        easy: { count: distribution.easy, percentage: (distribution.easy / total) * 100 },
        medium: { count: distribution.medium, percentage: (distribution.medium / total) * 100 },
        hard: { count: distribution.hard, percentage: (distribution.hard / total) * 100 }
    };
}
```

### Trend Analysis

```typescript
function calculateTrend(topic: string, questions: PYQQuestion[]): number {
    const years = [...new Set(questions.map(q => q.year))].sort();
    const recentYears = years.slice(-3); // Last 3 years
    const olderYears = years.slice(0, -3);
    
    const recentCount = questions.filter(q => 
        recentYears.includes(q.year) && q.topic === topic
    ).length;
    
    const olderCount = questions.filter(q =>
        olderYears.includes(q.year) && q.topic === topic
    ).length;
    
    const recentAvg = recentCount / recentYears.length;
    const olderAvg = olderYears.length > 0 ? olderCount / olderYears.length : 0;
    
    // Return percentage change
    return olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;
}
```

### Similar Questions Detection

```typescript
function findSimilarQuestions(
    question: PYQQuestion,
    allQuestions: PYQQuestion[]
): PYQQuestion[] {
    return allQuestions
        .filter(q => q.id !== question.id)
        .map(q => ({
            question: q,
            similarity: calculateSimilarity(question, q)
        }))
        .filter(item => item.similarity > 0.7) // 70% similarity threshold
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5)
        .map(item => item.question);
}

function calculateSimilarity(q1: PYQQuestion, q2: PYQQuestion): number {
    let score = 0;
    
    // Same topic
    if (q1.topic === q2.topic) score += 0.3;
    
    // Same subtopic
    if (q1.subtopic === q2.subtopic) score += 0.2;
    
    // Similar difficulty
    if (q1.difficulty === q2.difficulty) score += 0.1;
    
    // Common tags
    const commonTags = q1.tags.filter(tag => q2.tags.includes(tag));
    score += (commonTags.length / Math.max(q1.tags.length, q2.tags.length)) * 0.4;
    
    return score;
}
```

---

## Technical Implementation

### Data Loading

```typescript
async function loadPYQData(year: number): Promise<PYQQuestion[]> {
    const { data, error } = await supabase
        .from('pyq_questions')
        .select('*')
        .eq('year', year)
        .order('questionNumber', { ascending: true });
    
    if (error) throw error;
    return data;
}
```

### Practice Mode State

```typescript
interface PracticeState {
    questions: PYQQuestion[];
    currentIndex: number;
    answers: Map<string, string>;
    startTime: Date;
    isCompleted: boolean;
}

const usePracticeMode = (year: number) => {
    const [state, setState] = useState<PracticeState>({
        questions: [],
        currentIndex: 0,
        answers: new Map(),
        startTime: new Date(),
        isCompleted: false
    });
    
    useEffect(() => {
        loadPYQData(year).then(questions => {
            setState(prev => ({ ...prev, questions }));
        });
    }, [year]);
    
    const submitAnswer = (questionId: string, answer: string) => {
        setState(prev => ({
            ...prev,
            answers: new Map(prev.answers).set(questionId, answer)
        }));
    };
    
    return { state, submitAnswer };
};
```

### Analytics Calculation

```typescript
function generateAnalytics(attempts: PYQAttempt[]): PYQAnalytics {
    return {
        totalAttempts: attempts.length,
        averageScore: calculateAverageScore(attempts),
        topicWisePerformance: analyzeTopicPerformance(attempts),
        difficultyWisePerformance: analyzeDifficultyPerformance(attempts),
        timeManagement: analyzeTimeManagement(attempts),
        improvement: calculateImprovement(attempts),
        predictions: generatePredictions(attempts)
    };
}
```

---

## User Guide

### Practicing PYQs

1. **Select Exam Year**
   - Browse available years
   - Check question count and marks
   - View your previous attempts

2. **Start Practice**
   - Click "Practice" button
   - Choose practice mode (timed/untimed)
   - Begin answering questions

3. **Answer Questions**
   - Read question carefully
   - Select your answer
   - Use "Show Answer" to check
   - Read explanation thoroughly

4. **Complete Practice**
   - Submit all answers
   - View your score
   - Analyze performance
   - Review incorrect answers

### Using Analysis Dashboard

1. **View Topic Frequency**
   - See which topics appear most
   - Identify high-priority areas
   - Note trending topics

2. **Check Difficulty Distribution**
   - Understand question complexity
   - Plan preparation strategy
   - Focus on weak difficulty levels

3. **Track Trends**
   - See topic trends over years
   - Predict future exam focus
   - Adjust study plan accordingly

### Tips for PYQ Practice

- **Start with Recent Years**: Begin with latest exams
- **Analyze Patterns**: Look for recurring questions
- **Time Yourself**: Practice under exam conditions
- **Review Thoroughly**: Study all explanations
- **Track Progress**: Monitor improvement over time
- **Focus on Weak Areas**: Spend more time on difficult topics

---

## Developer Guide

### Adding New PYQ Data

#### Step 1: Prepare Question Data

```typescript
const pyq2024: PYQQuestion[] = [
    {
        id: 'pyq-2024-001',
        year: 2024,
        examName: 'IP 2024 - Paper I',
        questionNumber: 1,
        section: 'General Knowledge',
        topic: 'Post Office Act',
        subtopic: 'Definitions',
        questionText: 'What does "Post Office" mean under PO Act 2023?',
        options: {
            A: 'Any government office',
            B: 'Office for postal services',
            C: 'Courier service center',
            D: 'Telegraph office'
        },
        correctAnswer: 'B',
        explanation: 'Post Office means an office maintained for postal services...',
        difficulty: 'Easy',
        marks: 2,
        negativeMarks: 0.5,
        timeToSolve: 30,
        frequency: 1,
        relatedQuestions: [],
        tags: ['definitions', 'po-act', 'basics'],
        source: 'IP 2024 Paper I, Q1'
    },
    // ... more questions
];
```

#### Step 2: Import and Register

```typescript
// lib/pyq-data.ts
import { pyq2024 } from './pyq/2024';

export const pyqDatabase = {
    2024: pyq2024,
    2023: pyq2023,
    2022: pyq2022,
    // ... other years
};
```

#### Step 3: Update Metadata

```typescript
export const examYears: ExamYear[] = [
    {
        year: 2024,
        examDate: new Date('2024-03-15'),
        totalQuestions: 100,
        totalMarks: 200,
        duration: 180,
        sections: [
            {
                name: 'General Knowledge',
                questionCount: 40,
                marks: 80,
                topics: ['PO Act', 'Current Affairs', 'Geography']
            },
            // ... more sections
        ],
        cutoffMarks: {
            general: 120,
            obc: 115,
            sc: 110,
            st: 110
        },
        topicDistribution: new Map([
            ['Post Office Act', 35],
            ['Money Orders', 25],
            // ... more topics
        ])
    }
];
```

---

## Best Practices

### For Users
1. Solve PYQs after completing topics
2. Attempt year-wise for pattern recognition
3. Analyze mistakes thoroughly
4. Practice repeatedly until mastery
5. Use PYQ insights to guide study plan

### For Developers
1. Verify all answers with official keys
2. Provide detailed explanations
3. Tag questions accurately
4. Update frequency data regularly
5. Maintain consistent data format

---

## Future Enhancements

1. **AI-Powered Predictions**: ML models for exam predictions
2. **Video Solutions**: Video explanations for complex questions
3. **Peer Discussion**: Comment and discuss questions
4. **Custom Tests**: Create tests from PYQ pool
5. **Performance Comparison**: Compare with toppers
6. **Smart Revision**: AI-suggested revision schedule

---

**Document Version**: 1.0  
**Last Updated**: January 24, 2026  
**Maintained By**: Dak Guru Development Team
