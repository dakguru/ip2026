# User Dashboard & Profile System - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Data Structure](#data-structure)
5. [User Interface](#user-interface)
6. [Authentication & Authorization](#authentication--authorization)
7. [Profile Management](#profile-management)
8. [Technical Implementation](#technical-implementation)
9. [User Guide](#user-guide)
10. [Developer Guide](#developer-guide)

---

## Overview

The User Dashboard & Profile System serves as the central hub for candidates, providing personalized study insights, progress tracking, and account management features.

### Purpose
- **Primary Goal**: Centralized user experience and progress monitoring
- **Target Audience**: All registered users
- **Access Level**: Authenticated users only

### Key Characteristics
- **Personalized Dashboard**: Customized based on user activity
- **Progress Overview**: Comprehensive performance metrics
- **Quick Access**: One-click navigation to all features
- **Profile Management**: Complete account control
- **Achievement System**: Gamification and motivation

---

## Features

### Core Features

#### 1. **Dashboard Overview**
- Study progress summary
- Recent activity feed
- Upcoming tasks and deadlines
- Performance metrics
- Quick action buttons

#### 2. **Profile Management**
- Personal information editing
- Profile picture upload
- Contact details management
- Exam preferences
- Notification settings

#### 3. **Progress Tracking**
- Overall completion percentage
- Topic-wise progress
- Time spent analytics
- Streak tracking
- Milestone achievements

#### 4. **Activity History**
- Quiz attempts log
- Mock test history
- Flashcard sessions
- Study time records
- Download history

#### 5. **Settings & Preferences**
- Theme selection (light/dark)
- Notification preferences
- Study reminders
- Privacy settings
- Account security

---

## Architecture

### Technology Stack

```
Frontend: Next.js 14 (React 18)
Authentication: Supabase Auth
Database: Supabase (PostgreSQL)
File Storage: Supabase Storage
State Management: React Context + Zustand
Charts: Recharts
```

### File Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard
│   ├── profile/
│   │   └── page.tsx              # Profile page
│   ├── settings/
│   │   └── page.tsx              # Settings page
│   ├── progress/
│   │   └── page.tsx              # Progress details
│   └── login/
│       └── page.tsx              # Login page
├── components/
│   ├── dashboard/
│   │   ├── StatsCard.tsx         # Metric cards
│   │   ├── ActivityFeed.tsx      # Recent activity
│   │   ├── ProgressChart.tsx     # Progress visualization
│   │   └── QuickActions.tsx      # Action buttons
│   ├── profile/
│   │   ├── ProfileHeader.tsx     # Profile display
│   │   ├── EditProfile.tsx       # Edit form
│   │   └── AvatarUpload.tsx      # Picture upload
│   └── auth/
│       ├── LoginForm.tsx         # Login component
│       └── SignupForm.tsx        # Registration
├── lib/
│   ├── auth.ts                   # Auth utilities
│   ├── user-service.ts           # User operations
│   └── analytics.ts              # User analytics
└── types/
    └── user.ts                   # User interfaces
```

---

## Data Structure

### User Profile Interface

```typescript
interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    displayName?: string;
    avatar?: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: 'Male' | 'Female' | 'Other';
    
    // Exam details
    targetExam: string;
    examDate?: Date;
    examCenter?: string;
    
    // Membership
    membershipType: 'free' | 'paid' | 'admin';
    membershipExpiry?: Date;
    isVerified: boolean;
    
    // Preferences
    preferences: UserPreferences;
    
    // Metadata
    createdAt: Date;
    lastLogin: Date;
    isActive: boolean;
}
```

### User Preferences

```typescript
interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    
    // Notifications
    emailNotifications: boolean;
    pushNotifications: boolean;
    studyReminders: boolean;
    reminderTime?: string; // HH:MM format
    
    // Study settings
    dailyGoal: number; // minutes
    preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
    autoPlayFlashcards: boolean;
    
    // Privacy
    showProfile: boolean;
    showProgress: boolean;
    allowMessaging: boolean;
}
```

### User Statistics

```typescript
interface UserStatistics {
    userId: string;
    
    // Overall metrics
    totalStudyTime: number; // minutes
    currentStreak: number; // days
    longestStreak: number; // days
    
    // Activity counts
    quizzesTaken: number;
    mockTestsTaken: number;
    flashcardsReviewed: number;
    notesViewed: number;
    
    // Performance
    averageQuizScore: number;
    averageMockScore: number;
    strongTopics: string[];
    weakTopics: string[];
    
    // Progress
    syllabusCompletion: number; // percentage
    topicsCompleted: number;
    totalTopics: number;
    
    // Achievements
    badges: Badge[];
    level: number;
    experiencePoints: number;
}
```

### Achievement System

```typescript
interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'study' | 'performance' | 'consistency' | 'special';
    earnedAt: Date;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
    id: string;
    name: string;
    description: string;
    criteria: AchievementCriteria;
    reward: {
        badge?: Badge;
        points: number;
        title?: string;
    };
}

interface AchievementCriteria {
    type: 'streak' | 'score' | 'completion' | 'time' | 'count';
    target: number;
    metric: string;
}
```

---

## User Interface

### Dashboard Layout

```
┌─────────────────────────────────────┐
│  Welcome back, Arun! 👋             │
│  Last login: 2 hours ago            │
├─────────────────────────────────────┤
│                                     │
│  Quick Stats:                       │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 🔥 7 │ │ 📚45%│ │ ⏱️48h│        │
│  │Streak│ │ Done │ │Studied│       │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  Today's Progress:                  │
│  ████████░░░░░░░░░░ 40%            │
│  2h 30m / 4h goal                   │
│                                     │
│  Quick Actions:                     │
│  [📝 Continue Quiz]                 │
│  [🎯 Take Mock Test]                │
│  [🗂️ Study Notes]                   │
│  [📊 View Progress]                 │
│                                     │
│  Recent Activity:                   │
│  • Completed PO Act Quiz (85%)      │
│  • Reviewed 20 flashcards           │
│  • Studied Money Orders notes       │
│                                     │
│  Upcoming:                          │
│  • Mock Test 3 - Tomorrow 10 AM     │
│  • Revision: PMLA 2002              │
└─────────────────────────────────────┘
```

### Profile Page

```
┌─────────────────────────────────────┐
│  [Profile Photo]                    │
│  Arun Kumar                         │
│  @arun_ip2026                       │
│  🏆 Gold Member                     │
│  ⭐ Level 12 • 2,450 XP             │
├─────────────────────────────────────┤
│                                     │
│  Personal Information:              │
│  ┌─────────────────────────────┐   │
│  │ Email: arun@example.com     │   │
│  │ Phone: +91 98765 43210      │   │
│  │ DOB: 15/08/1995             │   │
│  │ Target: IP 2026             │   │
│  │ Exam Date: 15/03/2026       │   │
│  └─────────────────────────────┘   │
│  [Edit Profile]                     │
│                                     │
│  Achievements:                      │
│  🏅 First Quiz Master               │
│  🔥 7-Day Streak Champion           │
│  📚 Bookworm (100 notes read)       │
│  ⚡ Speed Demon (Fast solver)       │
│  [View All Badges]                  │
│                                     │
│  Statistics:                        │
│  • Total Study Time: 48h 30m        │
│  • Quizzes Taken: 45                │
│  • Average Score: 78%               │
│  • Mock Tests: 12                   │
│  [Detailed Analytics]               │
└─────────────────────────────────────┘
```

### Settings Page

```
┌─────────────────────────────────────┐
│  Settings                           │
├─────────────────────────────────────┤
│                                     │
│  Appearance:                        │
│  Theme: ○ Light ● Dark ○ Auto      │
│  Language: English ▼                │
│                                     │
│  Notifications:                     │
│  ☑ Email notifications              │
│  ☑ Push notifications               │
│  ☑ Study reminders                  │
│  Reminder time: [09:00 AM] ▼        │
│                                     │
│  Study Preferences:                 │
│  Daily goal: [4] hours              │
│  Preferred time: Morning ▼          │
│  ☑ Auto-play flashcards             │
│                                     │
│  Privacy:                           │
│  ☑ Show profile publicly            │
│  ☑ Show progress on leaderboard     │
│  ☐ Allow direct messages            │
│                                     │
│  Account:                           │
│  [Change Password]                  │
│  [Download My Data]                 │
│  [Delete Account]                   │
│                                     │
│  [Save Changes]                     │
└─────────────────────────────────────┘
```

---

## Authentication & Authorization

### Authentication Flow

```typescript
// Login flow
async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if (error) throw error;
    
    // Update last login
    await updateLastLogin(data.user.id);
    
    // Fetch user profile
    const profile = await getUserProfile(data.user.id);
    
    return { user: data.user, profile };
}

// Signup flow
async function signup(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    });
    
    if (error) throw error;
    
    // Create user profile
    await createUserProfile({
        id: data.user!.id,
        email,
        fullName,
        membershipType: 'free',
        createdAt: new Date()
    });
    
    return data;
}
```

### Authorization Middleware

```typescript
// Protect routes
export async function requireAuth(request: Request) {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        return redirect('/login');
    }
    
    return session.user;
}

// Check membership
export async function requireMembership(
    userId: string,
    requiredType: 'paid' | 'admin'
) {
    const profile = await getUserProfile(userId);
    
    if (requiredType === 'admin' && profile.membershipType !== 'admin') {
        throw new Error('Admin access required');
    }
    
    if (requiredType === 'paid' && profile.membershipType === 'free') {
        throw new Error('Paid membership required');
    }
    
    return true;
}
```

---

## Profile Management

### Update Profile

```typescript
async function updateProfile(
    userId: string,
    updates: Partial<UserProfile>
) {
    const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
    
    if (error) throw error;
    return data;
}
```

### Avatar Upload

```typescript
async function uploadAvatar(userId: string, file: File) {
    // Upload to storage
    const fileName = `${userId}-${Date.now()}.${file.name.split('.').pop()}`;
    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
    
    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
    
    // Update profile
    await updateProfile(userId, { avatar: publicUrl });
    
    return publicUrl;
}
```

### Statistics Calculation

```typescript
async function calculateUserStatistics(userId: string): Promise<UserStatistics> {
    // Fetch all user activity
    const [quizzes, mocks, flashcards, notes] = await Promise.all([
        getQuizAttempts(userId),
        getMockTestAttempts(userId),
        getFlashcardSessions(userId),
        getNotesViewed(userId)
    ]);
    
    // Calculate metrics
    const totalStudyTime = calculateTotalTime([...quizzes, ...mocks, ...flashcards]);
    const currentStreak = calculateStreak(userId);
    const averageQuizScore = quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length;
    
    // Identify strong/weak topics
    const topicPerformance = analyzeTopicPerformance([...quizzes, ...mocks]);
    const strongTopics = topicPerformance
        .filter(t => t.score >= 75)
        .map(t => t.topic);
    const weakTopics = topicPerformance
        .filter(t => t.score < 60)
        .map(t => t.topic);
    
    return {
        userId,
        totalStudyTime,
        currentStreak,
        longestStreak: await getLongestStreak(userId),
        quizzesTaken: quizzes.length,
        mockTestsTaken: mocks.length,
        flashcardsReviewed: flashcards.reduce((sum, s) => sum + s.cardsReviewed, 0),
        notesViewed: notes.length,
        averageQuizScore,
        averageMockScore: mocks.reduce((sum, m) => sum + m.score, 0) / mocks.length,
        strongTopics,
        weakTopics,
        syllabusCompletion: calculateSyllabusCompletion(userId),
        topicsCompleted: await getCompletedTopicsCount(userId),
        totalTopics: await getTotalTopicsCount(),
        badges: await getUserBadges(userId),
        level: calculateLevel(totalStudyTime, quizzes.length),
        experiencePoints: calculateXP(quizzes, mocks, flashcards)
    };
}
```

---

## Technical Implementation

### User Context

```typescript
interface UserContextType {
    user: UserProfile | null;
    statistics: UserStatistics | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
    refreshStatistics: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [statistics, setStatistics] = useState<UserStatistics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                loadUserData(session.user.id);
            } else {
                setIsLoading(false);
            }
        });
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session) {
                    await loadUserData(session.user.id);
                } else {
                    setUser(null);
                    setStatistics(null);
                }
            }
        );
        
        return () => subscription.unsubscribe();
    }, []);
    
    const loadUserData = async (userId: string) => {
        setIsLoading(true);
        const [profile, stats] = await Promise.all([
            getUserProfile(userId),
            calculateUserStatistics(userId)
        ]);
        setUser(profile);
        setStatistics(stats);
        setIsLoading(false);
    };
    
    // ... implement other methods
    
    return (
        <UserContext.Provider value={{ user, statistics, isLoading, ... }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
```

---

## User Guide

### Creating an Account

1. Click "Sign Up" on homepage
2. Enter email and password
3. Provide full name
4. Verify email address
5. Complete profile setup

### Managing Your Profile

1. Navigate to Profile page
2. Click "Edit Profile"
3. Update information
4. Upload profile picture
5. Save changes

### Customizing Settings

1. Go to Settings page
2. Adjust preferences
3. Set study reminders
4. Configure notifications
5. Save settings

---

## Best Practices

### For Users
1. Complete profile for personalized experience
2. Set realistic daily goals
3. Enable study reminders
4. Regularly check progress
5. Maintain account security

### For Developers
1. Implement proper authentication
2. Validate all user inputs
3. Encrypt sensitive data
4. Implement rate limiting
5. Regular security audits

---

**Document Version**: 1.0  
**Last Updated**: January 24, 2026  
**Maintained By**: Dak Guru Development Team
