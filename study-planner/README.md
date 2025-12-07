# LDCE Inspector Posts Study Planner (2026 Batch)

This is a Next.js application designed to help candidates prepare for the **Inspector Posts LDCE Exam 2026**.

## Features

- **Automated Study Plan Generation**: Generates a daily schedule from Jan 1, 2026, to Aug 31, 2026.
- **Rules-Based Logic**:
  - **Weekends**: Heavy Topics (Manuals & Rules).
  - **Weekdays**: Light Topics (GK, English, Mental Ability).
  - **Sunday**: Dedicated Revision Day.
  - **Last Saturday of Month**: Full Mock Test (Paper I, II & III).
  - **Alternate Saturdays**: Drafting & Noting Practice.
  - **Once a Month**: Charge Sheet Drafting Practice.
- **Interactive Calendar**: Navigate through months to view your daily tasks.
- **Syllabus Tracking**: Includes a structured syllabus for Paper I, II, and III.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/data/syllabus.ts`: Contains the syllabus topics and categories. Modify this to add/remove topics.
- `src/lib/planner.ts`: The logic engine that generates the study plan based on the syllabus and rules.
- `src/components/Calendar.tsx`: The calendar visualization component.
- `src/app/page.tsx`: The main page displaying the planner.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Customization

To change the study plan rules, edit `src/lib/planner.ts`.
To update the syllabus content, edit `src/data/syllabus.ts`.
