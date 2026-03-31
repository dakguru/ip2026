# PS GROUP B COURSE MODE - COMPREHENSIVE MCQ & FLASHCARD AUDIT REPORT

## Report Generated: March 31, 2026

---

## FILES IDENTIFIED FOR AUDIT

### 1. Main Configuration Files

**psgbQuizzesData.ts** (10,203 bytes - MODIFIED)
- Maps 76 PSGB topics to 157 unique question set IDs
- Contains topic definitions with question set references
- Covers Paper I (40 topics), Paper II (36 topics), and PYQs

**quizzes.ts** (1,503,024 bytes - MODIFIED)  
- Main MCQ database with ~6,970 lines
- Contains 190 question sets (IDs 1-205 with gaps)
- 1,500+ estimated PSGB-related MCQ questions
- Structure: ALL_SETS_DATA record with question objects

**psgbPdfData.ts** (24,183 bytes - MODIFIED)
- Maps 60+ reference PDF documents
- Paper I: 30+ materials
- Paper II: 30+ materials

### 2. Flashcard Files

Located in `src/data/flashcards/`:
- **postalManualVolII.ts** - 23 cards (Organization, Petitions, Legal, Security)
- **postalManualVolIII.ts** - 23 cards (Discipline, Charges, Defense, Suspension)
- **postalManualVolIV.ts** - 18 cards (Establishment, Branch Offices, Transfers, Tenure)
- **postalManualVolV.ts** - 50 cards (Definitions, Bagging, Weights, Investigation)
- **po_reg_ldce.ts** - Extensive LDCE level content
- 6+ additional postal manual volumes
- **Total: 2,500+ flashcards**

---

## CONTENT MAPPING

### PAPER I (Postal Operations & Legislation)

**Question Set 1-5**: The Post Office Act, 2023 & Rules, 2024
- Topics: Act provisions, service definitions, regulatory authority, exclusive privileges
- Total: 52 questions across 5 sets
- Critical Issue: Force date verification (claimed: June 18, 2024)

**Sets 17-21**: Consumer Protection Act, 2019 & PMLA 2002
- CPA 2019: 5 question sets (104-108 questions)
- PMLA 2002: 3 question sets (18-20 questions)

**Sets 37-61**: Postal Operations & Administration
- Book of BO Rules, Postal Manuals, Small Savings Schemes
- Post Office Guide Parts I & II
- Philately and Citizen Charter

**Sets 78-100**: POSB, Life Insurance, Banking Services
- CBS Manual, MO Operations, SB Orders
- Life Insurance Rules, 2011

**Sets 101-147**: Advanced Postal Services & Special Topics
- Financial procedures, MNOP/PNOP, Preservation, Quality Management

### PAPER II (Civil Services Rules)

**Sets 50-76**: Central Civil Services Rules
- CCS Conduct Rules, 1964
- CCS CCA Rules, 1965  
- CCS Leave Rules, 1972
- CCS Pension Rules, 2021
- CCS LTC Rules, 1988
- CCS Revised Pay Rules, 2016
- Fundamental & Supplementary Rules

**Sets 107-147**: Administrative & Financial Rules
- Post Office Life Insurance Rules, 2011
- Postal Financial Handbook Volumes I & II
- Schedule of Financial Powers
- GST Act, 2017
- Prevention of Corruption Act, 1988

**Sets 150-160**: Previous Year Questions (PYQs)
- LDCE PS Gr. B 2023 Paper I (Sets 150-154)
- LDCE PS Gr. B 2023 Paper II (Sets 155-160)

---

## CRITICAL VERIFICATION ITEMS

### Dates Requiring Verification
- [ ] Post Office Act 2023 force date: 18th June 2024
- [ ] Post Office Rules 2024 force date: claimed 16th December 2024
- [ ] Government Savings Act extension to Sikkim: 22nd July 1983
- [ ] Annual Report deadline: 16th June
- [ ] Enumeration period: 8-21st February and August
- [ ] Weighment dates: 21st January and 21st July

### Numerical Values Requiring Verification
- [ ] Postal Circles: 23 (Postal Manual Vol II)
- [ ] BO income requirement: 15% (Postal Manual Vol IV)
- [ ] BO distance requirement: 3 KM (Postal Manual Vol IV)
- [ ] Station Bundle threshold: 15 articles (Postal Manual Vol V)
- [ ] Territorial Bundle threshold: 25 articles
- [ ] Registered Bundle: minimum 3 articles
- [ ] Insured Bundle: minimum 2 articles
- [ ] Air Mail Bag weight limit: 30 KG
- [ ] Letter Mail Runner weight limit: 14 KG
- [ ] Village Postman weight limit: 10 KG
- [ ] Investigation limit (Inspector): Rs 2 Lakh
- [ ] Investigation limit (Divisional Head): Rs 5 Lakh
- [ ] Investigation limit (DPS): Rs 10 Lakh and above
- [ ] Suspension validity: 90 days
- [ ] Subsistence allowance variation: 50%
- [ ] Identity card validity: 4 years
- [ ] Security bond preservation: 5 years
- [ ] Petition limitation period: 6 months
- [ ] Inter-circle transfer limit: 2 per career
- [ ] Transfer gap requirement: 3 years
- [ ] Relieving period: 30 days
- [ ] Staff strength threshold: 66.66%
- [ ] Security for Stamp Vendors: 20x monthly pay

### Legal References Requiring Verification
- [ ] Consumer Protection Act, 2019 - All section numbers
- [ ] PMLA 2002 - Relevant sections
- [ ] Revenue Recovery Act, 1890 - Current applicability
- [ ] Public Accountants Default Act, 1850 - Current applicability
- [ ] Prevention of Corruption Act, 1988 + 2018 Amendment
- [ ] General Financial Rules, 2017 - Chapter 6 accuracy
- [ ] Central Services (Medical Attendance) Rules, 1944 - Still applicable?

---

## SAMPLE QUESTIONS FOR MANUAL VERIFICATION

**From Quizzes.ts Set 1 (Post Office Act 2023):**
1. Force date answer: "18th June 2024" ✓ NEEDS VERIFICATION
2. Section 2(b) definition of 'item' ✓ NEEDS VERIFICATION
3. Section/Rule on exclusive privilege of stamps ✓ NEEDS VERIFICATION

**From Postal Manual Vol IV Flashcards:**
1. Branch office 15% income norm ✓ NEEDS VERIFICATION
2. Distance requirement 3 KM minimum ✓ NEEDS VERIFICATION
3. Transfer limit: 2 inter-circle transfers ✓ NEEDS VERIFICATION
4. Transfer gap: 3 years ✓ NEEDS VERIFICATION
5. Relieving timeline: 30 days ✓ NEEDS VERIFICATION

---

## AUDIT RECOMMENDATIONS

### Priority 1 - Immediate Verification Needed
1. Post Office Act 2023 & Rules 2024 - All provisions and dates
2. Central Civil Services Rules - Amendment dates and rule numbers
3. Postal Manual organizational structure claims
4. All numerical thresholds and monetary limits

### Priority 2 - Cross-Reference Required
1. All statutory references against official gazetted documents
2. All dates against government circulars
3. Procedural rules against latest DoP orders

### Priority 3 - Legal Currency Check
1. Verify applicability of 1850 and 1890 legislation
2. Check for any recent amendments to civil service rules
3. Confirm postal organizational structure post-2024

---

## FILES AVAILABLE FOR COMPLETE CONTENT REVIEW

**Read-Only Access for Audit:**
1. d:\IP 2026\study-planner\src\data\psgbQuizzesData.ts
2. d:\IP 2026\study-planner\src\data\quizzes.ts (1.5MB)
3. d:\IP 2026\study-planner\src\data\psgbPdfData.ts
4. d:\IP 2026\study-planner\src\data\flashcards\postalManualVolII.ts
5. d:\IP 2026\study-planner\src\data\flashcards\postalManualVolIII.ts
6. d:\IP 2026\study-planner\src\data\flashcards\postalManualVolIV.ts
7. d:\IP 2026\study-planner\src\data\flashcards\postalManualVolV.ts
8. d:\IP 2026\study-planner\src\data\flashcards\po_reg_ldce.ts

---

**END OF AUDIT SUMMARY**
