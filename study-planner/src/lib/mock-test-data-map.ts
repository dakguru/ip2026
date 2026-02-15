import { WEEKLY_MOCK_01_QUESTIONS } from "@/data/weekly_mock_data_01";
import { WEEKLY_MOCK_02_QUESTIONS } from "@/data/weekly_mock_data_02";
import { WEEKLY_MOCK_03_QUESTIONS } from "@/data/weekly_mock_data_03";
import { WEEKLY_MOCK_04_QUESTIONS } from "@/data/weekly_mock_data_04";
import { WEEKLY_MOCK_05_QUESTIONS } from "@/data/weekly_mock_data_05";
import { LIVE_MOCK_QUESTIONS } from "@/data/live_mock_data";

export const TEST_QUESTIONS_MAP: Record<string, any[]> = {
    "mock-2026-01-17": WEEKLY_MOCK_01_QUESTIONS,
    "mock-2026-01-24": WEEKLY_MOCK_02_QUESTIONS,
    "mock-2026-01-31": WEEKLY_MOCK_03_QUESTIONS,
    "mock-2026-02-07": WEEKLY_MOCK_04_QUESTIONS,
    "mock-2026-02-14": WEEKLY_MOCK_05_QUESTIONS,
    "live-sample": LIVE_MOCK_QUESTIONS
};
