import type { Metadata } from "next";
import CutoffPredictionClient from "./CutoffPredictionClient";

export const metadata: Metadata = {
    title: "LDCE IP 2026 Cut-Off Prediction | Dak Guru",
    description: "Enter your LDCE IP 2026 Paper I, Paper II and Paper III marks, see the all-India leaderboard and the crowd-sourced indicative cut-off. No login required.",
    openGraph: {
        title: "LDCE IP 2026 Cut-Off Prediction | Dak Guru",
        description: "Verified with the official Provisional Answer Keys — enter your marks and see where you stand among candidates across India.",
        url: "https://dakguru.com/cutoff-prediction",
        siteName: "Dak Guru",
        type: "website",
    },
};

export default function CutoffPredictionPage() {
    return <CutoffPredictionClient />;
}
