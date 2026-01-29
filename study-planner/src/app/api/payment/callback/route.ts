
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log("Payment Callback Received");

        // Read the form data from Razorpay
        // Razorpay sends payment details as Form Data in POST
        const contentType = req.headers.get("content-type") || "";
        const data: Record<string, string> = {};

        if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            formData.forEach((value, key) => {
                data[key] = value.toString();
            });
        }

        // Get the redirect destination from query params
        const url = new URL(req.url);
        const destination = url.searchParams.get('to') || '/';

        // Construct the new URL with payment details
        // Ensure destination is relative or absolute to same origin
        const redirectUrl = new URL(destination, new URL(req.url).origin);

        // Append all payment details as query params
        Object.entries(data).forEach(([key, value]) => {
            redirectUrl.searchParams.append(key, value);
        });

        // Also append any extra query params passed to this route (like testId, planId)
        // url.searchParams contains 'to' and others.
        url.searchParams.forEach((value, key) => {
            if (key !== 'to') {
                redirectUrl.searchParams.append(key, value);
            }
        });

        console.log("Redirecting to:", redirectUrl.toString());

        // Redirect with 303 (See Other) to force GET
        return NextResponse.redirect(redirectUrl, 303);
    } catch (error) {
        console.error("Callback Error", error);
        return NextResponse.redirect(new URL('/', req.url));
    }
}
