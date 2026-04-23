"use client";

import { useState } from "react";
import Script from "next/script";
import { Heart, ShieldCheck, ArrowRight } from "lucide-react";

export default function DonationPage() {
  const [amount, setAmount] = useState("500");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadRazorpay = async (amount) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Create order on server
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseInt(amount) }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_your_key_id", // Should be public key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "NGO Organization",
        description: "Donation for Mission",
        order_id: data.order.id,
        handler: async function (response) {
          // 3. Verify payment on server
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setMessage({ type: "success", text: "Thank you! Your donation was successful." });
          } else {
            setMessage({ type: "error", text: "Payment verification failed. Please contact us." });
          }
        },
        prefill: {
          name: "Anonymous Donor",
          email: "donor@example.com",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "4rem 1rem" }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div style={{ maxWidth: "500px", margin: "0 auto", backgroundColor: "white", padding: "3rem", borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", padding: "1rem", backgroundColor: "#fff1f2", borderRadius: "50%", color: "#e11d48", marginBottom: "1rem" }}>
            <Heart size={40} fill="#e11d48" />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0f172a" }}>Make a Difference</h1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>Your contribution helps us continue our mission.</p>
        </div>

        {message.text && (
          <div style={{ padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", backgroundColor: message.type === "success" ? "#dcfce3" : "#fee2e2", color: message.type === "success" ? "#166534" : "#991b1b", fontSize: "0.9rem", textAlign: "center" }}>
            {message.text}
          </div>
        )}

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "block", marginBottom: "0.75rem", fontWeight: "600", color: "#475569" }}>Select Donation Amount (INR)</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "1.5rem" }}>
            {["100", "500", "1000"].map((val) => (
              <button 
                key={val} 
                onClick={() => setAmount(val)}
                style={{ 
                  padding: "12px", 
                  borderRadius: "8px", 
                  border: amount === val ? "2px solid #2563eb" : "1px solid #e2e8f0", 
                  backgroundColor: amount === val ? "#eff6ff" : "white",
                  color: amount === val ? "#2563eb" : "#475569",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                ₹{val}
              </button>
            ))}
          </div>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Custom Amount"
            style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "1.1rem", textAlign: "center" }}
          />
        </div>

        <button 
          onClick={() => loadRazorpay(amount)}
          disabled={loading}
          style={{ 
            width: "100%", 
            padding: "1.25rem", 
            backgroundColor: "#0f172a", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            fontWeight: "bold", 
            fontSize: "1.1rem", 
            cursor: loading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.2s"
          }}
        >
          {loading ? "Processing..." : <>Donate Now <ArrowRight size={20} /></>}
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "2rem", color: "#94a3b8", fontSize: "0.85rem" }}>
          <ShieldCheck size={16} /> Secure Payment powered by Razorpay
        </div>
      </div>
    </div>
  );
}
