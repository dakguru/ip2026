import React from 'react';
import { Book, Scale, FileText, Award, Globe, Shield, Briefcase, Landmark, Calculator, Mail } from 'lucide-react';

export const psgbSyllabusData = {
  paper1: {
    title: "Paper I: Acts, Rules and General Knowledge",
    subtitle: "150 Questions • 300 Marks • 3 Hours",
    description: "Covers Acts, Rules, Guidelines, and general operations of the Department.",
    sections: [
      {
        category: "Acts",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Consumer Protection Act, 2019", link: null },
          { name: "Prevention of Money Laundering Act, 2002", link: null }
        ]
      },
      {
        category: "Inland/ Foreign Post",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "The Post Office Act, 2023 & The Post Office Rules, 2024", link: null },
          { name: "The Post Office Regulations, 2024", link: null },
          { name: "Post Office Guide Part I", link: null },
          { name: "Post Office Guide Part II", link: null },
          { name: "Domestic/Foreign Post guidelines issued by Directorate", link: null },
          { name: "Book of BO Rules", link: null }
        ]
      },
      {
        category: "Postal Manual",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Postal Manual Volume V", link: null },
          { name: "Postal Manual Volume II (Chapter-I-organization)", link: null }
        ]
      },
      {
        category: "Mail Operations",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Guidelines issued by Directorate from time to time on Mail Network optimization Project/PNOP / Business Development", link: null }
        ]
      },
      {
        category: "Money Remittance",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Guidelines issued by Directorate on eMO, iMO, IMTS and IFS MO", link: null }
        ]
      },
      {
        category: "Saving Bank Scheme and Certificates",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Government Savings Promotion General Rules, 2018", link: null },
          { name: "PO Small Savings Schemes", link: null },
          { name: "Post Office Saving Bank Manual Volume I & II", link: null },
          { name: "SB orders issued by Directorate from 01.01.2007 onwards.", link: null },
          { name: "Guidelines issued by Directorate from time to time on Core Banking Services", link: null },
          { name: "Post Office Saving Bank (CBS) Manual", link: null }
        ]
      },
      {
        category: "Postal Life Insurance and Rural PLI",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Post Office Life Insurance Rules, 2011", link: null },
          { name: "Guidelines issued by Directorate from time to time on PLI/RPLI and Core Insurance solution", link: null }
        ]
      },
      {
        category: "Organization of the Department",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Citizen Charter of Department of Posts.", link: null },
          { name: "Guidelines and instructions on complaint grievances handling in Department of Posts.", link: null }
        ]
      },
      {
        category: "IT Modernization",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Guidelines issued by Directorate from time to time on IT modernization Project of Department of Posts", link: null }
        ]
      },
      {
        category: "Philately",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Handbook on Philately", link: null },
          { name: "Directorate instructions on Philately", link: null }
        ]
      },
      {
        category: "Office Procedure",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Postal Manual Volume II - Chapter XI - Misc. Rules", link: null },
          { name: "Manual of Office Procedure", link: null },
          { name: "Annual Reports and Book of Information of D/o Posts", link: null }
        ]
      },
      {
        category: "Material Management",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Postal Manual Volume II Chapter VI (Stock), VIII (Printing), IX(Contracts), XII (Budget Estimates and control)", link: null },
          { name: "Chapter 6 of General Financial Rules, 2017", link: null },
          { name: "CVC guidelines on Public procurement, guide-lines and instructions on e-procurement.", link: null },
          { name: "Manual on policies and procedure for purchase of goods and services available on website of Ministry of Finance.", link: null }
        ]
      },
      {
        category: "Establishment and Administrative matters",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Postal Manual Volume IV.", link: null },
          { name: "Instructions issued by Directorate and DoP&T on maintenance of APAR.", link: null },
          { name: "Schedule of Financial Powers of Divisional Heads, Head of the Circle, etc.", link: null },
          { name: "Welfare measures available to Departmental Employees and Gramin Dak Sevak of DoP.", link: null },
          { name: "DoP&T instructions issued from time to time on Establishment and administration.", link: null },
          { name: "Brochure on reservation, instructions regarding sports person reservation, compassionate appointment guidelines issued by DoP and DoP&T from time to time.", link: null },
          { name: "Recruitment Rules relating to various cadres in D/o Posts", link: null, pdfs: [{ title: "Recruitment Rules relating to various cadres in D/o Posts", path: "/notes/paper-1/Rectt Rules of DOP.pdf" }] },
          { name: "Establishment Norms", link: null }
        ]
      },
      {
        category: "Current Affairs",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "15 questions for 30 marks", link: null }
        ]
      },
      {
        category: "Noting and Drafting",
        icon: <Book className="w-5 h-5" />,
        items: [
          { name: "Noting and Drafting for 25 marks each", link: null }
        ]
      }
    ]
  },
  paper2: {
    title: "Paper II: Rules and Regulations",
    subtitle: "150 Questions • 300 Marks • 3 Hours",
    description: "Detailed knowledge of Central Civil Services rules, Postal Manuals, and related laws.",
    sections: [
      {
        category: "CCS Rules",
        icon: <Briefcase className="w-5 h-5" />,
        items: [
          { name: "Central Civil Services (Conduct) Rules, 1964", link: null },
          { name: "Central Civil Services (Classification, Control and Appeal) Rules, 1965", link: null },
          { name: "Central Civil Services (Temporary Service Rules), 1965", link: null },
          { name: "Brochure on Casual labourer", link: null },
          { name: "CCS (Pension) Rules, 2021", link: null },
          { name: "CCS NPS Rules (Implementation & Gratuity)", link: null },
          { name: "Central Civil Services (Commutation of Pension) Rules, 1981", link: null },
          { name: "Central Civil Services (Leave) Rules, 1972", link: null },
          { name: "Central Civil Services (Joining Time) Rules, 1979", link: null, pdfs: [{ title: "CCS Joining Time Rules", path: "/notes/paper-2/CCS Joining Time Rules.pdf" }] },
          { name: "General Provident Fund (Central Service) Rules, 1960", link: null },
          { name: "Central Services (Medical Attendance) Rules, 1944", link: null },
          { name: "FR & SR - General Rules", link: null },
          { name: "FR & SR - TA Rules", link: null },
          { name: "FR & SR - DA, DR & HRA Rules", link: null },
          { name: "Central Civil Services (Leave Travel Concession) Rules, 1988", link: null },
          { name: "Central Civil Services (Revised Pay) Rules, 2016", link: null },
          { name: "Rules relating to Children Education allowance and reimbursement of Hostel Subsidy", link: null },
          { name: "Central Government Employees Group Insurance Scheme, 1980", link: null },
          { name: "Central Civil Services (Recognition of Service Association) Rules, 1993", link: null, pdfs: [{ title: "CCS RSA Rules", path: "/notes/paper-2/CCS RSA Rules.pdf" }] }
        ]
      },
      {
        category: "Postal Manual",
        icon: <Briefcase className="w-5 h-5" />,
        items: [
          { name: "Postal Manual Volume III", link: null },
          { name: "Postal Manual Volume II: Chapter III - Appeals and Petitions, Chapter IV-Personal matters, Chapter V-Security Deposits, Chapter VII - Forged counterfeit stamps and defaced postage stamps, coins and currency notes.", link: null }
        ]
      },
      {
        category: "Subjects",
        icon: <Briefcase className="w-5 h-5" />,
        items: [
          { name: "Postal Financial Handbook Volume I and II", link: null },
          { name: "General Financial Rules 2017 other than public procurement", link: null },
          { name: "Interface with India Post Payment Bank", link: null },
          { name: "Preservation and Disposal of Postal Records", link: null },
          { name: "Swatchh Bharat", link: null },
          { name: "Inspection Questionnaires", link: null, pdfs: [{ title: "Inspection Questionnaires", path: "/notes/paper-2/Inspection Questionnaires.pdf" }] },
          { name: "CSI Operating Manuals.", link: null }
        ]
      },
      {
        category: "GDS Rules",
        icon: <Briefcase className="w-5 h-5" />,
        items: [
          { name: "Gramin Dak Sevak (Conduct and Engagement) Rules, 2011.", link: null }
        ]
      },
      {
        category: "Law Paper",
        icon: <Briefcase className="w-5 h-5" />,
        items: [
          { name: "Central Administrative Tribunal Act, 1985 and its Rules", link: null },
          { name: "Right to Information Act 2005 and RTI Rules 2012", link: null },
          { name: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013", link: null },
          { name: "Public Accountants Default Act, 1850", link: null },
          { name: "Revenue Recovery Act, 1890", link: null },
          { name: "Prevention of Corruption Act, 1988 read with its (Amendment) Act, 2018", link: null },
          { name: "Goods and Services Tax (GST) Act, 2017", link: null }
        ]
      }
    ]
  }
};
