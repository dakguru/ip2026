# Mock Test Application Documentation

## 1. Introduction

### Purpose of the Mock Test Application
The Mock Test Application refers to an advanced digital assessment platform designed to simulate high-stakes competitive examination environments. It facilitates rigorous practice, performance assessment, and strategic preparation for candidates. The primary objective is to provide a standardized, time-bound, and analytically driven testing ecosystem that mirrors actual examination conditions.

### Target Users
The platform is specifically engineered for:
*   **LDCE Aspirants:** Limited Departmental Competitive Examination candidates seeking promotion within postal or administrative cadres.
*   **Departmental Candidates:** Government employees preparing for internal grading or promotional exams.
*   **General Competitive Exam Aspirants:** Users preparing for broader competitive assessments requiring similar testing protocols.

### Role of Mock Tests in Exam Preparation
Mock tests serve as a critical component in the preparatory lifecycle by:
*   Familiarizing candidates with the examination interface and constraints.
*   identifying knowledge gaps through granular performance analysis.
*   Building time management strategies and exam temperament.
*   Providing benchmarking against a peer group via All India Rankings.

## 2. Key Features

### All India Ranking System
The application implements a dynamic ranking algorithm that benchmarks a candidate's performance against the entire pool of test-takers. Rankings are generated post-test window closure to ensure a standardized comparison baseline.

### Time-Bound Test Window
Tests are governed by strict temporal constraints. A specific "Live Window" (e.g., 24 to 48 hours) is defined during which the assessment is active. This enforces discipline and ensures all candidates attempt the test under similar temporal conditions. The "Live Now" status is visually highlighted with distinct styling (e.g., red glow/border) to signal urgency.

### Auto Evaluation and Instant Score
The system utilizes an automated evaluation engine that processes responses immediately upon submission. While raw scores are often available instantly, detailed analytics and rankings may be withheld until the testing window concludes to maintain integrity.

### Topic-Wise and Full-Length Tests
The platform supports diverse test archetypes:
*   **Topic-Wise Tests:** Focused assessments on specific modules (e.g., Postal Manual Vol V, specific Acts).
*   **Full-Length Mocks:** Comprehensive examinations covering the entire syllabus with weighted distribution.

### Secure Test Environment
The application employs state monitoring mechanisms to detect unauthorized navigation or tab-switching, ensuring the sanctity of the examination process.

### Attempt History and Performance Tracking
A persistent longitudinal record of all attempts is maintained, allowing candidates to visualize their performance trajectory over time.

## 3. Test Configuration

The following parameters define the structure of a mock test instance:

| Parameter | Description |
| :--- | :--- |
| **Test Name** | A unique, descriptive identifier for the test (e.g., "Weekly Mock Test - 02"). |
| **Test ID** | A unique system alphanumeric code used for database references (e.g., `mock-2026-01-24`). |
| **Test Window** | The specific date and time range during which the test is accessible (Start Date/Time to End Date/Time). |
| **Duration** | The total time allocated for the test, typically expressed in minutes (e.g., 60 Minutes). |
| **Total Marks** | The maximum aggregate score achievable (e.g., 100 Marks). |
| **Question Count** | The total number of items in the test (e.g., 50 Questions). |
| **Marking Scheme** | Rules defining marks awarded for correct answers and deducted for incorrect ones (Negative Marking). |
| **Enrollment Model** | Accessibility status, defined as Free, Premium (Paid), or Invite-Only. |

## 4. Syllabus & Topic Mapping

### Syllabus Definition
The syllabus is structured hierarchically, mapping questions to specific domains such as Statutory Acts, Departmental Rules, or General Knowledge. This metadata allows for topic-level performance analysis.

### Supported Domains
The platform is optimized for legal and administrative content, supporting:
*   **Acts:** Bare acts and statutory provisions (e.g., Post Office Act, 2023).
*   **Rules & Regulations:** Procedural guidelines and operational manuals.
*   **Mixed Topics:** Integrated assessments combining multiple domains.

### Syllabus Structure (Example)
*   **Postal Manual Volume V:** Definitions, Duties of Mail Guards/Postmen.
*   **Post Office Guide Part I:** Organizational structure, Types of Post Offices.
*   **Product & Services:** Mail products, Banking, Insurance (PLI/RPLI).
*   **General Awareness:** Civics, Geography, Indian History.
*   **Mathematics:** Arithmetic, Reasoning.

## 5. User Flow (Candidate Perspective)

### 1. Login and Enrollment
Users authenticate via secure credentials. Eligible tests are displayed on the dashboard based on the user's subscription tier (Free vs. Gold/Silver).

### 2. Test Availability Window
Candidates access the "Mock Tests" section. A test card indicates the status:
*   **Upcoming:** Displays the start date.
*   **Live:** Button enabled for attempt.
*   **Closed/Missed:** Access restricted to practice mode only.

### 3. Instructions Page
Upon initialization, a comprehensive instruction set is displayed, detailing:
*   Total questions and duration.
*   Marking scheme.
*   Navigation controls.
*   General rules (No back navigation, auto-submission).

### 4. Attempting Questions
The test interface features:
*   **Question Palette:** Grid view of all questions with status indicators (Answered, Not Answered, Marked for Review).
*   **Content Area:** The question text and multiple-choice options.
*   **Timer:** A countdown clock synced to the server.

### 5. Navigation Rules
*   **Next/Previous:** Sequential navigation.
*   **Mark for Review:** Flagging questions for later revisiting.
*   **Clear Response:** Deselecting a chosen option.

### 6. Submission Process
Users may submit manually via the "Submit Test" button. A confirmation dialog prevents accidental closure.

## 6. Evaluation & Results

### Auto Submission Rules
If the timer reaches zero (00:00), the system automatically locks the interface and submits the current state of responses to the server.

### Score Calculation Logic
*   **Correct Answer:** +2 Marks
*   **Incorrect Answer:** 0 Marks (No negative marking for current test series)
*   **Unattempted:** 0 Marks
*   **Display Logic:** Scores are displayed as `Marks Secured / Total Marks` (e.g., 58/100) across all dashboards to ensure clarity, as opposed to raw question counts.

### Rank Generation
*   **Live Rank:** Preliminary rank based on current submissions (optional feature).
*   **Final Rank:** Generated after the test window closes, normalizing for all participants.
*   **Batch Rank:** Ranking within a specific cohort or subscription group.

### Result Publication Timeline
*   **Instant:** Raw score (out of 100) and question-wise correctness.
*   **Scheduled:** Detailed analytics and Leaderboard (typically released 24-48 hours post-exam).

## 7. Reports & Analytics

### Scorecard Details
A summary view presenting:
*   **Marks Secured** (out of total marks, e.g., 100).
*   Percentage.
*   Percentile against the cohort.

### Question-Wise Analysis
A detailed review mode allowing the candidate to traverse the entire test, viewing:
*   The question text and options.
*   The marked answer.
*   The correct answer.
*   Detailed explanatory notes or references.
*   **Download Answer Sheet:** Ability to download a PDF version of the attempted paper. Includes a visual confirmation notification upon successful download initiation.

### Performance Indicators
*   **Accuracy:** (Correct Answers / Total Attempted) * 100.
*   **Speed:** Average time taken per question.
*   **Strength/Weakness:** Subject-wise breakdown of performance.

### Rank List Publication
A public or semi-public leaderboard highlighting top performers (e.g., "Top 7 Rank Holders"), fostering a competitive spirit.

## 8. Admin & Content Management (High-Level)

### Test Creation Workflow
Administrators utilize a backend interface to:
1.  Define test metadata (Title, Date, Duration).
2.  Configure access permissions.

### Question Upload and Validation
*   **Bulk Upload:** Ingestion of questions via JSON or CSV formats.
*   **Parser Integration:** Scripts to convert formatted text documents into structured database entries.
*   **Validation:** Reviewing correct options and explanation content.

### Test Activation and Deactivation
Manual override controls to extend test windows or hide tests in emergency scenarios.

### Result Publishing Controls
Admins can toggle the visibility of the Leaderboard and detailed analytics to manage the result declaration schedule.

## 9. Security & Compliance

### Time Window Enforcement
Server-side validation ensures that attempt requests are rejected outside the designated start and end timestamps.

### Attempt Restrictions
Strict logic enforces a "One Attempt Per User" policy during the live window to prevent malpractice. Re-attempts may be enabled only **after** the window closes for practice purposes.

### Data Integrity
*   **Session Management:** Secure handling of user sessions to prevent identity spoofing.
*   **Encryption:** Transmission of test data over HTTPS.

### Fair Examination Practices
*   **Randomization:** (Optional) Shuffling question order to minimize peer collusion.
*   **Anti-Copy:** Disabling right-click and text selection within the test interface.

## 10. System Requirements

### Supported Devices
*   **Desktop/Laptop:** Windows, macOS, Linux.
*   **Mobile/Tablet:** Android, iOS.

### Browser Compatibility
Optimized for modern EME-compliant browsers:
*   Google Chrome (Recommended)
*   Mozilla Firefox
*   Safari
*   Microsoft Edge

### Internet Requirements
*   A stable broadband or 4G/5G connection is recommended.
*   Minimum bandwidth: 512 Kbps.
*   Latency: <200ms recommended for seamless saving of responses.

## 11. FAQs

### Common Student Queries

**Q: Can I pause the test and resume later?**
A: No, the test is time-bound and must be completed in a single continuous session.

**Q: What happens if my internet disconnects?**
A: The system attempts to locally cache responses. However, a stable connection is required to initiate and submit the test.

**Q: Can I change my answer after selecting it?**
A: Yes, answers can be changed or cleared at any time before the final submission or time expiry.

**Q: When will the All India Rank be declared?**
A: Rankings are typically published on the Monday following the weekend test window.

## 12. Versioning & Updates

### Reference
**Document Version:** 1.1.0
**Last Updated:** January 24, 2026
**Status:** Active

### Change Log

| Version | Date | Description of Changes | Author |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2026-01-24 | Initial release of product documentation. | Documentation Team |
| 1.1.0 | 2026-01-24 | Updated scoring logic (2 marks/question), single attempt enforcement, and UI terminology. | Technical Team |
| 1.2.0 | 2026-01-24 | Added "Live Now" visual highlighting, updated Announcement Popup to "Attempt Now" banner, fixed leaderboard score doubling, corrected score denominators, and added download confirmation notifications. | Technical Team |
