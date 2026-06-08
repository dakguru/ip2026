import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth-utils";
import QuestionPaperPDFClient from "./QuestionPaperPDFClient";

/**
 * Admin-only "Question Paper PDF" page.
 *
 * Backend route protection: this server component verifies the admin role via
 * the server-side session (`isAdmin()`) BEFORE rendering anything. A non-admin
 * or logged-out user who manually navigates here is redirected straight to Home
 * and never receives the page payload. The data API and the page both enforce
 * the admin check, so access is never gated on the hidden Home card alone.
 */
export default async function QuestionPaperPDFPage() {
    if (!(await isAdmin())) {
        redirect("/");
    }

    return <QuestionPaperPDFClient />;
}
