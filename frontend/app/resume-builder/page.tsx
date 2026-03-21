"use client";
import React, { useState } from "react";
import { Navbar, Footer } from "@/components/layout-components";
import { FileText, Copy, ExternalLink, ShieldCheck, Mail, Phone, Globe, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResumeBuilderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "Md Shahzad",
    email: "shahzad.dev@gmail.com",
    phone: "+91 9608125207",
    linkedin: "shahzad5",
    github: "shahzad-2004",
    portfolio: "shahzaddev.xyz",
    skills: "Java, JavaScript, React, Spring Boot, MySQL, HTML5, CSS3, Tailwind CSS, OOPS, DBMS",
    projects: "DevSync Hub - Collaborative Workspace, CampusServe - University Portal",
    internship: "Full Stack Developer Intern - TAP Academy",
    achievements: "2nd Place at GDG HackFest, Solved 600+ LeetCode problems",
    education: "B.Tech in CSE, Radharaman Institute of Technology; Diploma in CS, People's University"
  });
  const [latexCode, setLatexCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateLatex = () => {
    const code = `% LATEX RESUME - TAILORED FOR ARGUSOFT
\\documentclass[letterpaper,11pt]{article}

% COMPACT MARGIN SETTINGS (fits resume into 1 page)
\\usepackage[a4paper,margin=0.5in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{multicol}
\\usepackage{xcolor}
\\usepackage{fontawesome5}

% Section formatting
\\titleformat{\\section}{
\\scshape\\large\\raggedright
}{}{0em}{}[\\titlerule]

% Custom commands
\\newcommand{\\resumeItem}[1]{\\item\\small{#1\\vspace{-4pt}}}
\\newcommand{\\resumeSubheading}[4]{
\\vspace{-1pt}\\item
\\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
\\textbf{#1} & \\textbf{#2} \\\\
\\textit{#3} & \\textit{#4}
\\end{tabular*}\\vspace{-5pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=*]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

% RESUME STARTS
\\begin{document}
\\begin{center}
{\\Huge \\scshape ${formData.name}} \\\\ \\vspace{1pt}
\\small \\href{tel:${formData.phone.replace(/\\s/g, "")}}{\\faPhone~${formData.phone}} $|$
\\href{mailto:${formData.email}}{\\faEnvelope~${formData.email}} $|$
\\href{https://linkedin.com/in/${formData.linkedin.replace("https://linkedin.com/in/", "")}}{\\faLinkedin~${formData.linkedin.replace("https://linkedin.com/in/", "")}} $|$
\\href{https://github.com/${formData.github.replace("https://github.com/", "")}}{\\faGithub~${formData.github.replace("https://github.com/", "")}} $|$
\\href{https://${formData.portfolio.replace("https://", "")}}{\\faGlobe~${formData.portfolio.replace("https://", "")}}
\\end{center}

% SKILLS
\\section*{Skills}
\\textbf{Core Skills: } ${formData.skills}

% PROJECTS
\\section*{Projects}
\\resumeSubHeadingListStart
\\resumeSubheading
{${formData.projects.split(',')[0]} – Key Project}{June 2025 – Present}
{Focus Technologies}{Live: \\href{https://example.com}{example.com}}
\\resumeItemListStart
\\resumeItem{Built a high-performance full-stack application integrating core systems.}
\\resumeItem{Developed robust frameworks tracking user metrics and improved overall efficiency.}
\\resumeItemListEnd
\\resumeSubHeadingListEnd

% EXPERIENCE / INTERNSHIP
\\section*{Internship}
\\resumeSubHeadingListStart
\\resumeSubheading
{${formData.internship}}{Jan 2024 – June 2024}
{}{}
\\resumeItemListStart
\\resumeItem{Developed and deployed applications contributing directly to software modules.}
\\resumeItem{Built backend resources, optimized performance by rewriting inefficient queries.}
\\resumeItemListEnd
\\resumeSubHeadingListEnd

% ACHIEVEMENTS
\\section*{Achievements}
\\resumeSubHeadingListStart
\\resumeItemListStart
\\resumeItem{\\textbf{Achievement 1:} ${formData.achievements.split(',')[0]}}
\\resumeItem{\\textbf{Achievement 2:} ${formData.achievements.split(',')[1] || "Consistent track record of problem-solving."}}
\\resumeItemListEnd
\\resumeSubHeadingListEnd

% EDUCATION
\\section*{Education}
\\resumeSubHeadingListStart
\\resumeSubheading
{${formData.education.split(';')[0] || "University Name"}}{Jul 2022 – Jul 2026}
{Degree in relevant field}{Location}
\\resumeSubHeadingListEnd
\\end{document}`;
    setLatexCode(code);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Resume Builder</h1>
              <p className="text-neutral-500">Step {step} of 3: AI-Powered Resume Generation</p>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-neutral-100 dark:border-neutral-800 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} />
                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                <InputField label="LinkedIn username" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 mt-10"
              >
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-neutral-100 dark:border-neutral-800 pb-2">Experience & Skills</h3>
              <div className="space-y-4">
                <TextAreaField label="Core Skills (comma separated)" name="skills" value={formData.skills} onChange={handleChange} />
                <TextAreaField label="Projects" name="projects" value={formData.projects} onChange={handleChange} />
                <TextAreaField label="Education" name="education" value={formData.education} onChange={handleChange} />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  Back
                </button>
                <button 
                  onClick={generateLatex}
                  className="flex-2 py-4 px-12 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
                >
                  Generate LaTeX
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-bold text-green-800 dark:text-green-500">LaTeX Code Generated Successfully!</h4>
                  <p className="text-sm text-green-700 dark:text-green-600">Copy the code and use Overleaf to compile your professional resume.</p>
                </div>
              </div>
              
              <div className="relative group">
                <textarea 
                  className="w-full h-[400px] p-6 font-mono text-sm bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:ring-2 ring-blue-500"
                  value={latexCode}
                  readOnly
                />
                <button 
                  onClick={() => navigator.clipboard.writeText(latexCode)}
                  className="absolute top-4 right-4 p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:scale-110 transition-transform flex items-center gap-2 text-sm font-bold"
                >
                  <Copy className="h-4 w-4" /> Copy Code
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-10">
                <button 
                  onClick={() => setStep(2)}
                  className="px-8 py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  Edit Information
                </button>
                <button 
                  onClick={() => window.open('https://www.overleaf.com/docs', '_blank')}
                  className="px-12 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 flex items-center gap-3 shadow-xl"
                >
                  Open Overleaf <ExternalLink className="h-5 w-5" />
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

function InputField({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: any }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-neutral-600 dark:text-neutral-400">{label}</label>
      <input 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: any }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-neutral-600 dark:text-neutral-400">{label}</label>
      <textarea 
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
      />
    </div>
  );
}
