import { Metadata } from "next";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongoose";
import DakSutra from "@/models/DakSutra";
import DakSutraDetailClient from "./DakSutraDetailClient";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const baseUrl = "https://www.dakguru.com";

    try {
        await dbConnect();
        const entry = await DakSutra.findById(id)
            .select("title act_name rule_number category exam_tags status")
            .lean() as any;

        if (!entry || entry.status !== "published") {
            return {
                title: "Dak Sutra | Dak Guru",
                description: "Postal rules and regulations simplified for LDCE & PS Group B aspirants.",
            };
        }

        const title = `Dak Guru : ${entry.title}`;
        const description = [
            entry.act_name,
            entry.rule_number ? entry.rule_number : null,
            "— Simplified for LDCE & PS Group B exam preparation.",
        ]
            .filter(Boolean)
            .join(" ");
        const url = `${baseUrl}/dak-sutra/${id}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url,
                siteName: "Dak Guru",
                type: "article",
                images: [
                    {
                        url: `${baseUrl}/dak-guru-new-logo.png`,
                        width: 512,
                        height: 512,
                        alt: "Dak Guru",
                    },
                ],
            },
            twitter: {
                card: "summary",
                title,
                description,
                images: [`${baseUrl}/dak-guru-new-logo.png`],
            },
        };
    } catch {
        return {
            title: "Dak Sutra | Dak Guru",
            description: "Postal rules and regulations simplified for LDCE & PS Group B aspirants.",
        };
    }
}

export default async function DakSutraDetailPage({ params }: Props) {
    const { id } = await params;
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token");
    const userSession = cookieStore.get("user_session");

    let membershipLevel = "free";
    const isLoggedIn = !!authToken;

    if (isLoggedIn && userSession?.value) {
        try {
            const sessionData = JSON.parse(userSession.value);
            if (sessionData && sessionData.membershipLevel) {
                membershipLevel = sessionData.membershipLevel;
            }
        } catch (e) {
            console.error("Failed to parse user session", e);
        }
    }

    return (
        <DakSutraDetailClient 
            id={id} 
            isLoggedIn={isLoggedIn} 
            membershipLevel={membershipLevel} 
        />
    );
}
