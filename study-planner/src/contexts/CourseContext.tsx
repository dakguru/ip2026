"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
    const [course, setCourse] = useState<CourseMode>("LDCE_IP");

    return (
        <CourseContext.Provider value={{ course, setCourse }}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourse() {
    return useContext(CourseContext);
}
