"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CourseMode = "LDCE_IP" | "PS_GR_B";

interface CourseContextType {
    course: CourseMode;
    setCourse: (mode: CourseMode) => void;
}

const CourseContext = createContext<CourseContextType>({
    course: "LDCE_IP",
    setCourse: () => { },
});

export function CourseProvider({ children }: { children: ReactNode }) {
    const [course, setCourseState] = useState<CourseMode>("LDCE_IP");

    useEffect(() => {
        const syncCourse = async () => {
            if (typeof window === "undefined") return;

            // 1. Load initial state from LocalStorage
            const savedCourse = localStorage.getItem("selectedCourseMode") as CourseMode;
            if (savedCourse === "LDCE_IP" || savedCourse === "PS_GR_B") {
                setCourseState(savedCourse);
            }

            // 2. Sync with Backend
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        const dbMode = data.user.courseMode;
                        const currentLocal = localStorage.getItem("selectedCourseMode");

                        if (dbMode && dbMode !== currentLocal) {
                            // DB is the source of truth for synced accounts
                            setCourseState(dbMode as CourseMode);
                            localStorage.setItem("selectedCourseMode", dbMode);
                        } else if (!dbMode && currentLocal) {
                            // One-time migration: Push local state to DB if DB is empty
                            await fetch("/api/user/update", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    currentEmail: data.user.email,
                                    courseMode: currentLocal
                                }),
                            });
                        }
                    }
                }
            } catch (err) {
                // Silently fail, stick with local state
            }
        };

        syncCourse();
    }, []);

    const setCourse = (mode: CourseMode) => {
        setCourseState(mode);
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedCourseMode", mode);
        }
    };

    return (
        <CourseContext.Provider value={{ course, setCourse }}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourse() {
    return useContext(CourseContext);
}
