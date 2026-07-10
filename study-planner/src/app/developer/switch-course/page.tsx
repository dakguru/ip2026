import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth-utils";
import CourseSwitchClient from "./CourseSwitchClient";

export default async function SwitchCoursePage() {
    if (!(await isAdmin())) {
        redirect("/");
    }

    return <CourseSwitchClient />;
}
