
# How to Get Cloudflare Turnstile Keys

You are currently on the "Domains" page, but we need to go to the **Turnstile** section. Follow these exact steps:

### Step 1: Go to Turnstile
1.  On the left sidebar of your Cloudflare dashboard, look for **"Turnstile"**. 
    *   *Note: If you don't see it, it might be under a "Security" or "Captcha" menu, but usually, it's a top-level item or you can find it by searching "Turnstile" in the search bar at the very top left.*
    *   **Direct Link:** [https://dash.cloudflare.com/?to=/:account/turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) (Click this if you are logged in).

### Step 2: Add a Widget
1.  Click the blue **"Add widget"** button (or "Add Site").
2.  **Site Name:** Enter `Dak Guru` (or any name you want).
3.  **Domain:**
    *   Enter `localhost` (for testing on your computer).
    *   Click "Add Hostname" and enter your real website domain (e.g., `dakguru.com`).
    *   *Tip: You can add both so it works everywhere.*
4.  **Widget Mode:** Select **"Managed"** (Recommended). This is the best option as it decides when to run checks automatically.
5.  Click **"Create"**.

### Step 3: Get Your Keys
1.  On the next screen, you will see two keys:
    *   **Site Key** (Public)
    *   **Secret Key** (Private)
2.  Keep this tab open.

### Step 4: Add Keys to Your Project
1.  Open your project in VS Code.
2.  Open the file named `.env.local` (it should be in the root folder, `c:\Users\arun1\OneDrive\Desktop\IP 2026\study-planner\.env.local`).
3.  Paste the keys at the bottom of the file like this:

```env
# ... existing code ...

NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_from_cloudflare
TURNSTILE_SECRET_KEY=your_secret_key_from_cloudflare
```
*(Replace `your_...` with the actual codes you copied).*

### Step 5: Restart Server
1.  Stop your current server (Ctrl+C in the terminal).
2.  Run `npm run dev` again.
3.  Go to your signup page. You should now see the "Verify you are human" box!
