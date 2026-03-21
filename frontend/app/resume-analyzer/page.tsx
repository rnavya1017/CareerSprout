"use client";
import React, { useState } from "react";
import { Navbar, Footer } from "@/components/layout-components";
import { Upload, FileCheck, CircleCheck, AlertTriangle, ListChecks, Gauge } from "lucide-react";

export default function ResumeAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: Math.floor(Math.random() * (92 - 65 + 1)) + 65,
        feedback: [
          { type: "success", text: "Strong use of action verbs identified." },
          { type: "warning", text: "Contact information section is missing LinkedIn link." },
          { type: "success", text: "Keyword density matches top-tier SDE roles." },
          { type: "warning", text: "Consider adding more quantifiable metrics to your projects." }
        ]
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ATS Resume Analyzer</h1>
            <p className="text-neutral-500">Upload your resume to check your ATS compatibility score and get improvement tips.</p>
          </div>

          <div 
            className="border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-3xl p-20 text-center hover:border-blue-500 transition-colors cursor-pointer"
            onClick={startAnalysis}
          >
            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Drop your resume here</h3>
            <p className="text-neutral-500 text-sm">Supports PDF, DOCX (Max 5MB)</p>
          </div>

          {analyzing && (
            <div className="mt-12 text-center space-y-4">
              <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-neutral-600 font-medium">AI is analyzing your resume structure...</p>
            </div>
          )}

          {result && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <svg className="w-40 h-40">
                      <circle cx="80" cy="80" r="70" className="stroke-neutral-100 dark:stroke-neutral-800 fill-none stroke-[10]" />
                      <circle 
                        cx="80" cy="80" r="70" 
                        className="stroke-blue-600 fill-none stroke-[10]"
                        style={{
                          strokeDasharray: 440,
                          strokeDashoffset: 440 - (440 * result.score) / 100,
                          transition: "stroke-dashoffset 1s ease-out"
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl font-black text-blue-600">{result.score}</span>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">ATS Score</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Good Impression!</h3>
                  <p className="text-neutral-500">Your resume is performant for most ATS systems.</p>
                </div>

                <div className="bg-neutral-50 dark:bg-black p-8 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                  <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <ListChecks className="text-blue-600" /> Improvement Checklist
                  </h4>
                  <div className="space-y-4">
                    {result.feedback.map((item: any, i: number) => (
                      <div key={i} className="flex gap-3">
                        {item.type === "success" ? (
                          <CircleCheck className="h-5 w-5 text-green-500 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                        )}
                        <p className="text-sm font-medium">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setResult(null)}
                  className="px-8 py-3 bg-neutral-100 dark:bg-neutral-800 font-bold rounded-xl"
                >
                  Analyze Another
                </button>
                <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center gap-2">
                  Download Full Report <FileCheck className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
