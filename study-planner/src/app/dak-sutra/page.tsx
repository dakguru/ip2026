import { cookies } from "next/headers";
import DakSutraClient from "./DakSutraClient";

export default async function DakSutraPage() {
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
        <DakSutraClient 
            isLoggedIn={isLoggedIn} 
            membershipLevel={membershipLevel} 
        />
    );
}
