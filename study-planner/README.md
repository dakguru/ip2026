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

## Environment Variables

To enable features like email sending (Forgot Password), you need to configure environment variables.

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### Email Configuration Guides

#### Option 1: Gmail (Personal)
1. Go to your **Google Account** settings > **Security**.
2. Ensure **2-Step Verification** is ON.
3. Search for **"App Passwords"**.
4. Create a new app password (name it "Dak Guru").
5. Copy the 16-character code and use it as `EMAIL_PASS`.

#### Option 2: Zoho Mail (Official/Business)
If you are using a Zoho business email (e.g., admin@dakguru.com), use these settings in `.env.local`:

```env
EMAIL_HOST=smtp.zoho.in  # Use smtp.zoho.com for US accounts
EMAIL_PORT=465
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-zoho-password-or-app-password
```

**Important for Zoho:**
- If you have Two-Factor Authentication (TFA) enabled, you **cannot** use your regular login password. You MUST generate an App Specific Password:
  1. Log in to [Zoho Accounts](https://accounts.zoho.in/).
  2. Go to **Security** > **App Passwords**.
  3. Click **Generate New Password**.
  4. Use the generated password in `EMAIL_PASS`.
