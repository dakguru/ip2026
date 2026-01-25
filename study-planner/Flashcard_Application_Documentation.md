crea# Flashcard Application - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Data Structure](#data-structure)
5. [User Interface](#user-interface)
6. [Mobile Optimization](#mobile-optimization)
7. [Available Flashcard Decks](#available-flashcard-decks)
8. [Technical Implementation](#technical-implementation)
9. [User Guide](#user-guide)
10. [Developer Guide](#developer-guide)
11. [Future Enhancements](#future-enhancements)

---

## Overview

The Flashcard Application is a mobile-optimized, interactive learning tool designed specifically for Indian Postal Service exam preparation. It provides an immersive, app-like experience for studying various postal regulations, acts, and manuals through a card-based interface.

### Purpose
- **Primary Goal**: Provide an efficient, engaging method for memorizing key concepts, definitions, and regulations
- **Target Audience**: Candidates preparing for Indian Postal Service examinations
- **Platform**: Web-based (mobile-first), compatible with Android app integration

### Key Characteristics
- **Mobile-First Design**: Optimized for smartphone screens and touch interactions
- **Full-Screen Experience**: Immersive learning environment without distractions
- **Gesture-Based Navigation**: Intuitive swipe and tap controls
- **Comprehensive Content**: Covers 9+ major topics with 200+ flashcards

---

## Features

### Core Features

#### 1. **Deck Selection**
- Browse multiple flashcard decks organized by topic
- Visual cards with color-coded gradients for easy identification
- Quick access to card count and topic description
- Responsive grid layout (1-3 columns based on screen size)

#### 2. **Interactive Flashcards**
- **Front Side**: Displays the question with card ID and topic tag
- **Back Side**: Shows the correct answer with detailed explanation
- **3D Flip Animation**: Smooth 180° rotation with preserve-3d effect
- **Tap to Flip**: Click/tap anywhere on the card to reveal the answer

#### 3. **Navigation Controls**
- **Bottom Navigation Bar**: Fixed bar with Prev, Flip, and Next buttons
- **Swipe Gestures**: Swipe left/right to navigate between cards
- **Keyboard Support**: 
  - `Space` or `Enter`: Flip card
  - `Arrow Left`: Previous card
  - `Arrow Right`: Next card
- **Progress Indicator**: Visual progress bar showing current position in deck

#### 4. **Shuffle Mode**
- Randomize card order using Fisher-Yates algorithm
- Toggle shuffle on/off without losing progress
- Visual indicator when shuffle is active
- Resets to first card when toggled

#### 5. **Theme Support**
- **Light Mode**: Clean, bright interface for daytime study
- **Dark Mode**: Eye-friendly dark theme for night study
- Persistent theme preference across sessions
- Smooth theme transitions

#### 6. **Mobile Optimization**
- **Full-Screen Layout**: Utilizes entire viewport
- **Safe Area Support**: Respects device notches and gesture bars
- **Touch-Optimized Controls**: Large, thumb-friendly buttons
- **Minimal Scrolling**: Content fits within viewport
- **Smooth Animations**: Hardware-accelerated transitions

---

## Architecture

### Technology Stack

```
Frontend Framework: Next.js 14 (React 18)
UI Library: React with TypeScript
Animation: Framer Motion
Styling: Tailwind CSS
Icons: Lucide React
Theme Management: next-themes
```

### File Structure

```
study-planner/
├── src/
│   ├── app/
│   │   └── flashcards/
│   │       ├── page.tsx              # Main flashcard component
│   │       ├── pmla_data.ts          # Legacy PMLA flashcards
│   │       ├── po_act_data.ts        # Legacy PO Act flashcards
│   │       └── po_guide1_data.ts     # Legacy PO Guide flashcards
│   ├── data/
│   │   └── flashcards/
│   │       ├── index.ts              # Centralized exports
│   │       ├── pmla2002.ts           # PMLA 2002 data
│   │       ├── poAct2023.ts          # PO Act 2023 data
│   │       ├── consumerProtectionAct2019.ts
│   │       ├── gspr2018.ts           # GSPR 2018 data
│   │       ├── postalManualVolV.ts   # Vol V data
│   │       ├── postalManualVolVII.ts # Vol VII data
│   │       ├── postalManualVolVIPartII.ts
│   │       └── postalManualVolVIPartIII.ts
│   └── types.ts                      # TypeScript interfaces
└── public/
    └── official-logo.png             # Watermark logo
```

---

## Data Structure

### FlashCard Interface (New Format)

```typescript
interface FlashCard {
    pdf_title: string;      // Source document name
    topic: string;          // Subtopic/category
    card_no: number;        // Unique card number
    question: string;       // Question text
    answer: string;         // Correct answer
    exam_weight: "High" | "Medium" | "Low";  // Importance level
    keywords: string[];     // Related keywords for search
}
```

### UnifiedFlashcard Interface (UI Format)

```typescript
interface UnifiedFlashcard {
    id: number | string;    // Card identifier
    question: string;       // Question text
    answer: string;         // Correct answer
    explanation?: string;   // Additional context (keywords joined)
    tag: string;           // Topic tag for display
    keywords?: string[];   // Original keywords array
}
```

### Data Conversion

The application uses a `convertToUnified` helper function to transform the new `FlashCard` format into the `UnifiedFlashcard` format used by the UI:

```typescript
const convertToUnified = (data: FlashCard[], tagPrefix: string): UnifiedFlashcard[] => {
    return data.map((item, index) => ({
        id: item.card_no || index + 1,
        question: item.question,
        answer: item.answer,
        explanation: item.keywords?.join(", "),
        tag: item.topic || tagPrefix,
        keywords: item.keywords
    }));
};
```

---

## User Interface

### Deck Selection Screen

#### Layout
- **Header**: Back button (left), title (center), theme toggle (right)
- **Content**: Grid of deck cards
- **Responsive**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)

#### Deck Card Components
Each deck card displays:
- **Icon**: Color-coded icon representing the topic
- **Title**: Deck name (e.g., "PO Act 2023 & Rules")
- **Subtitle**: Card count and brief description
- **Gradient**: Unique color gradient for visual distinction
- **Hover Effect**: Subtle gradient overlay on hover

### Flashcard View Screen

#### Header (Compact)
```
┌─────────────────────────────────────┐
│ ←  [Progress: 5/20] [🔀] [☀️/🌙]  │
└─────────────────────────────────────┘
```
- **Back Button**: Return to deck selection
- **Progress**: Current card / Total cards + progress bar
- **Shuffle Toggle**: Enable/disable shuffle mode
- **Theme Toggle**: Switch between light/dark mode

#### Card Display
```
┌─────────────────────────────────────┐
│  #5              PO Act 2023        │
│                                     │
│                                     │
│     What is the minimum deposit     │
│     for a Foreigner to open a       │
│     Philatelic Deposit Account?     │
│                                     │
│                                     │
│           Tap to Flip               │
└─────────────────────────────────────┘
```

**Front Side Elements**:
- Card ID badge (top-left)
- Topic tag (top-right)
- Question text (centered)
- Flip hint (bottom)

**Back Side Elements**:
```
┌─────────────────────────────────────┐
│          Correct Answer             │
│                                     │
│         Rs. 200 (USD 3)             │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Explanation                 │   │
│  │ Philatelic Deposit Account, │   │
│  │ PDA, Minimum Deposit, USD   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```
- Answer badge (top)
- Answer text (highlighted)
- Explanation box (scrollable if needed)

#### Bottom Navigation Bar
```
┌─────────────────────────────────────┐
│  [◀ Prev]  [🔄 Flip]  [Next ▶]     │
└─────────────────────────────────────┘
```
- **Prev Button**: Navigate to previous card (disabled on first card)
- **Flip Button**: Toggle card flip (primary action)
- **Next Button**: Navigate to next card (disabled on last card)

---

## Mobile Optimization

### Full-Screen Experience

The flashcard view uses a fixed layout that occupies the entire viewport:

```css
.flashcard-container {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
```

### Safe Area Support

Respects device-specific safe areas (notches, gesture bars):

```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
```

### Touch Optimization

#### Large Touch Targets
- Minimum button size: 48x48px (WCAG AAA standard)
- Bottom navigation buttons: 56x56px for primary actions
- Adequate spacing between interactive elements

#### Gesture Support
- **Swipe Threshold**: 50px horizontal movement to trigger navigation
- **Drag Elastic**: 0.2 elasticity for natural feel
- **Tap Area**: Entire card surface is tappable for flip action

### Performance Optimizations

#### Animation Performance
```typescript
// Spring-based animations for natural feel
transition={{ 
    type: "spring", 
    stiffness: 300, 
    damping: 30, 
    mass: 0.8 
}}
```

#### Hardware Acceleration
- Uses `transform` and `opacity` for animations (GPU-accelerated)
- `preserve-3d` for smooth 3D flip effect
- `backface-hidden` to prevent flickering

#### Lazy Loading
- Cards are rendered on-demand
- AnimatePresence for efficient mount/unmount
- Single card in DOM at a time

---

## Available Flashcard Decks

### 1. **Post Office Act 2023 & Rules**
- **Cards**: 20
- **Topics**: Updated legislation, rules, and regulations
- **Exam Weight**: High
- **Color**: Cyan to Blue gradient
- **Icon**: Sparkles ✨

### 2. **PO Guide Part I**
- **Cards**: 40
- **Topics**: General rules and operational procedures
- **Exam Weight**: High
- **Color**: Emerald to Teal gradient
- **Icon**: Book 📖

### 3. **Postal Manual Vol VI - Part II**
- **Cards**: 10
- **Topics**: Money Orders, financial services
- **Exam Weight**: Medium
- **Color**: Orange to Amber gradient
- **Icon**: Layers 📚

### 4. **Postal Manual Vol VI - Part III**
- **Cards**: 10
- **Topics**: Duties of Postmen, delivery operations
- **Exam Weight**: Medium
- **Color**: Amber to Orange gradient
- **Icon**: Layers 📚

### 5. **PMLA, 2002**
- **Cards**: 15
- **Topics**: Prevention of Money Laundering Act
- **Exam Weight**: High
- **Color**: Indigo to Purple gradient
- **Icon**: Scale ⚖️

### 6. **Consumer Protection Act, 2019**
- **Cards**: 15
- **Topics**: Consumer rights and protection
- **Exam Weight**: Medium
- **Color**: Pink to Rose gradient
- **Icon**: Scale ⚖️

### 7. **GSPR 2018**
- **Cards**: 32
- **Topics**: Government Savings Promotion Rules
- **Exam Weight**: High
- **Color**: Green to Lime gradient
- **Icon**: File 📄

### 8. **Postal Manual Vol VII**
- **Cards**: 45
- **Topics**: Railway Mail Service (RMS) operations
- **Exam Weight**: High
- **Color**: Red to Orange gradient
- **Icon**: Bus 🚌

### 9. **Postal Manual Vol V**
- **Cards**: 50
- **Topics**: Definitions, transit operations, terminology
- **Exam Weight**: High
- **Color**: Cyan to Blue gradient
- **Icon**: Book 📖

**Total**: 237 flashcards across 9 decks

---

## Technical Implementation

### State Management

```typescript
// Deck and card state
const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
const [currentIndex, setCurrentIndex] = useState(0);
const [isFlipped, setIsFlipped] = useState(false);
const [direction, setDirection] = useState(0);

// Shuffle state
const [isShuffled, setIsShuffled] = useState(false);
const [shuffledDeck, setShuffledDeck] = useState<UnifiedFlashcard[]>([]);

// Derived state
const baseDeck = selectedDeckId ? deckData[selectedDeckId] : [];
const activeDeck = isShuffled ? shuffledDeck : baseDeck;
const currentCard = activeDeck[currentIndex];
const progress = ((currentIndex + 1) / activeDeck.length) * 100;
```

### Animation Variants

```typescript
const variants = {
    enter: (d: number) => ({ 
        x: d > 0 ? 300 : -300, 
        opacity: 0, 
        scale: 0.95 
    }),
    center: { 
        zIndex: 1, 
        x: 0, 
        opacity: 1, 
        scale: 1 
    },
    exit: (d: number) => ({ 
        zIndex: 0, 
        x: d < 0 ? 300 : -300, 
        opacity: 0, 
        scale: 0.95 
    })
};
```

### Shuffle Algorithm

Fisher-Yates shuffle for unbiased randomization:

```typescript
const toggleShuffle = () => {
    if (!selectedDeckId) return;
    
    if (!isShuffled) {
        const newDeck = [...baseDeck];
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }
        setShuffledDeck(newDeck);
        setIsShuffled(true);
    } else {
        setIsShuffled(false);
        setShuffledDeck([]);
    }
    
    setCurrentIndex(0);
    setIsFlipped(false);
};
```

### Gesture Handling

```typescript
const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50; 
    if (info.offset.x < -threshold) handleNext();
    else if (info.offset.x > threshold) handlePrev();
};
```

### Keyboard Navigation

```typescript
useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!selectedDeckId) return;
        
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setIsFlipped(prev => !prev);
        }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
}, [selectedDeckId, currentIndex]);
```

---

## User Guide

### Getting Started

1. **Access the Flashcards**
   - Navigate to `/flashcards` route in the application
   - Or click "Flashcards" from the main dashboard

2. **Select a Deck**
   - Browse available decks on the selection screen
   - Click/tap on any deck card to begin studying

3. **Study Mode**
   - Read the question on the front of the card
   - Tap anywhere on the card to flip and see the answer
   - Review the explanation for additional context

### Navigation Methods

#### Touch/Mouse
- **Tap Card**: Flip to reveal answer
- **Swipe Left**: Next card
- **Swipe Right**: Previous card
- **Tap Prev Button**: Go to previous card
- **Tap Next Button**: Go to next card
- **Tap Flip Button**: Toggle card flip

#### Keyboard
- **Space** or **Enter**: Flip card
- **Arrow Left**: Previous card
- **Arrow Right**: Next card

### Features Usage

#### Shuffle Mode
1. Click the shuffle icon (🔀) in the header
2. Cards will be randomized
3. Progress resets to first card
4. Click again to restore original order

#### Theme Toggle
1. Click the sun/moon icon in the header
2. Interface switches between light and dark mode
3. Preference is saved automatically

#### Progress Tracking
- View current position: "X / Y" in header
- Visual progress bar shows completion percentage
- Automatically updates as you navigate

### Best Practices

1. **Study Sessions**
   - Complete one deck per session for better retention
   - Use shuffle mode to test recall without order dependency
   - Review explanations even for known answers

2. **Mobile Usage**
   - Use in portrait orientation for best experience
   - Enable full-screen mode in browser for immersive study
   - Adjust brightness for comfortable reading

3. **Effective Learning**
   - Read question carefully before flipping
   - Try to recall answer before revealing
   - Review keywords for related concepts
   - Repeat difficult cards by navigating back

---

## Developer Guide

### Adding New Flashcard Decks

#### Step 1: Create Data File

Create a new file in `src/data/flashcards/`:

```typescript
// src/data/flashcards/myNewDeck.ts
import { FlashCard } from "../../types";

export const myNewDeck: FlashCard[] = [
    {
        pdf_title: "My Document",
        topic: "Introduction",
        card_no: 1,
        question: "What is the main purpose?",
        answer: "To provide information",
        exam_weight: "High",
        keywords: ["purpose", "information", "main"]
    },
    // ... more cards
];
```

#### Step 2: Export from Index

Add to `src/data/flashcards/index.ts`:

```typescript
export { myNewDeck } from './myNewDeck';
```

#### Step 3: Import in Page Component

Update `src/app/flashcards/page.tsx`:

```typescript
import {
    // ... existing imports
    myNewDeck
} from "../../data/flashcards";
```

#### Step 4: Add to Deck Data

```typescript
const deckData: Record<string, UnifiedFlashcard[]> = {
    // ... existing decks
    'mynewdeck': convertToUnified(myNewDeck, "My New Deck"),
};
```

#### Step 5: Add UI Button

```typescript
<DeckButton
    title="My New Deck"
    subtitle="X Cards • Description"
    icon={<YourIcon className="w-5 h-5" />}
    onClick={() => handleSelectDeck('mynewdeck')}
    colorClass="from-color1-500 to-color2-500"
/>
```

### Customization Options

#### Theme Colors

Modify `CARD_THEMES` array in `page.tsx`:

```typescript
const CARD_THEMES = [
    {
        name: "Custom Theme",
        gradient: "from-custom-900 to-custom-900",
        lightGradient: "from-custom-50 to-custom-50",
        accent: "text-custom-400",
        border: "border-custom-500/20",
        badge: "bg-custom-500/10 text-custom-400",
    },
];
```

#### Animation Timing

Adjust animation parameters:

```typescript
// Flip duration
transition={{ duration: 0.5, ease: "easeOut" }}

// Card transition
transition={{ 
    type: "spring", 
    stiffness: 300,  // Higher = faster
    damping: 30,     // Higher = less bounce
    mass: 0.8        // Lower = lighter feel
}}
```

#### Swipe Sensitivity

Modify threshold in `handleDragEnd`:

```typescript
const threshold = 50; // Pixels required to trigger swipe
```

### Testing

#### Unit Tests (Recommended)

```typescript
// __tests__/flashcards.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FlashcardsPage from '@/app/flashcards/page';

describe('Flashcards', () => {
    it('renders deck selection', () => {
        render(<FlashcardsPage />);
        expect(screen.getByText('Flashcards')).toBeInTheDocument();
    });
    
    it('navigates to next card', () => {
        // Test implementation
    });
});
```

#### Manual Testing Checklist

- [ ] All decks load correctly
- [ ] Card flip animation is smooth
- [ ] Swipe gestures work on mobile
- [ ] Keyboard navigation functions
- [ ] Shuffle randomizes cards
- [ ] Theme toggle persists
- [ ] Progress bar updates accurately
- [ ] Safe areas respected on notched devices
- [ ] No content overflow on small screens
- [ ] Buttons are touch-friendly (48px minimum)

### Performance Optimization

#### Code Splitting

```typescript
// Lazy load deck data
const deckData = useMemo(() => ({
    'pmla': pmlaFlashcards,
    // ... other decks
}), []);
```

#### Memoization

```typescript
const currentCard = useMemo(
    () => activeDeck[currentIndex],
    [activeDeck, currentIndex]
);
```

#### Image Optimization

```typescript
<Image 
    src="/official-logo.png" 
    alt="Watermark" 
    fill 
    className="object-contain grayscale"
    priority={false}  // Don't prioritize watermark
    quality={75}      // Reduce quality for watermark
/>
```

---

## Future Enhancements

### Planned Features

#### 1. **Study Statistics**
- Track cards reviewed per session
- Identify frequently missed cards
- Study time analytics
- Progress over time graphs

#### 2. **Spaced Repetition**
- Implement SRS algorithm (e.g., SM-2)
- Schedule card reviews based on difficulty
- Adaptive learning paths
- Mastery indicators

#### 3. **Bookmarking**
- Mark difficult cards for later review
- Create custom study sets
- Filter by bookmarked cards
- Export bookmarks

#### 4. **Search Functionality**
- Search across all decks
- Filter by keywords
- Topic-based filtering
- Quick jump to specific cards

#### 5. **Offline Support**
- Service worker for offline access
- Cache flashcard data
- Sync progress when online
- Progressive Web App (PWA) features

#### 6. **Social Features**
- Share progress with friends
- Compete on leaderboards
- Study groups
- Collaborative decks

#### 7. **Audio Support**
- Text-to-speech for questions/answers
- Audio explanations
- Voice commands for navigation
- Background study mode

#### 8. **Gamification**
- Earn points for completed cards
- Achievement badges
- Daily streaks
- Level progression

### Technical Improvements

#### 1. **Accessibility**
- ARIA labels for screen readers
- Keyboard-only navigation mode
- High contrast mode
- Font size adjustment

#### 2. **Internationalization**
- Multi-language support
- RTL layout support
- Localized content
- Regional exam variations

#### 3. **Data Management**
- Cloud sync for progress
- Import/export functionality
- Backup and restore
- Version control for decks

#### 4. **Analytics**
- User engagement metrics
- Popular decks tracking
- Performance monitoring
- Error logging

---

## Troubleshooting

### Common Issues

#### Cards Not Flipping
**Symptom**: Card doesn't flip when tapped  
**Solution**: 
- Ensure JavaScript is enabled
- Check browser compatibility (use modern browser)
- Clear browser cache
- Disable browser extensions that may interfere

#### Swipe Gestures Not Working
**Symptom**: Swiping doesn't navigate cards  
**Solution**:
- Ensure touch events are supported
- Check if another element is capturing touch events
- Try increasing swipe threshold
- Disable browser's native swipe gestures

#### Progress Not Saving
**Symptom**: Progress resets when refreshing  
**Solution**:
- Currently, progress is session-based (by design)
- Future update will add persistent storage
- Use browser's "Add to Home Screen" for app-like experience

#### Theme Not Persisting
**Symptom**: Theme resets to default  
**Solution**:
- Check browser's local storage permissions
- Ensure cookies are enabled
- Clear site data and set theme again

#### Performance Issues
**Symptom**: Laggy animations or slow response  
**Solution**:
- Close other browser tabs
- Disable browser extensions
- Update to latest browser version
- Check device performance (CPU/RAM usage)

### Browser Compatibility

**Supported Browsers**:
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Samsung Internet 14+

**Not Supported**:
- Internet Explorer (all versions)
- Opera Mini
- UC Browser (limited support)

### Mobile-Specific Issues

#### Safe Area Not Respected
**Solution**: Update to latest iOS/Android version

#### Buttons Too Small
**Solution**: Zoom out to 100% or reset browser zoom

#### Keyboard Covering Content
**Solution**: Scroll to bring content into view, or use landscape mode

---

## API Reference

### Component Props

#### FlashcardsPage
```typescript
// No props - standalone page component
export default function FlashcardsPage(): JSX.Element
```

#### DeckButton
```typescript
interface DeckButtonProps {
    title: string;           // Deck name
    subtitle: string;        // Description
    icon: React.ReactNode;   // Icon component
    onClick: () => void;     // Click handler
    colorClass: string;      // Tailwind gradient classes
}
```

### Utility Functions

#### convertToUnified
```typescript
function convertToUnified(
    data: FlashCard[], 
    tagPrefix: string
): UnifiedFlashcard[]
```

Converts FlashCard format to UnifiedFlashcard format.

**Parameters**:
- `data`: Array of FlashCard objects
- `tagPrefix`: Default tag if topic is missing

**Returns**: Array of UnifiedFlashcard objects

### Hooks Usage

#### useTheme (next-themes)
```typescript
const { theme, setTheme } = useTheme();

// Get current theme
console.log(theme); // 'light' | 'dark' | 'system'

// Set theme
setTheme('dark');
```

#### useState (React)
```typescript
const [currentIndex, setCurrentIndex] = useState<number>(0);
const [isFlipped, setIsFlipped] = useState<boolean>(false);
```

#### useEffect (React)
```typescript
useEffect(() => {
    // Setup code
    return () => {
        // Cleanup code
    };
}, [dependencies]);
```

---

## Changelog

### Version 2.0.0 (Current)
**Release Date**: January 24, 2026

**Major Changes**:
- ✨ Complete mobile optimization
- ✨ Full-screen flashcard experience
- ✨ Fixed bottom navigation bar
- ✨ Gesture-based navigation (swipe)
- ✨ Safe area support for notched devices
- ✨ Improved animation performance
- ✨ Added 5 new flashcard decks (237 total cards)

**New Decks**:
- Postal Manual Vol V (50 cards)
- Postal Manual Vol VII (45 cards)
- GSPR 2018 (32 cards)
- Consumer Protection Act 2019 (15 cards)
- Updated PMLA 2002 (15 cards)

**Bug Fixes**:
- Fixed syntax errors in postalManualVolV.ts
- Corrected card flip animation glitches
- Resolved theme persistence issues
- Fixed progress bar calculation

### Version 1.5.0
**Release Date**: January 23, 2026

**Features**:
- 🔀 Shuffle mode implementation
- ⌨️ Keyboard navigation support
- 🎨 Theme toggle (light/dark mode)
- 📊 Progress indicator

### Version 1.0.0
**Release Date**: January 22, 2026

**Initial Release**:
- Basic flashcard functionality
- 4 initial decks (PO Act, PO Guide, PMLA, Money Orders)
- Card flip animation
- Deck selection interface

---

## Credits

### Development Team
- **Lead Developer**: Dak Guru Development Team
- **UI/UX Design**: Mobile-First Design Team
- **Content Creation**: Postal Exam Subject Matter Experts
- **Testing**: QA Team

### Technologies
- **Next.js**: React framework by Vercel
- **Framer Motion**: Animation library by Framer
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **TypeScript**: Type-safe JavaScript

### Content Sources
- India Post Official Manuals
- Post Office Act, 2023
- Prevention of Money Laundering Act, 2002
- Consumer Protection Act, 2019
- Government Savings Promotion Rules, 2018

---

## License

This flashcard application is part of the Dak Guru Study Planner platform.

**Copyright** © 2026 Dak Guru. All rights reserved.

**Usage Terms**:
- For educational purposes only
- Content is based on official government documents
- Not for commercial redistribution
- Subject to terms of service of the main application

---

## Support

### Getting Help

**Documentation**: Refer to this document for comprehensive guidance

**Bug Reports**: 
- Check existing issues first
- Provide detailed reproduction steps
- Include browser/device information
- Attach screenshots if applicable

**Feature Requests**:
- Describe the feature clearly
- Explain the use case
- Suggest implementation approach

**Contact**:
- Email: support@dakguru.com
- WhatsApp: Join our study group
- Website: https://dakguru.com

---

## Appendix

### Keyboard Shortcuts Reference

| Key | Action |
|-----|--------|
| `Space` | Flip current card |
| `Enter` | Flip current card |
| `←` | Previous card |
| `→` | Next card |
| `Esc` | Return to deck selection |

### Gesture Reference

| Gesture | Action |
|---------|--------|
| Tap card | Flip card |
| Swipe left | Next card |
| Swipe right | Previous card |
| Tap Prev button | Previous card |
| Tap Next button | Next card |
| Tap Flip button | Flip card |

### Color Scheme Reference

#### Light Mode
- Background: `#fafafa` (zinc-50)
- Card: `#ffffff` (white)
- Text: `#18181b` (zinc-900)
- Border: `#e4e4e7` (zinc-200)

#### Dark Mode
- Background: `#000000` (black)
- Card: `#171717` (neutral-900)
- Text: `#ffffff` (white)
- Border: `rgba(255,255,255,0.05)`

### Deck Color Gradients

| Deck | From | To |
|------|------|-----|
| PO Act 2023 | cyan-500 | blue-500 |
| PO Guide I | emerald-500 | teal-500 |
| Vol VI Pt II | orange-500 | amber-500 |
| Vol VI Pt III | amber-500 | orange-500 |
| PMLA 2002 | indigo-500 | purple-500 |
| CPA 2019 | pink-500 | rose-500 |
| GSPR 2018 | green-500 | lime-500 |
| Vol VII | red-500 | orange-500 |
| Vol V | cyan-600 | blue-600 |

---

**Document Version**: 2.0  
**Last Updated**: January 24, 2026  
**Maintained By**: Dak Guru Development Team
