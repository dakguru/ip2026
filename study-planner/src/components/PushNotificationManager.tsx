"use client";

import { useEffect } from 'react';
import { PushNotifications, ActionPerformed, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Toast } from '@capacitor/toast';

export default function PushNotificationManager() {
    useEffect(() => {
        if (!Capacitor.isNativePlatform()) {
            return;
        }

        const setupPushNotifications = async () => {
            try {
                // 1. Check Permissions
                let permStatus = await PushNotifications.checkPermissions();

                if (permStatus.receive === 'prompt') {
                    permStatus = await PushNotifications.requestPermissions();
                }

                if (permStatus.receive !== 'granted') {
                    console.warn("Push notification permission denied");
                    return;
                }

                // 2. Register
                await PushNotifications.register();

                // 3. Listeners

                // On Registration Success
                PushNotifications.addListener('registration', (token: Token) => {
                    console.log('Push Registration Token: ', token.value);
                    // TODO: Send this token to your backend API to save it for the user
                    // saveTokenToBackend(token.value);
                });

                // On Registration Error
                PushNotifications.addListener('registrationError', (error: any) => {
                    console.error('Push Registration Error: ', error);
                });

                // On Notification Received (Foreground)
                PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
                    console.log('Push Received: ', notification);
                    Toast.show({
                        text: notification.title || "New Notification",
                        duration: 'long'
                    });
                });

                // On Notification Tapped
                PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
                    console.log('Push Action Performed: ', notification);
                    const data = notification.notification.data;
                    if (data && data.url) {
                        window.location.href = data.url;
                    }
                });

            } catch (e) {
                console.error("Failed to setup push notifications", e);
            }
        };

        setupPushNotifications();

        // Cleanup
        return () => {
            if (Capacitor.isNativePlatform()) {
                PushNotifications.removeAllListeners();
            }
        };
    }, []);

    return null;
}
