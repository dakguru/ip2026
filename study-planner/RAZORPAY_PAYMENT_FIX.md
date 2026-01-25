# Razorpay Payment Error Fix Guide

## Error Description
**Error Message:** "Payment Failed: Payment blocked as website does not match registered website(s)"

This error occurs when the domain making the payment request doesn't match the authorized domains registered in your Razorpay account.

## Root Cause
Razorpay has a security feature that validates the domain from which payment requests originate. If the domain is not whitelisted in your Razorpay Dashboard, payments will be blocked.

## Solution

### Step 1: Login to Razorpay Dashboard
1. Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Login with your credentials

### Step 2: Navigate to Website Settings
1. Click on **Settings** (gear icon) in the left sidebar
2. Go to **Configuration** → **Website and App Settings**
   - OR go to **Account & Settings** → **Website Details**

### Step 3: Add Authorized Domains
Add the following domains to the whitelist:

#### Production Domains:
- `dakguru.com`
- `www.dakguru.com`
- `https://dakguru.com`
- `https://www.dakguru.com`

#### Development/Testing Domains (if needed):
- `localhost`
- `http://localhost:3000`
- `127.0.0.1`

### Step 4: Save and Wait
1. Click **Save** or **Update**
2. Wait 2-5 minutes for changes to propagate across Razorpay's servers
3. Clear your browser cache

### Step 5: Test Payment
1. Try making a test payment
2. The error should now be resolved

## Additional Checks

### Verify Your Current Domain
To check what domain is being used:
1. Open browser developer console (F12)
2. Go to Console tab
3. Type: `window.location.origin`
4. This shows the domain that needs to be whitelisted

### Verify Razorpay Keys
Ensure you're using the correct Razorpay keys in `.env.local`:
```
RAZORPAY_KEY_ID=rzp_live_RrvQxxkmP5eDuA
RAZORPAY_KEY_SECRET=zlmOh3XKQFQxotgQAGDcEQ73
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RrvQxxkmP5eDuA
```

## Code Changes Made

We've also updated the payment integration code to include:
1. **callback_url**: Explicitly sets the return URL
2. **redirect**: Set to `false` to handle responses in the same page

### Files Updated:
- `src/app/pricing/page.tsx` - Line 197-198
- `src/app/mock-tests/page.tsx` - Line 231-232

## Common Issues

### Issue 1: Still Getting Error After Adding Domain
**Solution:** 
- Clear browser cache and cookies
- Wait 5-10 minutes for Razorpay to sync
- Try in incognito/private browsing mode

### Issue 2: Works on Desktop but Not on Mobile App
**Solution:**
- Add the app's package name/bundle ID in Razorpay settings
- For Android: Add package name (e.g., `com.dakguru.app`)
- For iOS: Add bundle ID

### Issue 3: Different Error Messages
If you see different errors like:
- "Invalid Key ID" → Check your API keys
- "Payment Failed" → Check Razorpay account status
- "Network Error" → Check internet connection

## Support Contacts

### For Users:
If payment issues persist, contact admin:
- **WhatsApp:** +91 936 30 30 396
- **Email:** noreply@dakguru.com

### For Developers:
- Check Razorpay Dashboard → Payments → Failed Payments for detailed error logs
- Review Razorpay documentation: https://razorpay.com/docs/

## Testing Checklist

- [ ] Domains added to Razorpay whitelist
- [ ] Changes saved in Razorpay Dashboard
- [ ] Waited 5 minutes for propagation
- [ ] Browser cache cleared
- [ ] Test payment attempted
- [ ] Error resolved

## 📱 Android App Specific Fix (CRITICAL)

Since the error screenshot shows the "App" selection option, and you are using a mobile app, you **MUST** configure the App section in Razorpay.

### Step 1: Add Android App in Razorpay
1. In Razorpay Dashboard → **Website and App Settings**
2. Click **+ Add additional website/app**
3. Select **"App"** (radio button)
4. Enter your Package Name: `com.studyplanner.app`
5. Click **Submit**

### Step 2: Add Backend Domain
Your app is currently configured to use `https://ip2026.vercel.app` (checked in `capacitor.config.ts`).
You must ALSO add this domain to the **Website** whitelist if it's not there.

**Add these to "Website" list:**
- `ip2026.vercel.app`
- `dakguru.com`

### Step 3: Long Term Fix (Recommended)
You should update your app to point to your main domain `dakguru.com` instead of the Vercel URL.
1. Edit `capacitor.config.ts`
2. Change:
   ```typescript
   server: {
     url: 'https://dakguru.com', // Change from ip2026.vercel.app
     androidScheme: 'https'
   }
   ```
3. Rebuild and update the app on Play Store.

## Testing Checklist

---

**Last Updated:** January 25, 2026
**Status:** Issue Identified and Resolution Steps Provided
