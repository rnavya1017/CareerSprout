"use client";
import React, { useState } from "react";
import { Navbar, Footer } from "@/components/layout-components";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate database signup
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      
      // Save session
      localStorage.setItem("careersprout_user", JSON.stringify(data.user));
      alert("Successfully registered in PostgreSQL database!");
      router.push("/job-search");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Create an Account</h1>
          <p className="text-neutral-500 mb-8 dark:text-neutral-400">Join CareerSprout to find jobs, build resumes, and track your applications securely.</p>
          
          {error && <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl">{error}</div>}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600 dark:text-neutral-400">Full Name</label>
              <input 
                type="text" required
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-700 outline-none"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600 dark:text-neutral-400">Email Address</label>
              <input 
                type="email" required
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-700 outline-none"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600 dark:text-neutral-400">Password</label>
              <input 
                type="password" required
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-700 outline-none"
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            <p className="text-center text-sm text-neutral-500 mt-4">
              Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
            </p>
          </form>
        </div>

        <div className="hidden lg:flex justify-center">
          <CardSpotlightDemo />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CardSpotlightDemo() {
  return (
    <CardSpotlight className="h-96 w-96">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Authentication steps
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        Follow these steps to secure your account:
        <ul className="list-none mt-2 space-y-2">
          <Step title="Enter your email address" />
          <Step title="Create a strong password" />
          <Step title="Set up two-factor authentication" />
          <Step title="Verify your identity" />
        </ul>
      </div>
      <p className="text-neutral-300 mt-6 relative z-20 text-sm">
        Ensuring your account is properly secured helps protect your personal
        information and data.
      </p>
    </CardSpotlight>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start mt-2">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0" />
    </svg>
  );
};
