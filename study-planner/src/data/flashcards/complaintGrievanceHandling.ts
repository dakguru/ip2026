import { RawQuestion } from '../quizzes';

// Guidelines and instructions on complaint grievances handling in Department of Posts
// Set 1 (ID 204): All key concepts — classification, mechanisms, timelines, OMs, POSH, PIDPI, SC/ST, CVC
// Answer distribution: A=4, B=4, C=4, D=3

export const complaint_grievance_set1: RawQuestion[] = [
  // q0 → A
  {
    q: "In the context of public administration, a 'Grievance' differs from a 'Complaint' in that it is:",
    o: [
      "Broader than a complaint and often relates to systemic issues or service delivery failures involving injustice or denial of a rightful benefit",
      "A formal written petition submitted only to a court of law",
      "Narrower than a complaint and limited to financial losses only",
      "Restricted to service matters raised by departmental employees alone",
    ],
    a: 0,
    e: "A Complaint is an expression of dissatisfaction where a response is expected. A Grievance is broader — a formal or informal claim regarding injustice, unfair treatment, or denial of a rightful service/benefit, and often relates to systemic issues or service delivery failures.",
  },
  // q1 → C
  {
    q: "CPGRAMS, the online grievance portal used in the Department of Posts, was developed by NIC in association with which organizations?",
    o: [
      "Department of Posts and Ministry of Communications",
      "Ministry of Finance and Department of Administrative Reforms",
      "Directorate of Public Grievances (DPG) and Department of Administrative Reforms and Public Grievances (DARPG)",
      "Central Vigilance Commission and Department of Personnel and Training",
    ],
    a: 2,
    e: "CPGRAMS (Centralized Public Grievance Redress and Monitoring System) is an online web-enabled system developed by NIC in association with the Directorate of Public Grievances (DPG) and Department of Administrative Reforms and Public Grievances (DARPG). Grievances pertaining to DoP are routed through designated Nodal Officers.",
  },
  // q2 → B
  {
    q: "Which of the following is the primary internal IT-enabled platform of the Department of Posts for registering, tracking, and resolving customer complaints at Post Office, Division, and Circle levels?",
    o: [
      "CPGRAMS",
      "India Post CRM (Customer Relationship Management) Portal",
      "SHe-Box",
      "PIDPI Portal",
    ],
    a: 1,
    e: "The India Post CRM (Customer Relationship Management) Portal is the primary internal IT-enabled platform. CPGRAMS is the Government of India portal (DARPG), while CRM is the internal DoP system governed by a comprehensive SOP issued vide OM 009/5/2023-PG dated 04-09-2023.",
  },
  // q3 → D
  {
    q: "As per CVC Guidelines (OM 39-1/2010-Vig dated 29-03-2016), what action must be taken on anonymous or pseudonymous complaints?",
    o: [
      "A preliminary enquiry must be ordered to verify the allegations",
      "They must be referred to the CVC for a decision",
      "They must be forwarded to the Vigilance Officer for initial verification",
      "No action whatsoever; they must be filed and kept on record",
    ],
    a: 3,
    e: "CVC Circular 39-1/2010-Vig dated 29-03-2016 imposes an absolute prohibition: no action whatsoever is to be taken on anonymous (no name/address) or pseudonymous (fictitious name/address) complaints. They must be simply filed and kept on record without initiating any preliminary enquiry.",
  },
  // q4 → A
  {
    q: "In the Department of Posts, if a complaint received with a name and address is sent a registered acknowledgment, but the letter returns undelivered or the complainant denies sending it, it is treated as:",
    o: [
      "A pseudonymous complaint and filed without any action",
      "An anonymous complaint requiring CVC reference",
      "A genuine complaint requiring immediate investigation",
      "A frivolous complaint subject to action against the complainant",
    ],
    a: 0,
    e: "As per the verification procedure for anonymous/pseudonymous complaints: if the registered acknowledgment returns undelivered or the complainant denies sending it, the complaint is deemed pseudonymous and filed without any action being taken, in accordance with CVC guidelines.",
  },
  // q5 → B
  {
    q: "PIDPI, the framework for protecting genuine whistleblowers in the Department of Posts, stands for:",
    o: [
      "Postal Identity Disclosure and Protection of Informants",
      "Public Interest Disclosure and Protection of Informers",
      "Public Information Disclosure and Privacy of Informants",
      "Postal Internal Disclosure and Protection of Interests",
    ],
    a: 1,
    e: "PIDPI stands for Public Interest Disclosure and Protection of Informers. Under this framework, the envelope is opened only by a designated nodal officer, and the identity of the whistleblower is concealed using a pseudonym or reference number to protect the employee/citizen from harassment or retaliation.",
  },
  // q6 → C
  {
    q: "The Chairperson of the Internal Complaints Committee (ICC) constituted under the POSH Act in the Department of Posts must be:",
    o: [
      "Any officer of the rank of Divisional Superintendent or above",
      "A Government servant appointed by the Directorate, irrespective of gender",
      "A senior female employee",
      "The Head of the Office where the ICC is constituted",
    ],
    a: 2,
    e: "As per OM 11013/2/2014-Estt.A-III dated 07-11-2016: the Chairperson of the Complaint Committee must be a senior female employee. If a female officer of sufficient seniority is not available in the same office, she can be nominated from another office to ensure the Chairperson is not junior to the accused.",
  },
  // q7 → D
  {
    q: "The report of the Internal Complaints Committee (ICC) in sexual harassment cases is treated as:",
    o: [
      "A final order directly operative against the accused",
      "An advisory recommendation which the disciplinary authority may or may not accept",
      "A show-cause notice to be served on the accused",
      "A preliminary enquiry report, allowing the Disciplinary Authority to frame charges",
    ],
    a: 3,
    e: "As per OM 11013/3/2009-Estt.(A) dated 08-10-2009: the ICC's report is treated directly as a preliminary enquiry report, allowing the Disciplinary Authority to frame charges without needing a separate parallel investigation.",
  },
  // q8 → A
  {
    q: "The SHe-Box portal, used for registering sexual harassment complaints, was launched by which OM and routes complaints to:",
    o: [
      "OM 11013/7/2016-Estt.A-III dated 11-01-2017; routes complaints to the concerned Ministry/Department's ICC",
      "OM 39-1/2010-Vig dated 29-03-2016; routes complaints to the CVC",
      "OM 009/5/2023-PG dated 04-09-2023; routes complaints to the Circle CPMG",
      "OM 36034/2/83-Estt(SCT) dated 23-02-1983; routes complaints to the SC/ST Commissioner",
    ],
    a: 0,
    e: "The SHe-Box (Sexual Harassment electronic-Box) was launched via OM 11013/7/2016-Estt.A-III dated 11-01-2017. Complaints filed on SHe-Box are routed directly to the concerned Ministry/Department's ICC through the Ministry of Women and Child Development.",
  },
  // q9 → B
  {
    q: "Under OM 8/2/69-(SCT)(1) dated 01-10-1974, SC/ST Government servants have the right to:",
    o: [
      "File complaints only through their Head of Office",
      "Write directly to the Commissioner for SC/ST, bypassing normal proper channels, if they feel their complaints are being suppressed locally",
      "Approach the Supreme Court directly without exhausting departmental remedies",
      "File complaints only through the Staff Council or recognized service associations",
    ],
    a: 1,
    e: "OM 8/2/69-(SCT)(1) dated 01-10-1974 clarifies that SC/ST Government servants have the right to write directly to the Commissioner for SC/ST, bypassing the normal proper channel, if they feel their complaints are being suppressed locally.",
  },
  // q10 → C
  {
    q: "In the Department of Posts, which officer acts as the primary nodal authority for all CRM and CPGRAMS tickets pertaining to their division?",
    o: [
      "Postmaster of the concerned Head Post Office",
      "Chief Postmaster General (CPMG) of the Circle",
      "Divisional Superintendent (SP/SSP)",
      "Public Grievance Officer at Directorate level",
    ],
    a: 2,
    e: "The Divisional Superintendent (SP/SSP) acts as the primary Nodal Officer for all CRM and CPGRAMS tickets pertaining to their division. They also conduct weekly reviews of pending grievances to ensure zero pendency beyond the stipulated timeline.",
  },
  // q11 → D
  {
    q: "As per OM 10-32/2013-BD&MD (Vol-II) dated 11-12-2015, a CRM grievance regarding non-payment of Cash on Delivery (COD) amount can be closed only after:",
    o: [
      "The article is traced and delivered to the addressee",
      "A regret letter is issued to the complainant",
      "The Postmaster certifies that the COD transaction occurred",
      "The COD amount is physically credited to the sender's account",
    ],
    a: 3,
    e: "OM 10-32/2013-BD&MD (Vol-II) dated 11-12-2015 mandates: 'No CRM grievance regarding COD can be closed until the specific financial transaction — crediting the biller's/sender's account — is successfully completed and verified.' This directly addresses a major e-commerce grievance.",
  },
  // q12 → A
  {
    q: "Which OM reduced the stipulated timelines for disposal of grievances on the India Post CRM Platform and introduced an auto-escalation matrix?",
    o: [
      "OM PG-01/3/2021-PG-DoP dated 18-08-2022",
      "OM 14-03/2018-PG dated 25-06-2018",
      "OM 009/5/2023-PG dated 04-09-2023",
      "OM 104/76/2011-AVD.I dated 18-10-2013",
    ],
    a: 0,
    e: "OM PG-01/3/2021-PG-DoP dated 18-08-2022 reduced the stipulated timelines for disposal of grievances on the CRM Platform (shifting from the traditional 30-day window to 7–15 days depending on complaint category) and implemented an auto-escalation matrix when first-level resolution breaches the new shortened timelines.",
  },
  // q13 → B
  {
    q: "Complaints against Secretaries to the Government of India (High-Level Administrative Complaints) are handled by:",
    o: [
      "The Central Vigilance Commission directly",
      "A specialized Group of Ministers or a high-level apex committee, before any formal enquiry is sanctioned",
      "The Department of Administrative Vigilance through standard disciplinary procedure",
      "The Cabinet Secretary through a normal departmental inquiry",
    ],
    a: 1,
    e: "As per OM 104/100/2009-AVD.I dated 14-01-2010: complaints against Secretaries to the Government of India undergo a specialized scrutiny by a Group of Ministers or a high-level apex committee before any formal enquiry or agency investigation (like CBI) can be initiated. This protects top-level decision-making from frivolous or vindictive complaints.",
  },
  // q14 → C
  {
    q: "The most recent comprehensive Standard Operating Procedure (SOP) for complaint handling on India Post CRM was issued vide which OM, and what does it explicitly ban?",
    o: [
      "OM 14-03/2018-PG dated 25-06-2018; bans compensation payments without investigation",
      "OM PG-01/3/2021-PG-DoP dated 18-08-2022; bans transfer of complaints to other offices",
      "OM 009/5/2023-PG dated 04-09-2023; bans one-line replies like 'Closed', 'Delivered', or 'Sorted'",
      "OM 104/76/2011-AVD.I dated 18-10-2013; bans anonymous complaints from being registered",
    ],
    a: 2,
    e: "OM 009/5/2023-PG dated 04-09-2023 issued the comprehensive SOP for complaint handling on CRM. It dictates the exact workflow (Acknowledgment → Root Cause Analysis → Rectification → Polite Drafting of Final Reply → Closure) and explicitly bans 'one-line replies' such as 'Closed,' 'Delivered,' or 'Sorted,' requiring descriptive resolutions.",
  },
];
