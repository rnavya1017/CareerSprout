"use client";
import { Navbar, Footer } from "@/components/layout-components";
import { Globe3D } from "@/components/ui/3d-globe";
import { FeaturesSectionDemo } from "@/components/features-section";
import { FocusCards } from "@/components/ui/focus-cards";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import WorldMap from "@/components/ui/world-map";
import { WorldMapDemo } from "@/components/world-map-demo";
import { CheckIcon, Sprout } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const sampleMarkers = [
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
];

const cards = [
  { title: "Forest Adventure", src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop" },
  { title: "Valley of life", src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop" },
  { title: "The road not taken", src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-600 to-indigo-600">
              Grow Your Career with CareerSprout
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl">
              The all-in-one job portal featuring AI-powered resume screening, 
              interactive career tools, and the latest job listings.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/job-search" className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-700 transition-all hover:scale-105">
                Explore Jobs
              </Link>
              <Link href="/resume-builder" className="px-8 py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-full text-lg font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all hover:scale-105">
                Build Resume
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[500px]">
            <Globe3DDemoSecond />
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Career Pathways</h2>
          <FocusCards cards={cards} />
        </div>
      </section>

      {/* Features Grid */}
      <FeaturesSectionDemo />

      {/* Spotlight Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <CardSpotlight className="h-full">
            <p className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
              AI Job Analysis
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Our AI evaluates every job listing for safety and quality, giving you a scores to make informed decisions.
            </p>
            <ul className="space-y-4">
              <Step title="Instant Safety Check" />
              <Step title="Company Reputation Analysis" />
              <Step title="Salary Match Score" />
            </ul>
          </CardSpotlight>

          <CardSpotlight className="h-full">
            <p className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
              LinkedIn Mastery
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Get professional headshot advice and banner ideas tailored to your career aspirations.
            </p>
            <ul className="space-y-4">
              <Step title="AI Profile Photo Prompts" />
              <Step title="Custom Banner Designs" />
              <Step title="Optimized 'About' Sections" />
            </ul>
          </CardSpotlight>
        </div>
      </section>

      <WorldMapDemo />

      <Footer />
    </div>
  );
}

function Step({ title }: { title: string }) {
  return (
    <li className="flex gap-2 items-center">
      <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
        <CheckIcon className="h-4 w-4 text-blue-600" />
      </div>
      <p className="text-neutral-800 dark:text-neutral-200 font-medium">{title}</p>
    </li>
  );
}

function Globe3DDemoSecond() {
  return (
    <div className="relative h-[500px] w-full max-w-lg overflow-hidden rounded-xl bg-white p-10 shadow-2xl ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
        Global Talent Network
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        Join our distributed team of experts working across 6 continents.
      </p>
      <div className="absolute inset-0">
        <Globe3D
          className="h-[800px] w-[800px] -bottom-[350px] -left-[150px]"
          markers={sampleMarkers}
          config={{
            autoRotateSpeed: 0.005,
          }}
        />
      </div>
    </div>
  );
}
