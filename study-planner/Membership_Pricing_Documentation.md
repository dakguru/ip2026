# Membership & Pricing System - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Membership Tiers](#membership-tiers)
3. [Features](#features)
4. [Architecture](#architecture)
5. [Data Structure](#data-structure)
6. [User Interface](#user-interface)
7. [Payment Integration](#payment-integration)
8. [Technical Implementation](#technical-implementation)
9. [User Guide](#user-guide)
10. [Developer Guide](#developer-guide)

---

## Overview

The Membership & Pricing System manages user subscriptions, payment processing, and feature access control for the Dak Guru study platform.

### Purpose
- **Primary Goal**: Monetize premium features while maintaining free access
- **Target Audience**: All users (free and paid)
- **Payment Methods**: UPI, Cards, Net Banking, Wallets

### Key Characteristics
- **Flexible Tiers**: Free, Paid, and Admin levels
- **Secure Payments**: Industry-standard payment gateway
- **Auto-Renewal**: Subscription management
- **Feature Gating**: Access control based on membership
- **Refund Support**: Money-back guarantee

---

## Membership Tiers

### 1. **Free Membership**

**Price**: ₹0 (Free Forever)

**Features**:
- ✅ Access to basic study materials
- ✅ Limited quiz attempts (5 per day)
- ✅ Flashcards (limited decks)
- ✅ Community access
- ✅ Basic progress tracking
- ❌ Mock tests
- ❌ Previous year questions
- ❌ Detailed analytics
- ❌ Download study materials
- ❌ Ad-free experience

**Best For**: Beginners exploring the platform

---

### 2. **Gold Membership** (Paid)

**Price**: 
- ₹499 for 3 months
- ₹899 for 6 months
- ₹1,499 for 12 months (Best Value - Save 25%)

**Features**:
- ✅ All Free features
- ✅ Unlimited quiz attempts
- ✅ All flashcard decks
- ✅ Full mock test access
- ✅ Previous year questions (all years)
- ✅ Detailed performance analytics
- ✅ Download study materials (PDFs)
- ✅ Ad-free experience
- ✅ Priority support
- ✅ Study planner with AI suggestions
- ✅ Personalized recommendations
- ✅ Certificate of completion
- ✅ Early access to new features

**Best For**: Serious exam candidates

**Badge**: 🏆 Gold Member

---

### 3. **Admin Access**

**Price**: Not for sale (Staff only)

**Features**:
- ✅ All Gold features
- ✅ Content management access
- ✅ User management
- ✅ Analytics dashboard
- ✅ Mock test creation
- ✅ Question bank management
- ✅ Announcement posting
- ✅ Support ticket management

**Best For**: Platform administrators

**Badge**: 👑 Admin

---

## Features

### Core Features

#### 1. **Pricing Page**
- Clear tier comparison
- Feature breakdown
- Pricing calculator
- FAQ section
- Testimonials

#### 2. **Payment Gateway**
- Multiple payment options
- Secure checkout
- Order confirmation
- Invoice generation
- Payment history

#### 3. **Subscription Management**
- View current plan
- Upgrade/downgrade options
- Auto-renewal toggle
- Cancellation process
- Renewal reminders

#### 4. **Access Control**
- Feature gating middleware
- Membership verification
- Expiry checking
- Grace period handling
- Upgrade prompts

#### 5. **Refund System**
- 7-day money-back guarantee
- Refund request form
- Status tracking
- Automated processing
- Refund policy display

---

## Architecture

### Technology Stack

```
Frontend: Next.js 14 (React 18)
Payment Gateway: Razorpay
Database: Supabase (PostgreSQL)
Email: Resend / SendGrid
State Management: React Context
```

### File Structure

```
src/
├── app/
│   ├── pricing/
│   │   └── page.tsx              # Pricing page
│   ├── membership/
│   │   └── page.tsx              # Membership dashboard
│   └── api/
│       ├── payment/
│       │   ├── create/
│       │   │   └── route.ts      # Create payment
│       │   └── verify/
│       │       └── route.ts      # Verify payment
│       └── subscription/
│           ├── upgrade/
│           │   └── route.ts      # Upgrade plan
│           └── cancel/
│               └── route.ts      # Cancel subscription
├── components/
│   ├── pricing/
│   │   ├── PricingCard.tsx       # Plan card
│   │   ├── FeatureComparison.tsx # Feature table
│   │   └── PaymentModal.tsx      # Checkout modal
│   └── membership/
│       ├── MembershipBadge.tsx   # Badge display
│       └── UpgradePrompt.tsx     # Upgrade CTA
├── lib/
│   ├── payment.ts               # Payment utilities
│   ├── subscription.ts          # Subscription logic
│   └── access-control.ts        # Feature gating
└── types/
    └── membership.ts            # TypeScript interfaces
```

---

## Data Structure

### Subscription Interface

```typescript
interface Subscription {
    id: string;
    userId: string;
    plan: 'free' | 'gold' | 'admin';
    status: 'active' | 'expired' | 'cancelled' | 'pending';
    startDate: Date;
    endDate?: Date;
    autoRenew: boolean;
    paymentMethod?: string;
    amount?: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}
```

### Payment Transaction

```typescript
interface PaymentTransaction {
    id: string;
    userId: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
    status: 'pending' | 'success' | 'failed' | 'refunded';
    gatewayOrderId: string;
    gatewayPaymentId?: string;
    gatewaySignature?: string;
    metadata?: Record<string, any>;
    createdAt: Date;
    completedAt?: Date;
}
```

### Pricing Plan

```typescript
interface PricingPlan {
    id: string;
    name: string;
    displayName: string;
    description: string;
    features: Feature[];
    pricing: {
        monthly?: number;
        quarterly?: number;
        halfYearly?: number;
        yearly?: number;
    };
    discount?: {
        percentage: number;
        validUntil?: Date;
    };
    isPopular: boolean;
    badge?: string;
}

interface Feature {
    name: string;
    description: string;
    included: boolean;
    limit?: number | 'unlimited';
}
```

---

## User Interface

### Pricing Page

```
┌─────────────────────────────────────┐
│  Choose Your Plan                   │
│  Start preparing smarter today!     │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │   FREE   │  │   GOLD   │        │
│  │          │  │ 🏆 POPULAR│        │
│  ├──────────┤  ├──────────┤        │
│  │   ₹0     │  │ ₹1,499   │        │
│  │ Forever  │  │ per year │        │
│  ├──────────┤  ├──────────┤        │
│  │ ✓ Basic  │  │ ✓ All    │        │
│  │   Quizzes│  │   Features│       │
│  │ ✓ Limited│  │ ✓ Unlimited│      │
│  │   Access │  │   Access  │       │
│  │ ✗ Mocks  │  │ ✓ Mock    │       │
│  │ ✗ PYQs   │  │   Tests   │       │
│  │          │  │ ✓ PYQs    │       │
│  │          │  │ ✓ Analytics│      │
│  │          │  │ ✓ Downloads│      │
│  │          │  │ ✓ Ad-free │       │
│  ├──────────┤  ├──────────┤        │
│  │[Current] │  │[Upgrade] │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  💡 Save 25% with yearly plan!     │
│                                     │
│  ✅ 7-day money-back guarantee      │
│  ✅ Secure payment gateway          │
│  ✅ Instant activation              │
└─────────────────────────────────────┘
```

### Payment Modal

```
┌─────────────────────────────────────┐
│  Complete Your Purchase             │
├─────────────────────────────────────┤
│                                     │
│  Plan: Gold Membership (1 Year)     │
│  Amount: ₹1,499                     │
│  Discount: -₹375 (25% off)          │
│  ─────────────────────────          │
│  Total: ₹1,124                      │
│                                     │
│  Payment Method:                    │
│  ○ UPI                              │
│  ○ Credit/Debit Card                │
│  ○ Net Banking                      │
│  ○ Wallets                          │
│                                     │
│  [Proceed to Pay]                   │
│                                     │
│  🔒 Secured by Razorpay             │
└─────────────────────────────────────┘
```

### Membership Dashboard

```
┌─────────────────────────────────────┐
│  Your Membership                    │
├─────────────────────────────────────┤
│                                     │
│  Current Plan: 🏆 Gold Member       │
│  Status: Active                     │
│  Valid Until: 24 Jan 2027           │
│  Auto-Renew: ☑ Enabled              │
│                                     │
│  Benefits:                          │
│  ✓ Unlimited quiz access            │
│  ✓ All mock tests                   │
│  ✓ Previous year questions          │
│  ✓ Detailed analytics               │
│  ✓ Download materials               │
│  ✓ Ad-free experience               │
│                                     │
│  [Manage Subscription]              │
│  [View Invoices]                    │
│  [Cancel Membership]                │
│                                     │
│  Payment History:                   │
│  • 24 Jan 2026 - ₹1,499 (Paid)     │
│  • 24 Jan 2025 - ₹1,499 (Paid)     │
│                                     │
└─────────────────────────────────────┘
```

---

## Payment Integration

### Razorpay Setup

```typescript
// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
});

// Create order
async function createPaymentOrder(
    amount: number,
    currency: string,
    userId: string
) {
    const order = await razorpay.orders.create({
        amount: amount * 100, // Convert to paise
        currency,
        receipt: `receipt_${userId}_${Date.now()}`,
        notes: {
            userId,
            plan: 'gold',
            duration: '1year'
        }
    });
    
    return order;
}
```

### Payment Verification

```typescript
async function verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string
) {
    const crypto = require('crypto');
    
    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
    
    return generatedSignature === signature;
}
```

### Payment Flow

```typescript
// Client-side payment initiation
async function initiatePayment(plan: string, duration: string) {
    // Create order on backend
    const response = await fetch('/api/payment/create', {
        method: 'POST',
        body: JSON.stringify({ plan, duration })
    });
    
    const { orderId, amount, currency } = await response.json();
    
    // Initialize Razorpay checkout
    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Dak Guru',
        description: `${plan} Membership - ${duration}`,
        order_id: orderId,
        handler: async function(response: any) {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/payment/verify', {
                method: 'POST',
                body: JSON.stringify({
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                })
            });
            
            if (verifyResponse.ok) {
                // Payment successful
                window.location.href = '/membership?success=true';
            }
        },
        prefill: {
            email: user.email,
            contact: user.phone
        },
        theme: {
            color: '#3B82F6'
        }
    };
    
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
}
```

---

## Technical Implementation

### Access Control Middleware

```typescript
// Check if user has access to feature
export function requireMembership(
    feature: string,
    requiredPlan: 'free' | 'gold' | 'admin' = 'gold'
) {
    return async function middleware(req: Request) {
        const user = await getCurrentUser(req);
        
        if (!user) {
            return Response.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }
        
        const subscription = await getActiveSubscription(user.id);
        
        if (!subscription || !hasAccess(subscription.plan, requiredPlan)) {
            return Response.json(
                { error: 'Upgrade required', feature, requiredPlan },
                { status: 403 }
            );
        }
        
        return null; // Access granted
    };
}

// Check access level
function hasAccess(userPlan: string, requiredPlan: string): boolean {
    const hierarchy = { free: 0, gold: 1, admin: 2 };
    return hierarchy[userPlan] >= hierarchy[requiredPlan];
}
```

### Subscription Management

```typescript
// Activate subscription
async function activateSubscription(
    userId: string,
    plan: string,
    duration: string,
    paymentId: string
) {
    const durationMonths = {
        '3months': 3,
        '6months': 6,
        '1year': 12
    }[duration];
    
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);
    
    const subscription = await supabase
        .from('subscriptions')
        .insert({
            userId,
            plan,
            status: 'active',
            startDate: new Date(),
            endDate,
            autoRenew: true,
            paymentMethod: 'razorpay'
        })
        .select()
        .single();
    
    // Update user profile
    await supabase
        .from('user_profiles')
        .update({
            membershipType: plan,
            membershipExpiry: endDate
        })
        .eq('id', userId);
    
    // Send confirmation email
    await sendSubscriptionEmail(userId, subscription.data);
    
    return subscription.data;
}

// Check and expire subscriptions
async function checkExpiredSubscriptions() {
    const { data: expired } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('status', 'active')
        .lt('endDate', new Date());
    
    for (const sub of expired || []) {
        if (sub.autoRenew) {
            // Attempt auto-renewal
            await attemptAutoRenewal(sub);
        } else {
            // Expire subscription
            await expireSubscription(sub.id);
        }
    }
}
```

---

## User Guide

### Upgrading to Gold

1. **Visit Pricing Page**
   - Click "Pricing" in menu
   - Review plan features
   - Select duration (3/6/12 months)

2. **Checkout Process**
   - Click "Upgrade to Gold"
   - Review order summary
   - Select payment method
   - Complete payment

3. **Confirmation**
   - Receive email confirmation
   - Access unlocked immediately
   - Download invoice

### Managing Subscription

1. **View Current Plan**
   - Go to Membership page
   - Check status and expiry
   - View payment history

2. **Enable/Disable Auto-Renewal**
   - Toggle auto-renew switch
   - Confirm change
   - Receive confirmation

3. **Cancel Subscription**
   - Click "Cancel Membership"
   - Provide feedback (optional)
   - Confirm cancellation
   - Access continues until expiry

### Requesting Refund

1. **Eligibility Check**
   - Within 7 days of purchase
   - Minimal usage (< 10% content accessed)

2. **Submit Request**
   - Go to Membership page
   - Click "Request Refund"
   - Provide reason
   - Submit request

3. **Processing**
   - Review within 2-3 business days
   - Refund to original payment method
   - 5-7 business days for credit

---

## Best Practices

### For Users
1. Choose annual plan for best value
2. Enable auto-renewal to avoid interruption
3. Download invoices for records
4. Review refund policy before purchase
5. Contact support for payment issues

### For Developers
1. Never store payment credentials
2. Implement proper error handling
3. Log all transactions
4. Test payment flows thoroughly
5. Comply with PCI DSS standards

---

## Future Enhancements

1. **Lifetime Membership**: One-time payment option
2. **Student Discounts**: Verified student pricing
3. **Group Plans**: Team subscriptions
4. **Gift Memberships**: Purchase for others
5. **Loyalty Rewards**: Points for renewals
6. **Referral Program**: Earn credits

---

**Document Version**: 1.0  
**Last Updated**: January 24, 2026  
**Maintained By**: Dak Guru Development Team
