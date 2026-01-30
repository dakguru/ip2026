# Push Notifications Setup Guide for Dak Guru

This guide helps you set up Push Notifications for the Dak Guru Android application using Firebase Cloud Messaging (FCM).

## 1. Firebase Console Setup

You must create a Firebase project to enable push notifications.

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Click **Add project** and name it `Dak Guru` (or similar).
3.  Disable Google Analytics (optional, for simplicity) and click **Create Project**.
4.  Once created, click the **Android** icon to add an Android app.
5.  **Register App**:
    *   **Android package name**: `com.studyplanner.app` (THIS MUST MATCH EXACTLY)
    *   **App nickname**: Dak Guru App
    *   Click **Register app**.
6.  **Download Config File**:
    *   Download `google-services.json`.
    *   **IMPORTANT**: Move this file into the `android/app/` directory of your project (where `build.gradle` is located).
7.  Click **Next** through the remaining steps (SDK instructions are already handled by Capacitor).

## 2. Verify Project Configuration

The codebase has already been updated to support Push Notifications.

*   `android/build.gradle`: Checks for Google Services.
*   `android/app/build.gradle`: Applies the Google Services plugin if the JSON file is present.
*   `src/components/PushNotificationManager.tsx`: A new component has been created to handle permissions and listeners.
*   `package.json`: `@capacitor/push-notifications` has been installed.

## 3. Build and Test

1.  **Ensure `google-services.json` is in `android/app/`.**
2.  Rebuild the app in Android Studio:
    ```bash
    npx cap open android
    ```
    (Or open Android Studio manually).
3.  Run the app on a physical device or emulator (with Google Play Services).
4.  **Permissions**: On launch, the app should ask for Notification Permissions. Allow them.
5.  **Registration**: Check the "Logcat" in Android Studio filter for "Push Registration Token". You should see a long token string.

## 4. Sending a Test Notification

1.  Go back to **Firebase Console** -> **Engage** -> **Messaging**.
2.  Click **Create your first campaign**.
3.  Select **Firebase Notification messages**.
4.  Enter Title and Text (e.g., "Hello from Dak Guru").
5.  Click **Send Test Message**.
6.  Paste the **FCM Token** copied from the Logcat in Step 3.5.
7.  Click **Test**.

You should receive the notification on your device!

## 5. Troubleshooting

*   **"google-services.json not found"**: Double-check that the file is exactly at `android/app/google-services.json`.
*   **Compilation Errors**: Try running `Build` -> `Clean Project` and `Rebuild Project` in Android Studio.
*   **Notifications not received**:
    *   Ensure the app is in the background (or foreground triggers the Toast message we implemented).
    *   Ensure the emulator has Google Play Services installed.

