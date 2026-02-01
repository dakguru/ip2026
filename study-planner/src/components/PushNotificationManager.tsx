"use client";

import { useEffect, useState } from 'react';
import { PushNotifications, ActionPerformed, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Toast } from '@capacitor/toast';
import { Bell } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

export default function PushNotificationManager() {
    const [showPermissionDialog, setShowPermissionDialog] = useState(false);

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) {
            return;
        }

        const initializePush = async () => {
            try {
                // 1. Check if we already asked the user before (Education Dialog)
                const hasAsked = localStorage.getItem('notification_permission_asked') === 'true';

                // 2. Check current system permission status
                const permStatus = await PushNotifications.checkPermissions();

                // If Android 13+ (or system requires prompt) AND we haven't asked yet -> Show Education Dialog
                if (permStatus.receive === 'prompt' && !hasAsked) {
                    setShowPermissionDialog(true);
                }
                // If already granted, ensure we are registered
                else if (permStatus.receive === 'granted') {
                    registerPush();
                }

            } catch (e) {
                console.error("Push Check Failed", e);
            }
        };

        // Setup Listeners (Idempotent)
        const setupListeners = async () => {
            await PushNotifications.removeAllListeners();

            PushNotifications.addListener('registration', (token: Token) => {
                console.log('Push Registration Token: ', token.value);
                // TODO: Sync with backend
            });

            PushNotifications.addListener('registrationError', (error: any) => {
                console.error('Push Registration Error: ', error);
            });

            PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
                Toast.show({
                    text: notification.title || "New Notification",
                    duration: 'long'
                });
            });

            PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
                const data = notification.notification.data;
                if (data && data.url) {
                    window.location.href = data.url;
                }
            });
        };

        setupListeners();
        initializePush();

        return () => {
            if (Capacitor.isNativePlatform()) {
                PushNotifications.removeAllListeners();
            }
        };
    }, []);

    const registerPush = async () => {
        try {
            await PushNotifications.register();
        } catch (e) {
            console.error("Registration failed", e);
        }
    };

    const handleAllow = async () => {
        setShowPermissionDialog(false);
        localStorage.setItem('notification_permission_asked', 'true');

        try {
            // Trigger System Permission Dialog
            const req = await PushNotifications.requestPermissions();
            if (req.receive === 'granted') {
                registerPush();
            } else {
                // Optionally handle denial (show toast or settings prompt), but spec says just be silent/clean
            }
        } catch (e) {
            console.error("Permission request failed", e);
        }
    };

    const handleNotNow = () => {
        // Triggers handleOpenChange(false) effectively
        setShowPermissionDialog(false);
    };

    const handleOpenChange = (open: boolean) => {
        setShowPermissionDialog(open);
        if (!open) {
            // If dialog is closed (by X, Escape, or Button), store that we asked.
            // This prevents the dialog from appearing again on next launch implicitly.
            localStorage.setItem('notification_permission_asked', 'true');
        }
    };

    if (!showPermissionDialog) return null;

    return (
        <Dialog open={showPermissionDialog} onOpenChange={handleOpenChange}>
            <DialogContent
                className="sm:max-w-md w-[85%] rounded-2xl"
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <DialogHeader className="flex flex-col items-center gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mb-2">
                        <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <DialogTitle className="text-center text-xl font-bold">Enable Notifications</DialogTitle>
                    <DialogDescription className="text-center text-[15px] leading-relaxed">
                        Stay updated with important alerts, study reminders, and exam announcements.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-6 w-full">
                    <button
                        onClick={handleAllow}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-xl transition-all shadow-sm"
                    >
                        Allow
                    </button>
                    <button
                        onClick={handleNotNow}
                        className="w-full py-3.5 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 font-medium rounded-xl transition-colors"
                    >
                        Not Now
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
