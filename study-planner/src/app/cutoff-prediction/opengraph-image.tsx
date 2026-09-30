import { ImageResponse } from "next/og";

export const alt = "LDCE IP 2026 Cut-Off Prediction — Dak Guru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview card shown when the page is shared on WhatsApp, Telegram, etc.
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "70px 80px", color: "white", fontFamily: "sans-serif",
                    backgroundColor: "#0b0820",
                    backgroundImage: "radial-gradient(circle at 15% 20%, rgba(217,70,239,0.45), transparent 45%), radial-gradient(circle at 85% 80%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 70% 10%, rgba(251,191,36,0.3), transparent 40%)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ display: "flex", padding: "8px 20px", borderRadius: 999, background: "rgba(52,211,153,0.18)", border: "2px solid rgba(110,231,183,0.5)", color: "#6ee7b7", fontSize: 24, fontWeight: 800, letterSpacing: 4 }}>
                        <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#34d399", marginRight: 14, marginTop: 7 }} />
                        LIVE · ANSWER KEYS OUT
                    </div>
                </div>
                <div style={{ display: "flex", fontSize: 92, fontWeight: 900, marginTop: 34, lineHeight: 1, backgroundImage: "linear-gradient(90deg, #fde68a, #f5d0fe, #a5f3fc)", backgroundClip: "text", color: "transparent" }}>
                    LDCE IP 2026
                </div>
                <div style={{ display: "flex", fontSize: 92, fontWeight: 900, marginTop: 8, lineHeight: 1 }}>Cut-Off Prediction</div>
                <div style={{ display: "flex", fontSize: 34, marginTop: 34, color: "rgba(224,231,255,0.8)" }}>
                    Enter your marks · See your All-India rank · No login
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: 50, fontSize: 30, fontWeight: 800 }}>
                    <div style={{ display: "flex", padding: "14px 30px", borderRadius: 999, background: "white", color: "#1a1040" }}>dakguru.com/cutoff-prediction</div>
                    <div style={{ display: "flex", marginLeft: 24, color: "rgba(255,255,255,0.6)" }}>Dak Guru</div>
                </div>
            </div>
        ),
        size,
    );
}
