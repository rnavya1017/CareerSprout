# CareerSprout Architecture

## System Overview
CareerSprout is a comprehensive job portal and career development platform designed with a modern user interface and AI-powered features. It follows a full-stack architecture with a React front-end and a Node.js/Java back-end (integrated via API routes for speed and deployment ease).

## Technology Stack
- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion (Aceternity UI)
- **Backend API**: Next.js API Routes (Node.js) / Spring Boot
- **Database**: Appwrite / MongoDB for user data storage
- **AI Integration**: Google Gemini API for resume analysis and job safety scoring
- **External APIs**: Adzuna API for job discovery
- **Build & Deployment**: Vite/Next.js and Docker (for Railway/Render compatibility)

## Key Components
1.  **Job Search Module**: Hits Adzuna API, filters results, and performs AI risk analysis on search hits.
2.  **Resume Builder**: Multi-step form that generates LaTeX code and facilitates Overleaf integration.
3.  **AI Resume Analyzer**: Parses resume text and uses Gemini to calculate an ATS-compatibility score.
4.  **LinkedIn Optimization Engine**: Stores and presents prompt-based tips for profile improvement.
5.  **Admin Dashboard**: Centralized view for user counts and platform engagement analytics.
6.  **Globe Visualization**: Interactive 3D globe component for a distributed user base.

## Data Flow
1.  **User Search**: Frontend -> API Route -> Adzuna -> Result Processing -> Display.
2.  **Resume Analysis**: Frontend -> File/Text Upload -> AI Service -> ATS Scoring -> Feedback.
3.  **Authentication**: Frontend -> API Route -> Database (secure hash) -> Session Management.
