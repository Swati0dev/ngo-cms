import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  // Build-phase bypass for Next.js 16 static analyzer
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true });
  }

  try {
    const { amount, currency = "INR" } = await request.json();

    if (!amount) {
      return NextResponse.json({ success: false, error: "Amount is required" }, { status: 400 });
    }

    const options = {
      amount: amount * 100, 
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ success: false, error: "Failed to create payment order" }, { status: 500 });
  }
}
