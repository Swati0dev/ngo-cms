import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  // Build-phase bypass for Next.js 16 static analyzer
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isGenuine = expectedSignature === razorpay_signature;

    if (isGenuine) {
      return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json({ success: false, error: "Internal verification failure" }, { status: 500 });
  }
}
