"use client";

import { useEffect, useState, useRef } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

export default function BackButtonHandler() {
    // CRITICAL: Back button handling has been centralized in native android/app/src/main/java/com/studyplanner/app/MainActivity.java
    // consistently using OnBackPressedDispatcher.
    // This JS-side listener is disabled to prevent conflicts.
    return null;
}
