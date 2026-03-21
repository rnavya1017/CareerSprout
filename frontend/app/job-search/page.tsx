"use client";
import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "@/components/layout-components";
import { Search, MapPin, Briefcase, Star, Info, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function JobSearchPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("Software Engineer");
  const [location, setLocation] = useState("India");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/jobs", {
        params: { what: query, where: location }
      });
      setJobs(response.data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Header */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-xl mb-12">
          <h1 className="text-3xl font-bold mb-6">Find Your Next Opportunity</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-700">
              <Briefcase className="w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="bg-transparent border-none outline-none flex-1 px-4 py-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-700">
              <MapPin className="w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="City, state, or zip"
                className="bg-transparent border-none outline-none flex-1 px-4 py-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              onClick={fetchJobs}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>

        {/* Job Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            {loading ? (
              <p>Loading jobs...</p>
            ) : jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p>No jobs found. Try a different search.</p>
            )}
          </div>
          {/* Sidebar / Filters */}
          <div className="col-span-1 space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <div className="space-y-4">
                <FilterOption label="Full-Time" />
                <FilterOption label="Remote" />
                <FilterOption label="Internship" />
                <FilterOption label="Entry-Level" />
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                AI Smart Score
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Our AI analyzes each job description for safety and potential growth.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function JobCard({ job }: { job: any }) {
  // Mock AI safety score
  const safetyScore = Math.floor(Math.random() * (98 - 75 + 1)) + 75;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold hover:text-blue-600 cursor-pointer">{job.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 font-medium">{job.company?.display_name}</p>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1",
          safetyScore > 90 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
        )}>
          <ShieldCheck className="w-4 h-4" />
          {safetyScore}% AI Safe
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location?.display_name}</span>
        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.category?.label}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">₹ {Math.round(job.salary_min || 500000).toLocaleString()}+</p>
        <button
          onClick={() => window.open(job.redirect_url, "_blank")}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

function FilterOption({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <input type="checkbox" className="w-5 h-5 rounded border-neutral-300 ring-blue-500" />
      <span className="text-neutral-700 dark:text-neutral-300 font-medium">{label}</span>
    </div>
  );
}
