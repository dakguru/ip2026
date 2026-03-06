import { RawQuestion } from '../quizzes';

export const joining_time_set1: RawQuestion[] = [
    {
        q: "Under what condition is 'Joining Time' admissible to a Government servant?",
        o: ["On transfer in public interest", "On transfer at own request", "On first appointment", "On suspension"],
        a: 0,
        e: "Rule 4 states that joining time is granted to a Government servant on transfer in public interest to enable him to join the new post."
    },
    {
        q: "Is Joining Time admissible if a Government servant is transferred at his 'Own Request'?",
        o: ["Yes, full joining time", "No, unless the transfer is in public interest", "Only 5 days", "Only travel time"],
        a: 1,
        e: "Joining time is not admissible in cases of transfer at the employee's own request."
    },
    {
        q: "What is the entitlement for 'Joining Time' if the transfer does not involve a change of 'Residence'?",
        o: ["10 days", "5 days", "1 day (including holidays)", "Nil"],
        a: 2,
        e: "If the transfer is within the same station or doesn't involve a change of residence, only one day is allowed."
    },
    {
        q: "How much Joining Time is admissible if the distance between the old and new headquarters is '1,000 km or less'?",
        o: ["5 days", "10 days", "12 days", "15 days"],
        a: 1,
        e: "For a distance of up to 1,000 km, the joining time allowed is 10 days."
    },
    {
        q: "How much Joining Time is admissible if the distance is 'more than 1,000 km but less than 2,000 km'?",
        o: ["10 days", "12 days", "15 days", "20 days"],
        a: 1,
        e: "For distances between 1,001 km and 2,000 km, the joining time is 12 days."
    },
    {
        q: "What is the Joining Time entitlement if the distance is 'more than 2,000 km' (excluding air travel)?",
        o: ["12 days", "15 days", "20 days", "30 days"],
        a: 1,
        e: "For distances exceeding 2,000 km (where travel is not by air), the joining time is 15 days."
    },
    {
        q: "If the distance is more than 2,000 km but the Government servant travels by 'Air,' how much joining time is admissible?",
        o: ["10 days", "12 days", "15 days", "20 days"],
        a: 1,
        e: "If the distance is more than 2,000 km and travel is by air, only 12 days are allowed."
    },
    {
        q: "From which date does the Joining Time start?",
        o: [
            "From the date of the transfer order",
            "From the date of relinquishment of charge (if in the forenoon)",
            "From the date of arrival at the new station",
            "From the next Monday"
        ],
        a: 1,
        e: "Joining time commences from the date of relinquishment of charge of the old post if the charge is made over in the forenoon."
    },
    {
        q: "What is the rule regarding 'Holidays' during Joining Time?",
        o: [
            "Holidays are added at the end",
            "Sundays/Holidays are included in the joining time period",
            "Joining time only counts working days",
            "Holidays are ignored"
        ],
        a: 1,
        e: "Joining time is calculated as a continuous period and includes Sundays and holidays."
    },
    {
        q: "Can 'Joining Time' be combined with 'Earned Leave'?",
        o: [
            "No",
            "Yes, it can be combined with any regular leave except Casual Leave",
            "Only with HPL",
            "Only if the leave is more than 30 days"
        ],
        a: 1,
        e: "Joining time can be combined with any kind of regular leave (EL, HPL, etc.) but not with Casual Leave."
    },
    {
        q: "Who is the authority empowered to 'Extend' Joining Time?",
        o: ["Immediate supervisor", "Head of Department (HOD)", "Ministry concerned", "DDO"],
        a: 1,
        e: "The Head of Department (HOD) can extend joining time for valid reasons beyond the initial limits."
    },
    {
        q: "Is a Government servant entitled to 'Joining Time Pay'?",
        o: [
            "No pay is given",
            "He is entitled to pay as if he were on duty in the old post",
            "He is entitled to pay as if he were on duty in the new post",
            "Only 50% pay"
        ],
        a: 1,
        e: "During joining time, an employee is entitled to pay equal to what was drawn immediately before relinquishing the old post."
    },
    {
        q: "Are 'Allowances' (DA, HRA) admissible during Joining Time?",
        o: [
            "Only Basic Pay",
            "Yes, DA and HRA as applicable to the old station",
            "Yes, DA and HRA as applicable to the new station",
            "No allowances are paid"
        ],
        a: 1,
        e: "Joining Time Pay includes DA and HRA as applicable to the old station."
    },
    {
        q: "What happens to the 'Unutilized' portion of Joining Time?",
        o: [
            "It lapses",
            "It is credited to the 'Earned Leave' account",
            "It is paid as bonus",
            "It is carried to the next transfer"
        ],
        a: 1,
        e: "Unutilized joining time is credited to the employee's Earned Leave account, subject to certain limits."
    },
    {
        q: "What is the condition for crediting 'Unutilized Joining Time' to the EL account?",
        o: [
            "Only if the employee joins within 1 day",
            "Only if the HOD orders so",
            "Provided the total EL at credit does not exceed 300 days",
            "It is credited regardless of the 300-day limit"
        ],
        a: 2,
        e: "Unutilized joining time is added to EL, up to the maximum accumulation limit of 300 days."
    },
    {
        q: "If a Government servant is transferred while he is 'on Leave,' is joining time admissible?",
        o: ["No", "Yes, from the date his leave expires", "Yes, from the date he receives the order", "Only if he cancels his leave"],
        a: 1,
        e: "If an employee is transferred while on leave, joining time begins from the date the leave expires."
    },
    {
        q: "Is Joining Time admissible if a servant is 'Discharged' and then re-appointed?",
        o: ["No", "Yes, if re-appointment involves a change of station within 1 month", "Only for Group A", "Only for females"],
        a: 1,
        e: "Joining time is allowed for employees re-appointed to another station after discharge due to reduction in establishment."
    },
    {
        q: "What is the maximum 'extension' of Joining Time reachable by the HOD?",
        o: ["15 days", "25 days", "30 days", "60 days"],
        a: 2,
        e: "The Head of Department (HOD) can extend joining time up to a maximum of 30 days."
    },
    {
        q: "If an employee joins within '1 day' for a local transfer, does unutilized time get credited to EL?",
        o: ["Yes", "No credit to EL for local transfers (1-day limit)", "Employee gets 1 day pay extra", "Admissible for next week"],
        a: 1,
        e: "For transfers within the same station (local), joining time is 1 day and the unutilized credit rule does not apply."
    },
    {
        q: "For remote stations (Andaman/NE), how is 'extra' journey time treated?",
        o: ["As extra Joining Time", "As travel time in addition to joining time", "As regular leave", "As compensatory off"],
        a: 1,
        e: "Journey time for remote areas where travel is difficult may be sanctioned in addition to standard joining time."
    },
    {
        q: "Can 'Transfer TA' be claimed if joining time is not admissible?",
        o: ["Yes", "No", "Only for luggage", "Only for family"],
        a: 1,
        e: "Transfer TA is generally not admissible if joining time is not admissible (e.g. in own-request transfers)."
    },
    {
        q: "What is the joining time if distance is 2,500 km and air travel is involved?",
        o: ["12 days", "15 days", "20 days", "10 days"],
        a: 0,
        e: "For distances > 2,000 km involving air travel, joining time is restricted to 12 days."
    },
    {
        q: "What should an employee do if they fall ill during 'Joining Time'?",
        o: ["Join automatically later", "Apply for regular leave", "Join immediately", "Inform via local police"],
        a: 1,
        e: "If illness prevents joining, the employee should apply for regular leave as joining time is not automatically extended due to sickness."
    },
    {
        q: "Can 'Joining Time' be availed in two spells?",
        o: ["No", "Yes, with HOD permission (e.g. to move family later)", "Only for Level 11+", "Only if distance > 2000km"],
        a: 1,
        e: "HODs can allow joining time in two spells (joining post first and moving family/effects later)."
    },
    {
        q: "What is the rule for 'Joining Time Pay' on transfer from higher to lower post?",
        o: ["Higher pay of old post", "Lower pay of new post", "No pay", "Average pay"],
        a: 0,
        e: "The employee receives the higher pay of the old post while they are on joining time."
    }
];
