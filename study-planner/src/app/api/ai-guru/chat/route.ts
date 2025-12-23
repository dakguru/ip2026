import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AI_GURU_SYSTEM_PROMPT } from "@/lib/ai-prompt";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured in the server." },
                { status: 500 }
            );
        }

        const { message, history } = await req.json();
        const genAI = new GoogleGenerativeAI(apiKey);

        // Helper to run chat with specific model config
        const runChat = async (modelName: string, useSystemInstruction: boolean) => {
            const config: any = { model: modelName };
            if (useSystemInstruction) {
                config.systemInstruction = AI_GURU_SYSTEM_PROMPT;
            }

            const model = genAI.getGenerativeModel(config);

            let chatHistory = history.map((msg: any) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

            // If not using system instruction (fallback models), prepend it to context
            if (!useSystemInstruction) {
                const systemMsg = {
                    role: 'user',
                    parts: [{ text: "System Instructions: " + AI_GURU_SYSTEM_PROMPT + "\n\nUser Question: " + (chatHistory[0]?.parts[0]?.text || "") }]
                };
                // Replace first message or prepend
                if (chatHistory.length > 0) {
                    chatHistory[0] = systemMsg;
                } else {
                    chatHistory = [systemMsg];
                }
            }

            const chat = model.startChat({
                history: chatHistory,
                generationConfig: { maxOutputTokens: 1000 },
            });

            const result = await chat.sendMessage(message);
            return result.response.text();
        };

        try {
            // Attempt 1: Gemini 1.5 Flash (Best Balance)
            const text = await runChat("gemini-1.5-flash", true);
            return NextResponse.json({ reply: text });
        } catch (flashError: any) {
            console.warn("Gemini 1.5 Flash failed, trying fallback:", flashError.message);

            try {
                // Attempt 2: Gemini Pro (Legacy Stable)
                // Note: gemini-pro often needs system prompt in the message, not config
                const text = await runChat("gemini-pro", false);
                return NextResponse.json({ reply: text });
            } catch (proError: any) {
                console.error("All Gemini models failed:", proError);
                throw proError; // Throw to outer catch to return error JSON
            }
        }

    } catch (error: any) {
        console.error("AI Guru Final Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process your request." },
            { status: 500 }
        );
    }
}
