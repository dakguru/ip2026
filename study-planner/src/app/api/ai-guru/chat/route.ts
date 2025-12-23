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
        // Initialize with gemini-1.5-pro (more stable/widely available than flash sometimes)
        // If this fails, we might need to fallback to gemini-pro (1.0) but that doesn't support systemInstruction.
        // For now, let's try gemini-1.5-pro.
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: AI_GURU_SYSTEM_PROMPT
        });

        // Convert frontend history format to Gemini format if needed, 
        // or just use the last message + context if history is complex.
        // Gemini 'chat' format: parts: [{text: "..."}], role: "user" | "model"

        const chatHistory = history.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

    } catch (error: any) {
        console.error("AI Guru Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process your request." },
            { status: 500 }
        );
    }
}
