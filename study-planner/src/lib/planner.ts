import { addDays, format, isBefore, isSameMonth, getDay, getDate } from 'date-fns';
import { SYLLABUS_DATA } from '../data/syllabus';
import { PlanItem } from './types';

export function generateStudyPlan(): PlanItem[] {
    const startDate = new Date(2026, 0, 1); // Jan 1, 2026
    const endDate = new Date(2026, 7, 31); // Aug 31, 2026

    const plan: PlanItem[] = [];

    const heavyTopics = SYLLABUS_DATA.filter(t => t.type === 'heavy');
    const lightTopics = SYLLABUS_DATA.filter(t => t.type === 'light');

    // Trackers for multi-day topics
    let heavyState = { index: 0, dayProgress: 1 };
    let lightState = { index: 0, dayProgress: 1 };

    let saturdayNonMockCount = 0;
    let currentDate = startDate;

    const isLastSaturdayOfMonth = (date: Date) => {
        if (getDay(date) !== 6) return false;
        const nextWeek = addDays(date, 7);
        return !isSameMonth(date, nextWeek);
    };

    while (isBefore(currentDate, endDate) || currentDate.getTime() === endDate.getTime()) {
        const dayOfWeek = getDay(currentDate);
        const dateString = format(currentDate, 'yyyy-MM-dd');
        const dayOfMonth = getDate(currentDate);

        let item: PlanItem = {
            date: dateString,
            title: '',
            type: 'light'
        };

        if (dayOfWeek === 0) {
            item.title = 'Revision Day';
            item.type = 'revision';
            item.category = 'Other';
        }
        else if (dayOfWeek === 6) {
            if (isLastSaturdayOfMonth(currentDate)) {
                item.title = 'Full Mock Test (Paper I, II & III)';
                item.type = 'mock';
                item.category = 'Other';
            } else {
                saturdayNonMockCount++;
                if (saturdayNonMockCount % 2 !== 0) {
                    item.title = 'Drafting & Noting Practice';
                    item.type = 'practice';
                    item.category = 'Paper II';
                } else {
                    // Heavy Topic Logic
                    const topic = heavyTopics[heavyState.index % heavyTopics.length];
                    const totalDays = topic.duration || 1;

                    item.title = `${topic.category}: ${topic.title} ${totalDays > 1 ? `(Day ${heavyState.dayProgress}/${totalDays})` : ''}`;
                    item.type = 'heavy';
                    item.topicId = topic.id;
                    item.tips = topic.tips;
                    item.category = topic.category;

                    // Advance Logic
                    if (heavyState.dayProgress >= totalDays) {
                        heavyState.index++;
                        heavyState.dayProgress = 1;
                    } else {
                        heavyState.dayProgress++;
                    }
                }
            }
        }
        else {
            // Weekdays
            const isFirstWednesday = dayOfWeek === 3 && dayOfMonth <= 7;

            if (isFirstWednesday) {
                item.title = 'Charge Sheet Drafting Practice';
                item.type = 'practice';
                item.category = 'Paper II';
                item.tips = ['Review format of Charge Sheet (Standard Form).', 'Focus on Article of Charges and Imputation of Misconduct.', 'Draft a mock charge sheet for "Unauthorized Absence".'];
            } else {
                // Light Topic Logic
                const topic = lightTopics[lightState.index % lightTopics.length];
                const totalDays = topic.duration || 1;

                item.title = `${topic.category}: ${topic.title} ${totalDays > 1 ? `(Day ${lightState.dayProgress}/${totalDays})` : ''}`;
                item.type = 'light';
                item.topicId = topic.id;
                item.tips = topic.tips;
                item.category = topic.category;

                if (lightState.dayProgress >= totalDays) {
                    lightState.index++;
                    lightState.dayProgress = 1;
                } else {
                    lightState.dayProgress++;
                }
            }
        }

        plan.push(item);
        currentDate = addDays(currentDate, 1);
    }

    return plan;
}
