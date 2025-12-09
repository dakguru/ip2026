# How to Turn Your Next.js Website into a Mobile App

You have two main options to "host" your website as a mobile application:

## Option 1: Progressive Web App (PWA) - Recommended First Step
This turns your website into an installable app.
*   **Pros**: Easiest to setup, users can "Install to Home Screen", works offline, no App Store approval needed, works on Android & iOS.
*   **Cons**: Not listed in the Google Play Store or Apple App Store.

### Steps to Implement PWA:
1.  Install `next-pwa` package.
2.  Create a `manifest.json` file in `public/` with your app details (name, icons, theme color).
3.  Update `next.config.ts` to use the PWA plugin.
4.  Add a generic `<meta>` viewport tag if missing.

## Option 2: Capacitor (For Play Store / App Store)
This wraps your existing web website codebase into a native Android/iOS container.
*   **Pros**: You can publish to Google Play Store and Apple App Store, access native device features (camera, push notifications, etc.).
*   **Cons**: Requires Android Studio (for Android) and Xcode (for iOS/Mac specifically), more complex build process.

### Steps to Implement Capacitor:
1.  **Initialize Capacitor**:
    ```bash
    npm install @capacitor/core @capacitor/cli
    npx cap init
    ```
2.  **Install Platforms**:
    ```bash
    npm install @capacitor/android @capacitor/ios
    npx cap add android
    npx cap add ios
    ```
3.  **Build Your Next.js App**:
    You need to generate a static export or configuring it so Capacitor can read the output.
    Update `next.config.ts` to set `output: 'export'`.
    ```bash
    npm run build
    ```
4.  **Sync and Run**:
    ```bash
    npx cap sync
    npx cap open android
    ```

---

## Guide: Implementing PWA (Option 1)

Since you already have the codebase, we can set up the PWA support immediately.

### 1. Install Dependency
```bash
npm install next-pwa
```

### 2. Create `public/manifest.json`
Create a file named `manifest.json` in your `public` folder:
```json
{
  "name": "LDCE Study Planner",
  "short_name": "StudyPlanner",
  "description": "Prepare for Inspector Posts Exam 2026",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/logo.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/logo.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 3. Update `next.config.ts`
Wrap your config with `next-pwa`.

### 4. Verify
Run `npm run build` and `npm start`. Open in browser (Chrome dev tools -> Application tab -> Manifest) to verify.
