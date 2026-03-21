"use client";
import React from "react";
import { Navbar, Footer } from "@/components/layout-components";
import { Linkedin, User, Image, Target, Briefcase, Award, Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Profile Photo Generation",
    icon: <User className="h-6 w-6 text-blue-600" />,
    prompt: "Create a professional LinkedIn profile photo of a college student. Clean background (light grey or blue), formal attire, confident smile, natural lighting, sharp focus, corporate look, professional headshot style. No filters, no blur, realistic face, suitable for LinkedIn.",
    tips: [
      "Wear a plain shirt",
      "Face the camera",
      "Avoid casual clothes"
    ]
  },
  {
    title: "Banner / Cover Image",
    icon: <Image className="h-6 w-6 text-indigo-600" />,
    prompt: "Design a clean and professional LinkedIn banner for a student aspiring to work in the tech industry. Minimal design, modern colors, subtle icons related to technology, text space on the right, professional and corporate feel. No clutter, simple and readable.",
    tips: [
      "Aspiring Software Engineer",
      "Java | Python | Web Development",
      "Open to Internships"
    ]
  },
  {
    title: "About Section",
    icon: <Target className="h-6 w-6 text-green-600" />,
    prompt: "Write a professional LinkedIn “About” section for a college student. Include: Current education, Technical skills, Projects or internships, Career goal, Enthusiasm for learning. Keep it between 150–250 words. Use a confident but simple tone.",
    tips: [
      "Start with a strong hook",
      "Highlight your tech stack early",
      "Clearly state your career goals"
    ]
  },
  {
    title: "Experience / Project Description",
    icon: <Award className="h-6 w-6 text-amber-600" />,
    prompt: "Suggest the top 15 LinkedIn skills for a student aspiring to become a [target role]. Include both technical and soft skills. Ensure the skills are commonly searched by recruiters.",
    tips: [
      "Rewrite with action verbs",
      "Focus on measurable impact",
      "Recruiter-friendly keywords"
    ]
  }
];

export default function LinkedInTipsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24 text-neutral-900 dark:text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <header className="text-center mb-16">
          <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-3xl mb-6">
            <Linkedin className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-5xl font-black mb-4">LinkedIn Optimization</h1>
          <p className="text-xl text-neutral-500 font-medium max-w-2xl mx-auto">
            Get recruiter-ready in minutes with AI-powered prompts and professional tips.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-10 shadow-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neutral-50 dark:bg-black rounded-2xl">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold">{section.title}</h3>
              </div>

              <div className="mb-8 group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest">AI Prompt</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(section.prompt)}
                    className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-50 dark:bg-black rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm bg-neutral-50 dark:bg-black p-5 rounded-xl border border-neutral-100 dark:border-neutral-800 leading-relaxed italic text-neutral-600 dark:text-neutral-400">
                  "{section.prompt}"
                </p>
              </div>

              <div>
                <span className="text-xs font-black text-green-600 uppercase tracking-widest mb-4 block">Pro Tips</span>
                <ul className="space-y-3">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
