# Study Planner System - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Data Structure](#data-structure)
5. [User Interface](#user-interface)
6. [Planning Algorithms](#planning-algorithms)
7. [Progress Tracking](#progress-tracking)
8. [Technical Implementation](#technical-implementation)
9. [User Guide](#user-guide)
10. [Developer Guide](#developer-guide)

---

## Overview

The Study Planner System is an intelligent scheduling and progress tracking tool designed to help Indian Postal Service exam candidates organize their preparation effectively. It creates personalized study schedules based on exam dates, available time, and syllabus coverage.

### Purpose
- **Primary Goal**: Create optimized study schedules for exam preparation
- **Target Audience**: Postal service exam candidates
- **Planning Type**: Adaptive, goal-oriented scheduling

### Key Characteristics
- **Intelligent Scheduling**: AI-powered schedule generation
- **Progress Tracking**: Real-time completion monitoring
- **Adaptive Planning**: Adjusts based on user performance
- **Multi-Topic Coverage**: Comprehensive syllabus management
- **Reminder System**: Notifications for study sessions

---

## Features

### Core Features

#### 1. **Schedule Generation**
- Input exam date and available study hours
- Automatic topic distribution
- Priority-based scheduling
- Revision cycles integration
- Buffer time allocation

#### 2. **Daily Study Plan**
- Today's tasks and topics
- Estimated time per topic
- Completion checkboxes
- Notes and highlights
- Resource links

#### 3. **Progress Dashboard**
- Overall completion percentage
- Topic-wise progress bars
- Time spent vs. planned
- Streak tracking
- Milestone achievements

#### 4. **Calendar View**
- Month/week/day views
- Color-coded topics
- Completed vs. pending tasks
- Revision schedule
- Mock test dates

#### 5. **Smart Reminders**
- Daily study notifications
- Topic-specific alerts
- Revision reminders
- Mock test notifications
- Motivational messages

---

## Architecture

### Technology Stack

```
Frontend: Next.js 14 (React 18)
State Management: React Context + Zustand
Calendar: React Big Calendar
Scheduling: Custom algorithm
Database: Supabase (PostgreSQL)
Notifications: Web Push API
```

### File Structure

```
src/
├── app/
│   └── planner/
│       ├── page.tsx              # Main planner view
│       ├── setup/
│       │   └── page.tsx          # Initial setup wizard
│       ├── calendar/
│       │   └── page.tsx          # Calendar view
│       └── progress/
│           └── page.tsx          # Progress dashboard
├── components/
│   └── planner/
│       ├── SetupWizard.tsx       # Setup flow
│       ├── DailyPlan.tsx         # Daily tasks
│       ├── ProgressCard.tsx      # Progress display
│       ├── CalendarView.tsx      # Calendar component
│       └── TopicCard.tsx         # Topic details
├── lib/
│   ├── planner-algorithm.ts     # Scheduling logic
│   ├── progress-tracker.ts      # Progress calculations
│   └── reminder-service.ts      # Notification system
└── types/
    └── planner.ts               # TypeScript interfaces
```

---

## Data Structure

### Study Plan Interface

```typescript
interface StudyPlan {
    id: string;
    userId: string;
    examDate: Date;
    createdAt: Date;
    updatedAt: Date;
    config: PlanConfig;
    schedule: DailySchedule[];
    progress: PlanProgress;
    status: 'active' | 'completed' | 'paused';
}
```

### Plan Configuration

```typescript
interface PlanConfig {
    totalDays: number;
    dailyStudyHours: number;
    weeklyOffDays: number[];
    revisionCycles: number;
    mockTestFrequency: 'weekly' | 'biweekly' | 'monthly';
    priorityTopics: string[];
    weakAreas: string[];
}
```

### Daily Schedule

```typescript
interface DailySchedule {
    date: Date;
    tasks: StudyTask[];
    totalPlannedTime: number;
    actualTimeSpent: number;
    completionRate: number;
    notes?: string;
}

interface StudyTask {
    id: string;
    topic: string;
    subtopic?: string;
    type: 'new' | 'revision' | 'practice' | 'test';
    estimatedTime: number;
    actualTime?: number;
    priority: 'high' | 'medium' | 'low';
    resources: string[];
    isCompleted: boolean;
    completedAt?: Date;
}
```

### Progress Tracking

```typescript
interface PlanProgress {
    overallCompletion: number;
    topicProgress: Map<string, TopicProgress>;
    dailyStreak: number;
    totalStudyTime: number;
    tasksCompleted: number;
    tasksTotal: number;
    milestones: Milestone[];
}

interface TopicProgress {
    topic: string;
    totalTasks: number;
    completedTasks: number;
    timeSpent: number;
    lastStudied: Date;
    mastery: number; // 0-100
}
```

---

## User Interface

### Setup Wizard

```
┌─────────────────────────────────────┐
│  Create Your Study Plan             │
├─────────────────────────────────────┤
│                                     │
│  Step 1: Exam Details               │
│  ┌─────────────────────────────┐   │
│  │ Exam Date: [DD/MM/YYYY]    │   │
│  │ Days Remaining: 90 days     │   │
│  └─────────────────────────────┘   │
│                                     │
│  Step 2: Study Schedule             │
│  ┌─────────────────────────────┐   │
│  │ Daily Hours: [4] hours      │   │
│  │ Weekly Off: ☑ Sunday        │   │
│  └─────────────────────────────┘   │
│                                     │
│  Step 3: Priorities                 │
│  ┌─────────────────────────────┐   │
│  │ ☑ Post Office Act           │   │
│  │ ☑ Money Orders              │   │
│  │ ☐ Postal Manual             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Previous]  [Next]  [Generate]    │
└─────────────────────────────────────┘
```

### Daily Plan View

```
┌─────────────────────────────────────┐
│  Today's Plan - Jan 24, 2026        │
│  ⏱️ 4 hours planned • 2h 30m done   │
├─────────────────────────────────────┤
│                                     │
│  ☑ Post Office Act (1h) ✓          │
│    - Definitions and terminology    │
│    - Completed at 10:30 AM          │
│                                     │
│  ☑ Money Orders (1h 30m) ✓         │
│    - Types and procedures           │
│    - Completed at 2:00 PM           │
│                                     │
│  ☐ Postal Manual Vol V (1h)        │
│    - Transit operations             │
│    - Scheduled: 4:00 PM             │
│                                     │
│  ☐ Practice Quiz (30m)             │
│    - Mixed topics                   │
│    - Scheduled: 5:00 PM             │
│                                     │
│  Progress: ████████░░ 62%          │
└─────────────────────────────────────┘
```

### Progress Dashboard

```
┌─────────────────────────────────────┐
│  Your Progress                      │
├─────────────────────────────────────┤
│                                     │
│  Overall: 45% Complete              │
│  ████████████░░░░░░░░░░░░░          │
│                                     │
│  📚 Topics Covered: 12/27           │
│  ⏱️ Study Time: 48h 30m             │
│  🔥 Current Streak: 7 days          │
│  ✅ Tasks Done: 156/347             │
│                                     │
│  Topic Progress:                    │
│  ┌─────────────────────────────┐   │
│  │ PO Act 2023    ████████ 80% │   │
│  │ Money Orders   ██████░░ 60% │   │
│  │ PMLA 2002      ████░░░░ 40% │   │
│  │ GSPR 2018      ██░░░░░░ 20% │   │
│  └─────────────────────────────┘   │
│                                     │
│  [View Calendar] [Adjust Plan]     │
└─────────────────────────────────────┘
```

---

## Planning Algorithms

### Schedule Generation Algorithm

```typescript
function generateStudyPlan(config: PlanConfig): DailySchedule[] {
    const {
        totalDays,
        dailyStudyHours,
        weeklyOffDays,
        revisionCycles,
        priorityTopics
    } = config;
    
    // 1. Calculate available study time
    const totalStudyHours = calculateTotalHours(
        totalDays,
        dailyStudyHours,
        weeklyOffDays
    );
    
    // 2. Allocate time for revisions and tests
    const revisionTime = totalStudyHours * 0.3; // 30% for revision
    const testTime = totalStudyHours * 0.1;     // 10% for tests
    const newTopicTime = totalStudyHours * 0.6; // 60% for new topics
    
    // 3. Distribute topics based on priority
    const topicAllocation = distributeTopics(
        newTopicTime,
        priorityTopics
    );
    
    // 4. Create daily schedules
    const schedule = createDailySchedules(
        totalDays,
        topicAllocation,
        revisionCycles,
        weeklyOffDays
    );
    
    // 5. Insert revision and test sessions
    insertRevisionSessions(schedule, revisionCycles);
    insertTestSessions(schedule, config.mockTestFrequency);
    
    return schedule;
}
```

### Topic Distribution

```typescript
function distributeTopics(
    availableTime: number,
    topics: Topic[]
): Map<string, number> {
    const allocation = new Map<string, number>();
    
    // Sort topics by priority and difficulty
    const sortedTopics = topics.sort((a, b) => {
        if (a.priority !== b.priority) {
            return b.priority - a.priority; // Higher priority first
        }
        return b.difficulty - a.difficulty; // Harder topics first
    });
    
    // Allocate time proportionally
    const totalWeight = sortedTopics.reduce(
        (sum, t) => sum + t.weight,
        0
    );
    
    sortedTopics.forEach(topic => {
        const timeShare = (topic.weight / totalWeight) * availableTime;
        allocation.set(topic.id, timeShare);
    });
    
    return allocation;
}
```

### Adaptive Rescheduling

```typescript
function adaptSchedule(
    currentSchedule: DailySchedule[],
    progress: PlanProgress
): DailySchedule[] {
    const today = new Date();
    const remainingSchedule = currentSchedule.filter(
        s => s.date >= today
    );
    
    // Identify weak areas
    const weakTopics = identifyWeakAreas(progress);
    
    // Reallocate time to weak areas
    const adjustedSchedule = reallocateTime(
        remainingSchedule,
        weakTopics
    );
    
    // Add extra revision for difficult topics
    insertExtraRevisions(adjustedSchedule, weakTopics);
    
    return adjustedSchedule;
}
```

---

## Progress Tracking

### Completion Calculation

```typescript
function calculateProgress(plan: StudyPlan): PlanProgress {
    const completedTasks = plan.schedule.flatMap(s => s.tasks)
        .filter(t => t.isCompleted);
    
    const totalTasks = plan.schedule.flatMap(s => s.tasks).length;
    
    const overallCompletion = (completedTasks.length / totalTasks) * 100;
    
    // Calculate topic-wise progress
    const topicProgress = new Map<string, TopicProgress>();
    
    plan.schedule.forEach(day => {
        day.tasks.forEach(task => {
            if (!topicProgress.has(task.topic)) {
                topicProgress.set(task.topic, {
                    topic: task.topic,
                    totalTasks: 0,
                    completedTasks: 0,
                    timeSpent: 0,
                    lastStudied: new Date(0),
                    mastery: 0
                });
            }
            
            const progress = topicProgress.get(task.topic)!;
            progress.totalTasks++;
            
            if (task.isCompleted) {
                progress.completedTasks++;
                progress.timeSpent += task.actualTime || 0;
                progress.lastStudied = task.completedAt || progress.lastStudied;
            }
        });
    });
    
    // Calculate mastery levels
    topicProgress.forEach(progress => {
        progress.mastery = calculateMastery(progress);
    });
    
    return {
        overallCompletion,
        topicProgress,
        dailyStreak: calculateStreak(plan),
        totalStudyTime: calculateTotalTime(completedTasks),
        tasksCompleted: completedTasks.length,
        tasksTotal: totalTasks,
        milestones: checkMilestones(overallCompletion)
    };
}
```

### Streak Calculation

```typescript
function calculateStreak(plan: StudyPlan): number {
    const sortedDays = plan.schedule
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    let streak = 0;
    const today = new Date();
    
    for (const day of sortedDays) {
        if (day.date > today) continue;
        
        if (day.completionRate > 0) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}
```

---

## Technical Implementation

### State Management

```typescript
// Using Zustand for planner state
interface PlannerStore {
    plan: StudyPlan | null;
    currentDay: DailySchedule | null;
    isLoading: boolean;
    
    // Actions
    createPlan: (config: PlanConfig) => Promise<void>;
    updateTask: (taskId: string, updates: Partial<StudyTask>) => void;
    markTaskComplete: (taskId: string) => void;
    adjustSchedule: () => void;
}

const usePlannerStore = create<PlannerStore>((set, get) => ({
    plan: null,
    currentDay: null,
    isLoading: false,
    
    createPlan: async (config) => {
        set({ isLoading: true });
        const schedule = generateStudyPlan(config);
        const plan = await savePlan({ config, schedule });
        set({ plan, isLoading: false });
    },
    
    markTaskComplete: (taskId) => {
        const { plan } = get();
        if (!plan) return;
        
        const updatedSchedule = plan.schedule.map(day => ({
            ...day,
            tasks: day.tasks.map(task =>
                task.id === taskId
                    ? { ...task, isCompleted: true, completedAt: new Date() }
                    : task
            )
        }));
        
        set({ plan: { ...plan, schedule: updatedSchedule } });
    }
}));
```

### Reminder System

```typescript
class ReminderService {
    private notifications: Map<string, NodeJS.Timeout> = new Map();
    
    scheduleReminder(task: StudyTask, time: Date) {
        const delay = time.getTime() - Date.now();
        
        if (delay > 0) {
            const timeoutId = setTimeout(() => {
                this.sendNotification(task);
            }, delay);
            
            this.notifications.set(task.id, timeoutId);
        }
    }
    
    sendNotification(task: StudyTask) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Study Reminder', {
                body: `Time to study: ${task.topic}`,
                icon: '/icon.png',
                badge: '/badge.png'
            });
        }
    }
    
    cancelReminder(taskId: string) {
        const timeoutId = this.notifications.get(taskId);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.notifications.delete(taskId);
        }
    }
}
```

---

## User Guide

### Creating Your Study Plan

1. **Access the Planner**
   - Navigate to `/planner` or click "Study Planner" from dashboard
   - Click "Create New Plan"

2. **Enter Exam Details**
   - Select exam date
   - System calculates days remaining
   - Review timeline

3. **Configure Study Schedule**
   - Set daily study hours (realistic estimate)
   - Select weekly off days
   - Choose revision frequency

4. **Set Priorities**
   - Mark important topics
   - Identify weak areas
   - Set difficulty preferences

5. **Generate Plan**
   - Review generated schedule
   - Make adjustments if needed
   - Confirm and activate

### Following Your Daily Plan

1. **Check Today's Tasks**
   - View morning or start of study session
   - Note estimated time for each task
   - Gather required resources

2. **Complete Tasks**
   - Work through tasks in order
   - Check off completed items
   - Log actual time spent

3. **Track Progress**
   - Monitor daily completion rate
   - Review weekly progress
   - Adjust schedule if falling behind

### Tips for Success

- **Be Realistic**: Set achievable daily study hours
- **Stay Consistent**: Maintain daily streak
- **Review Regularly**: Check progress weekly
- **Adapt as Needed**: Adjust plan based on performance
- **Use Reminders**: Enable notifications
- **Take Breaks**: Schedule rest periods

---

## Developer Guide

### Adding New Planning Features

#### Custom Scheduling Rules

```typescript
interface SchedulingRule {
    name: string;
    condition: (task: StudyTask, day: DailySchedule) => boolean;
    action: (task: StudyTask, day: DailySchedule) => void;
}

const rules: SchedulingRule[] = [
    {
        name: 'morning-priority',
        condition: (task, day) => task.priority === 'high',
        action: (task, day) => {
            // Schedule high-priority tasks in morning
            day.tasks.unshift(task);
        }
    },
    {
        name: 'revision-spacing',
        condition: (task, day) => task.type === 'revision',
        action: (task, day) => {
            // Space out revision sessions
            const lastRevision = findLastRevision(day);
            if (lastRevision) {
                insertAfterGap(task, lastRevision, 2); // 2 hours gap
            }
        }
    }
];
```

#### Progress Analytics

```typescript
function generateAnalytics(plan: StudyPlan) {
    return {
        studyPatterns: analyzeStudyPatterns(plan),
        peakPerformance: findPeakPerformanceTime(plan),
        topicMastery: calculateTopicMastery(plan),
        predictions: predictExamReadiness(plan),
        recommendations: generateRecommendations(plan)
    };
}
```

---

## Best Practices

### For Users
1. Set realistic daily study hours
2. Include buffer time in schedule
3. Review and adjust plan weekly
4. Maintain consistent study times
5. Track actual time spent accurately

### For Developers
1. Validate user inputs thoroughly
2. Handle edge cases in scheduling
3. Optimize algorithm performance
4. Provide clear error messages
5. Test with various scenarios

---

## Future Enhancements

1. **AI-Powered Scheduling**: Machine learning for optimal plans
2. **Collaborative Planning**: Study groups and shared schedules
3. **Integration with Calendar Apps**: Sync with Google Calendar
4. **Voice Commands**: Hands-free task completion
5. **Pomodoro Timer**: Built-in study timer
6. **Study Analytics**: Advanced performance insights

---

**Document Version**: 1.0  
**Last Updated**: January 24, 2026  
**Maintained By**: Dak Guru Development Team
