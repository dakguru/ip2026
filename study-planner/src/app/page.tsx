import { cookies } from "next/headers";
import HomeManager from "@/components/HomeManager";

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const userSession = cookieStore.get("user_session");

  let displayName = "Aspirant";
  let membershipLevel = "free";
  let role = "user";
  const isLoggedIn = !!authToken;

  if (isLoggedIn && userSession?.value) {
    try {
      const sessionData = JSON.parse(userSession.value);
      if (sessionData) {
        // PERF: Use session data directly to avoid blocking DB call (improves TTFB significantly)
        // The actual access control is handled on individual protected pages/middleware.
        displayName = sessionData.name || "Aspirant";
        membershipLevel = sessionData.membershipLevel || "free";
        role = sessionData.role || "user";
      }
    } catch (e) {
      console.error("Failed to parse user session", e);
    }
  }

  return (
    <HomeManager
      displayName={displayName}
      membershipLevel={membershipLevel}
      role={role}
      isLoggedIn={isLoggedIn}
    />
  );
}
