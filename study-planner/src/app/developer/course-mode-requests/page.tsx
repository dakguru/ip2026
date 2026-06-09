import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth-utils";
import CourseModeRequestsClient from "./CourseModeRequestsClient";

/**
 * Admin-only "Course Mode Requests" dashboard.
 *
 * Backend route protection: this server component verifies the admin /
 * super_admin role via the server-side session (`isAdmin()`) before rendering.
 * A non-admin or logged-out user who navigates here is redirected to Home and
 * never receives the page payload. The list/review APIs enforce the same check.
 */
export default async function CourseModeRequestsPage() {
    if (!(await isAdmin())) {
        redirect("/");
    }

    return <CourseModeRequestsClient />;
}
