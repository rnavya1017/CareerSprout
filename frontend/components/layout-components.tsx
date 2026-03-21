"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sprout, Search, FileText, LayoutDashboard, User, BookOpen, UserCheck } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-green-500" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            CareerSprout
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/job-search" icon={<Search className="w-4 h-4" />} label="Job Search" />
          <NavLink href="/resume-builder" icon={<FileText className="w-4 h-4" />} label="Resume" />
          <NavLink href="/resume-analyzer" icon={<UserCheck className="w-4 h-4" />} label="Screening" />
          <NavLink href="/courses" icon={<BookOpen className="w-4 h-4" />} label="Courses" />
          <NavLink href="/linkedin-tips" icon={<User className="w-4 h-4" />} label="LinkedIn" />
          <NavLink href="/admin" icon={<LayoutDashboard className="w-4 h-4" />} label="Admin" />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
      {icon}
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Sprout className="h-10 w-10 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">CareerSprout</h3>
        <p className="text-neutral-500 dark:text-neutral-400 italic mb-8">
          "Life takes care of one , those who takes care of life"
        </p>
        <div className="flex justify-center gap-8 mb-8 text-sm font-medium text-neutral-500">
          <Link href="#">About Us</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Contact</Link>
        </div>
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} CareerSprout. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
