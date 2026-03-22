# CareerSprout Detailed Architecture Diagram

This document contains the detailed architecture and data flow diagrams for the CareerSprout application based on the current Vanilla JS and Node.js setup.

## 1. Comprehensive System Architecture

This diagram illustrates the full full-stack architecture, including the structural files of the frontend, the backend proxy, and the external services.

```mermaid
graph TD
    %% Styling
    classDef frontend fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef backend fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#fff
    classDef external fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff
    classDef database fill:#334155,stroke:#94a3b8,stroke-width:2px,color:#fff

    subgraph Client ["Client Browser (vanilla-frontend/)"]
        UI_Core["DOM & Styling<br/>(index.html, style.css)"]:::frontend
        App_Logic["App Logic & Routing<br/>(script.js)"]:::frontend
        Globe3D["3D Visuals<br/>(globe3d.js - Three.js)"]:::frontend
        CanvasMap["2D Animations<br/>(world-map.js - Canvas API)"]:::frontend
        
        UI_Core --- App_Logic
        UI_Core --- Globe3D
        UI_Core --- CanvasMap
    end

    subgraph Server ["Node.js Backend (vanilla-backend/)"]
        Express["Express Gateway API<br/>(server.js)"]:::backend
        EnvVars[".env Secrets<br/>(API Keys)"]:::database
        UserStorage["Local Storage<br/>(users.json)"]:::database
        
        Express -. "Reads Config" .-> EnvVars
        Express -- "CRUD Operations" --> UserStorage
    end

    subgraph ThirdParty ["External APIs & Microservices"]
        Adzuna["Adzuna API<br/>(Job Listings Aggregator)"]:::external
        AI_Nexus["job-nexus-production<br/>(ATS Scoring, Resume AI)"]:::external
        RiskAPI["Custom API Endpoint<br/>(/api/jobs/verify)"]:::external
        YouTube["YouTube API Proxy<br/>(/api/courses)"]:::external
    end

    %% Communication Flow
    App_Logic -- "Auth & State Req<br/>(REST HTTP)" --> Express
    App_Logic -- "Job Search Req" --> Express
    App_Logic -- "Resume/AI Req" --> Express
    
    Express -- "Proxied Secure Call" --> Adzuna
    Express -- "Screening Validation" --> RiskAPI
    Express -- "Fetches Edu Content" --> YouTube
    Express -- "AI Processing" --> AI_Nexus
```

## 2. Authentication & Data Flow Lifecycle

This diagram shows the sequence of events during a core user journey (e.g., Logging in and Searching for a job). It demonstrates how the frontend communicates with the backend, which in turn orchestrates calls to external systems.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Browser as Vanilla JS App
    participant Server as Node DB/Express
    participant Adzuna as Adzuna API
    participant Nexus as AI Services

    User->>Browser: Enters Credentials & Clicks Login
    Browser->>Server: POST /login (Email, Password)
    Server->>Server: Validate against users.json
    alt Invalid Credentials
        Server-->>Browser: 401 Unauthorized
        Browser-->>User: Show Error Toast
    else Valid Credentials
        Server-->>Browser: 200 OK + JWT/Session Token
        Browser->>Browser: Store Token in localStorage
        Browser-->>User: Redirect to Dashboard
    end

    User->>Browser: Searches "Frontend Developer in London"
    Browser->>Server: GET /api/jobs?role=Frontend... + Token
    Server->>Server: Verify Auth Request
    Server->>Adzuna: GET Jobs using Secret API Keys
    Adzuna-->>Server: Return Job JSON payload
    
    par Fraud Analysis
        Server->>Nexus: Analyze Job Postings for Fraud Risk
        Nexus-->>Server: Trust Scores per Job
    end

    Server-->>Browser: Merged Job Data + Risk Scores
    Browser-->>User: Render Job Cards with Trust Badges
```
