import { RawQuestion } from '../quizzes';

// CCS (Revised Pay) Rules, 2016
// Set 1 (ID 199): Rules 1–10 — Short title, Application, Definitions, Level of posts, Drawal of pay, Option, Pay fixation, Direct recruitment, Increments, Increment dates
// Set 2 (ID 200): Rules 11–17 — Revision from subsequent dates, Pay protection, Promotion fixation, Arrears, Overriding effect, Power to relax, Interpretation
// Answer distribution per set: A=4, B=4, C=4, D=3

export const ccs_revised_pay_rules_set1: RawQuestion[] = [
  // q0 → A
  {
    q: "The CCS (Revised Pay) Rules, 2016 are deemed to have come into force on:",
    o: [
      "1st January, 2016",
      "1st April, 2016",
      "1st July, 2016",
      "1st January, 2017",
    ],
    a: 0,
    e: "Rule 1(2) states: 'They shall be deemed to have come into force on the **1st day of January, 2016**.'",
  },
  // q1 → C
  {
    q: "The CCS (Revised Pay) Rules, 2016 apply to persons in service of the Government of India under which estimates?",
    o: [
      "Defence Services Estimates and Civil Estimates only",
      "Railway Estimates and Civil Estimates only",
      "Civil Estimates and Indian Audit and Accounts Department Estimates",
      "All Central Government Estimates including Railways and Defence",
    ],
    a: 2,
    e: "Rule 2(1) states the Rules apply to persons serving in connection with the affairs of the Union whose pay is debitable to **Civil Estimates** and to persons serving in the **Indian Audit and Accounts Department**.",
  },
  // q2 → B
  {
    q: "Which of the following categories of employees is EXCLUDED from the applicability of CCS (Revised Pay) Rules, 2016?",
    o: [
      "Central Secretariat Service Group B officers",
      "Employees under the Government of National Capital Territory of Delhi",
      "Members of the Central Health Service",
      "Assistants in the Ministry of External Affairs",
    ],
    a: 1,
    e: "Rule 2(2) excludes employees serving under the **Government of National Capital Territory of Delhi** (and UT of Chandigarh — Group A, B and C), locally recruited staff at diplomatic missions, piece-rate/contingency-paid workers, and persons re-employed after retirement, among others.",
  },
  // q3 → D
  {
    q: "Under Rule 3 of CCS (Revised Pay) Rules, 2016, 'existing basic pay' means:",
    o: [
      "Pay in the revised pay structure as on 1st January 2016",
      "Pay drawn in the Pay Band plus Grade Pay, as applicable on 31st December 2015",
      "Pay drawn in the applicable Level as per the Pay Matrix",
      "Pay drawn in the prescribed existing Pay Band plus the applicable Grade Pay on 31st December 2015",
    ],
    a: 3,
    e: "'Existing basic pay' is defined in Rule 3(vi) as **pay drawn in the prescribed existing Pay Band plus the applicable Grade Pay** on 31st December 2015, or the emoluments which count as pay.",
  },
  // q4 → A
  {
    q: "The 'Pay Matrix' referred to in CCS (Revised Pay) Rules, 2016 is contained in:",
    o: [
      "Part A of the Schedule to the Rules",
      "Part B of the Schedule to the Rules",
      "Annexure I to Rule 7",
      "Appendix to Rule 4",
    ],
    a: 0,
    e: "Rule 3(xi) defines 'Pay Matrix' as the Matrix specified in **Part A of the Schedule** to these Rules, with Levels of pay arranged in vertical columns and pay in each Level arranged in horizontal rows.",
  },
  // q5 → B
  {
    q: "Under Rule 5 of CCS (Revised Pay) Rules, 2016, the option to draw pay in the existing pay structure instead of the revised structure is NOT admissible to:",
    o: [
      "An employee who was promoted before 1st January 2016",
      "A person appointed for the first time in Government service on or after 1st January 2016",
      "An employee on deputation abroad as on 1st January 2016",
      "An employee on extra-ordinary leave as on 1st January 2016",
    ],
    a: 1,
    e: "The proviso to Rule 5 states that the option is **not admissible to persons appointed for the first time in Government service**, or by direct recruitment, or by transfer on or after 1st January 2016. Such persons must draw pay in the revised pay structure.",
  },
  // q6 → C
  {
    q: "The option to continue in the existing pay structure under Rule 5 must be exercised in writing within:",
    o: [
      "One month of the date of notification of the Rules",
      "Six months of the date of notification of the Rules",
      "Three months of the date of notification of the Rules",
      "One year of the date of notification of the Rules",
    ],
    a: 2,
    e: "Rule 6(1) provides that the option shall be exercised in writing and communicated to the Head of Office within **three months** of the date of notification of these Rules (or within three months of return from leave/deputation, etc., if applicable).",
  },
  // q7 → D
  {
    q: "Under Rule 6, if an employee does not communicate the option within the prescribed time, he shall be deemed to have elected:",
    o: [
      "The existing pay structure until his next promotion",
      "The existing pay structure until he resigns or retires",
      "The revised pay structure from the date of notification of the Rules",
      "The revised pay structure from 1st January, 2016",
    ],
    a: 3,
    e: "Rule 6(3) provides: 'Where an intimation is not received within the time specified ... the employee concerned shall be deemed to have elected the **revised pay structure from 1st January, 2016**.'",
  },
  // q8 → A
  {
    q: "The fitment factor used for pay fixation under Rule 7 of CCS (Revised Pay) Rules, 2016 is:",
    o: [
      "2.57",
      "2.72",
      "2.67",
      "3.00",
    ],
    a: 0,
    e: "Rule 7(1)(A)(i) provides: 'The pay in the applicable Level in the Pay Matrix shall be the pay obtained by multiplying the existing basic pay by a factor of **2.57**.' The resultant figure is rounded off to the nearest rupee and then located in the Level.",
  },
  // q9 → C
  {
    q: "Under Rule 7, if the figure arrived at after applying the fitment factor of 2.57 does not match any Cell in the applicable Level, pay is fixed at:",
    o: [
      "The immediately lower Cell in the Level",
      "A specially created Cell added to the Level",
      "The next higher Cell in that Level",
      "The minimum pay of the next higher Level",
    ],
    a: 2,
    e: "Rule 7(1)(A)(ii) states: 'If the figure ... does not correspond to any Cell in the applicable Level in the Pay Matrix, he shall be placed at the **next higher Cell** in that Level.'",
  },
  // q10 → B
  {
    q: "Under Rule 8, a Government servant appointed directly to a post on or after 1st January 2016 shall have his pay fixed at:",
    o: [
      "The Cell corresponding to the fitment factor of 2.57 applied to the minimum pay of the pre-revised pay band",
      "The minimum pay, i.e., the first Cell in the Level applicable to the post",
      "Any Cell in the Level as agreed upon by the appointing authority",
      "The same Cell as the retiring predecessor in the same post",
    ],
    a: 1,
    e: "Rule 8 states: 'A Government servant who is appointed to a post on or after 1st January, 2016 shall be fixed at the **minimum pay**, that is, the first Cell in the Level applicable to the post to which he is appointed.'",
  },
  // q11 → D
  {
    q: "Under Rule 9 of CCS (Revised Pay) Rules, 2016, increments are granted:",
    o: [
      "Based on a percentage of basic pay, as recommended by the pay commission",
      "As a fixed amount uniformly for all Levels",
      "Based on Annual Performance Assessment Report grading",
      "By moving from the current Cell to the next vertical Cell in the applicable Level of the Pay Matrix",
    ],
    a: 3,
    e: "Rule 9 provides: 'In the revised pay structure, a Government servant shall draw pay in the Level ... and his pay shall, on grant of increment, be raised to the **next Cell** in that Level in the Pay Matrix.'",
  },
  // q12 → A
  {
    q: "There are how many dates for grant of annual increment under Rule 10 of CCS (Revised Pay) Rules, 2016?",
    o: [
      "Two — 1st January and 1st July every year",
      "One — 1st July every year",
      "Four — one per quarter of each year",
      "One — on the anniversary of the date of appointment",
    ],
    a: 0,
    e: "Rule 10(1) states: 'There shall be **two dates for grant of increment namely, 1st January and 1st July** of every year, instead of the existing system of annual increment being granted on 1st July every year.'",
  },
  // q13 → B
  {
    q: "Under Rule 10, an employee appointed or promoted between 2nd January and 1st July (both inclusive) shall have his next increment on:",
    o: [
      "1st July of the same year",
      "1st January of the following year",
      "The anniversary date of his appointment",
      "1st July of the following year",
    ],
    a: 1,
    e: "Rule 10(1)(ii) provides: 'An employee appointed or promoted or granted financial upgradation between 2nd day of January and 1st day of July ... shall receive his next increment on the **1st day of January** of the following year.'",
  },
  // q14 → C
  {
    q: "An employee appointed or promoted between 2nd July and 1st January (both inclusive) is entitled to his next increment on:",
    o: [
      "1st January of the same year",
      "The next anniversary of his date of appointment",
      "1st July of the following year",
      "1st January of the following year",
    ],
    a: 2,
    e: "Rule 10(1)(i) provides: 'An employee appointed or promoted or granted financial upgradation between 2nd day of July and 1st day of January ... shall receive his next increment on the **1st day of July** of the following year.'",
  },
];

export const ccs_revised_pay_rules_set2: RawQuestion[] = [
  // q0 → B
  {
    q: "Under Rule 11, when the pay of a Government servant is required to be revised from a date subsequent to 1st January 2016 (e.g., on resetting of pay), pay is fixed in accordance with:",
    o: [
      "Rule 8 — at the minimum of the new Level",
      "Rule 7(1)(A) — applying the fitment factor to the basic pay at that time",
      "Rule 13 — the promotion pay fixation formula",
      "Rule 5 — by exercising option for revised pay structure",
    ],
    a: 1,
    e: "Rule 11 states that where revision is from a date subsequent to 1st January 2016, pay shall be fixed as specified in **Rule 7(1)(A)** — i.e., by applying the fitment factor method with necessary adjustments.",
  },
  // q1 → A
  {
    q: "Rule 12 of CCS (Revised Pay) Rules, 2016 deals with:",
    o: [
      "Pay protection on Central deputation under the Central Staffing Scheme",
      "Fixation of pay on promotion to a higher Level",
      "Drawal of pay in the revised pay structure",
      "Option to retain the existing pay structure",
    ],
    a: 0,
    e: "Rule 12 specifically provides for **pay protection on appointment/deputation to ex-cadre posts under the Central Staffing Scheme**, ensuring the employee does not suffer a pay disadvantage.",
  },
  // q2 → C
  {
    q: "Under Rule 13, on promotion or grant of financial upgradation, the promoted employee's pay is fixed as follows:",
    o: [
      "He is placed at the minimum Cell of the promoted Level",
      "He is placed at the Cell in the promoted Level equal to his present pay",
      "One increment is first given in the current Level; he is then placed at the Cell in the promoted Level equal to or next higher than the figure so arrived at",
      "His existing pay is multiplied by 2.57 and placed at the next Cell in the promoted Level",
    ],
    a: 2,
    e: "Rule 13(1)(i) provides: '**One increment shall be given in the Level from which the employee is promoted** and he shall be placed at a Cell equal to the figure so arrived at in the Level of the post to which promoted and if no such Cell is available in the Level of the promoted post, he shall be placed at the next higher Cell in that Level.'",
  },
  // q3 → D
  {
    q: "The arrears payable under Rule 14 on account of the revision of pay and allowances were required to be paid during:",
    o: [
      "Financial year 2015–16",
      "Financial year 2017–18 in three equal instalments",
      "Financial year 2016–17 in two equal instalments",
      "Financial year 2016–17",
    ],
    a: 3,
    e: "Rule 14(1) provides that arrears of pay and allowances shall be paid during the **financial year 2016-17**. The arrears represent the difference between amounts payable in the revised pay structure (with DA) from 1st January 2016 and the amounts actually paid.",
  },
  // q4 → A
  {
    q: "Under Rule 14(2), the arrears payable to a Government servant are the difference between:",
    o: [
      "The aggregate of pay and DA to which the servant would have been entitled in the revised pay structure from 1st January 2016, and the aggregate of pay and DA actually drawn by him",
      "The Grade Pay and Pay Band under the pre-revised structure and the equivalent Level pay",
      "The minimum Cell of the new Level and the existing basic pay as on 31st December 2015",
      "Revised pay drawn and the pay that would have been due had the revision been from 1st April 2016",
    ],
    a: 0,
    e: "Rule 14(2) defines arrears as the difference between **(a)** the aggregate of revised pay and DA applicable from 1st January 2016, and **(b)** the aggregate of existing pay and DA actually drawn — the balance is the arrear payable.",
  },
  // q5 → B
  {
    q: "Rule 15 of CCS (Revised Pay) Rules, 2016 provides that these Rules shall have:",
    o: [
      "A prospective effect only, not affecting any past entitlements",
      "An overriding effect, superseding anything inconsistent in previous CCS (Revised Pay) Rules",
      "Effect only for posts in the Central Secretariat",
      "Effect subject to concurrence of the Finance Ministry in each case",
    ],
    a: 1,
    e: "Rule 15 states: 'The provisions of these rules shall have effect notwithstanding anything to the contrary contained in **any rule, order or instruction regarding the revision of pay** issued before the commencement of these rules.' This gives the 2016 Rules overriding effect.",
  },
  // q6 → C
  {
    q: "Rule 16 of CCS (Revised Pay) Rules, 2016 — Power to relax — empowers whom to dispense with or relax provisions of these Rules?",
    o: [
      "The Ministry of Finance, with UPSC concurrence",
      "The Cabinet Secretary, in consultation with the Finance Secretary",
      "The President of India",
      "The Chairman of the Sixth or Seventh Pay Commission",
    ],
    a: 2,
    e: "Rule 16 vests the power to relax in **the President**, who may, by order, dispense with or relax the requirements of any of the provisions of these Rules in respect of any class or category of persons.",
  },
  // q7 → D
  {
    q: "Under Rule 17, if any question relating to the interpretation of CCS (Revised Pay) Rules, 2016 arises, it shall be referred to:",
    o: [
      "The Attorney General of India for a legal opinion",
      "The Supreme Court of India through a reference by the President",
      "The Department of Expenditure, Ministry of Finance",
      "The Central Government, whose decision shall be final",
    ],
    a: 3,
    e: "Rule 17 states: 'If any question arises as to the interpretation of these rules, it shall be referred to **the Central Government** whose decision thereon shall be final.'",
  },
  // q8 → A
  {
    q: "In the illustration given under Rule 7 in CCS (Revised Pay) Rules, 2016, an employee drawing Grade Pay of ₹2400 (Level 4) with an existing basic pay of ₹12,560 has his revised pay fixed at:",
    o: [
      "₹32,300 in Level 4",
      "₹32,279 in Level 4",
      "₹32,400 in Level 4",
      "₹33,500 in Level 4",
    ],
    a: 0,
    e: "As per the illustration: ₹12,560 × 2.57 = ₹32,279.20 → rounded to ₹32,279. Since no exact Cell exists, pay is fixed at the **next higher Cell, i.e., ₹32,300 in Level 4**.",
  },
  // q9 → C
  {
    q: "Under Rule 6(2) of CCS (Revised Pay) Rules, 2016, the option once exercised is:",
    o: [
      "Revisable once within 12 months",
      "Revisable at the time of next annual increment only",
      "Final and cannot be modified",
      "Subject to review by the Head of Office annually",
    ],
    a: 2,
    e: "Rule 6(2) explicitly states: 'The option once exercised shall be **final**.'",
  },
  // q10 → B
  {
    q: "An employee who had opted for the existing pay structure under Rule 5 is required to switch to the revised pay structure when he:",
    o: [
      "Completes 10 years of continuous service",
      "Earns his next increment in the existing structure, gets a promotion, or vacates his post",
      "Gets his annual performance appraisal rated 'Outstanding'",
      "Reaches the maximum of his existing Pay Band",
    ],
    a: 1,
    e: "Rule 5 (proviso) states that an employee who opts for the existing structure shall come over to the revised structure from the date he **earns his next increment** in the existing structure, or from the date of his **next promotion or financial upgradation**, or from the date he **vacates the post** or **ceases to draw pay** in the existing structure.",
  },
  // q11 → D
  {
    q: "The CCS (Revised Pay) Rules, 2016 are based on the recommendations of which Pay Commission?",
    o: [
      "Fifth Central Pay Commission",
      "Sixth Central Pay Commission",
      "Eighth Central Pay Commission",
      "Seventh Central Pay Commission",
    ],
    a: 3,
    e: "The CCS (Revised Pay) Rules, 2016 implement the recommendations of the **Seventh Central Pay Commission**, which submitted its report in November 2015. The Rules introduced the Pay Matrix concept replacing Pay Bands and Grade Pay.",
  },
  // q12 → A
  {
    q: "Under Rule 13, if no Cell is available in the promoted Level equal to the figure arrived at after granting one increment, pay is fixed at:",
    o: [
      "The next higher Cell in the promoted Level",
      "The minimum Cell (first Cell) of the promoted Level",
      "The same Cell the employee occupied in his previous Level",
      "A special Cell created by order of the Ministry of Finance",
    ],
    a: 0,
    e: "Rule 13(1)(i) states: 'If no such Cell is available in the Level of the promoted post, he shall be placed at the **next higher Cell in that Level**.'",
  },
  // q13 → C
  {
    q: "Which of the following statements regarding annual increment under CCS (Revised Pay) Rules, 2016 is CORRECT?",
    o: [
      "An employee is entitled to two increments per year — one on 1st January and one on 1st July",
      "An employee appointed on 1st April will earn his first increment on 1st July of the same year",
      "Only ONE annual increment is admissible to a Government servant in a given year",
      "Increment is admissible even if the employee is under suspension throughout the year",
    ],
    a: 2,
    e: "Rule 10(1) clearly states: 'A Government servant shall be entitled to **only one annual increment** either on 1st January or on 1st July depending on the date of his appointment, promotion, or grant of financial upgradation.'",
  },
  // q14 → B
  {
    q: "For purposes of pay fixation under Rule 7, the 'existing emoluments' of a Government servant include:",
    o: [
      "Basic pay + DA + HRA as on 31st December 2015",
      "Existing basic pay + dearness allowance admissible at the index average relevant as on 1st January 2006",
      "Basic pay + transport allowance as on 1st January 2016",
      "Pay Band amount + Grade Pay + transport allowance as on 31st December 2015",
    ],
    a: 1,
    e: "Rule 3(ix) defines 'existing emoluments' as **existing basic pay + dearness allowance admissible at the index average relevant as on 1st January 2006** (i.e., DA at 125% — the rate applicable to the pre-revised pay structure for fitment purposes).",
  },
];
