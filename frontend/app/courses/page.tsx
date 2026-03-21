"use client";
import React from "react";
import { Navbar, Footer } from "@/components/layout-components";
import { Youtube, Code, Layout, Database, Terminal, Cpu, Globe, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const courses = [
  {
    domain: "Frontend Development",
    icon: <Layout className="h-6 w-6 text-blue-500" />,
    channels: [
      { name: "CodeWithHarry", link: "https://www.youtube.com/@CodeWithHarry", focus: "Full Stack" },
      { name: "Apna College", link: "https://www.youtube.com/@ApnaCollegeOfficial", focus: "MERN" },
      { name: "Careerrise", link: "https://www.youtube.com/@CareerRise", focus: "React" }
    ]
  },
  {
    domain: "Backend Development",
    icon: <Database className="h-6 w-6 text-green-500" />,
    channels: [
      { name: "Telusko", link: "https://www.youtube.com/@Telusko", focus: "Java/Spring" },
      { name: "Abdul Bari", link: "https://www.youtube.com/@abdul_bari", focus: "Algorithms" },
      { name: "Hitesh Choudhary", link: "https://www.youtube.com/@HiteshChoudharydotcom", focus: "General Tech" }
    ]
  },
  {
    domain: "Data Science & AI",
    icon: <Cpu className="h-6 w-6 text-indigo-500" />,
    channels: [
      { name: "Krish Naik", link: "https://www.youtube.com/@krishnaik06", focus: "Data Science" },
      { name: "Sentdex", link: "https://www.youtube.com/@sentdex", focus: "AI/ML" },
      { name: "Codebasics", link: "https://www.youtube.com/@codebasics", focus: "Business Analytics" }
    ]
  },
  {
    domain: "Foundations (DSA)",
    icon: <Code className="h-6 w-6 text-amber-500" />,
    channels: [
      { name: "Striver (takeUforward)", link: "https://www.youtube.com/@takeUforward", focus: "DSA Sheet" },
      { name: "Love Babbar", link: "https://www.youtube.com/@LoveBabbar", focus: "DSA Roadmap" },
      { name: "FreeCodeCamp", link: "https://www.youtube.com/@freecodecamp", focus: "Comprehensive" }
    ]
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24 text-neutral-900 dark:text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <header className="mb-16">
          <h1 className="text-5xl font-black mb-4">Curated Learning Paths</h1>
          <p className="text-xl text-neutral-500 font-medium max-w-2xl">
            Verified YouTube channels for various technology domains, 
            seggregated to help you score high in technical rounds.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {courses.map((course, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-neutral-50 dark:bg-black rounded-2xl">
                  {course.icon}
                </div>
                <h3 className="text-2xl font-bold">{course.domain}</h3>
              </div>

              <div className="space-y-4">
                {course.channels.map((channel, i) => (
                  <a 
                    key={i} 
                    href={channel.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 bg-neutral-50 dark:bg-black rounded-2xl group border border-neutral-100 dark:border-neutral-800 hover:border-red-500/50 hover:bg-red-50/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center">
                        <Youtube className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold group-hover:text-red-600 transition-colors uppercase tracking-tight">{channel.name}</h4>
                        <span className="text-xs font-black text-neutral-400 dark:text-neutral-500 tracking-widest">{channel.focus}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <BookOpen className="h-5 w-5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
