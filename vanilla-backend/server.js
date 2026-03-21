const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Frontend is deployed separately, so no static file serving is needed here.

// Database Setup
const DB_FILE = path.join(__dirname, 'users.json');
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));

const getUsers = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
const saveUsers = (users) => fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));

// Auth Middleware — accepts plain user ID or Bearer token
function requireAuth(req, res, next) {
    let token = req.headers['authorization'] || '';
    // Strip 'Bearer ' prefix if present
    if (token.startsWith('Bearer ')) token = token.slice(7);
    if (!token) return res.status(401).json({ error: 'Unauthorized. Please login first.' });

    const users = getUsers();
    // Token is stored as the user ID
    const user = users.find(u => u.id === token);
    if (!user) return res.status(401).json({ error: 'Session invalid. Please login again.' });

    req.user = user;
    next();
}

// ------ AUTHENTICATION API ------
app.post('/api/auth/signup', (req, res) => {
    const { firstName, lastName, name, email, password, targetRole } = req.body;
    const displayName = firstName || name;
    if (!displayName || !email || !password) return res.status(400).json({ error: 'Missing required fields' });

    const users = getUsers();
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'An account with this email already exists' });

    const newUser = { id: Date.now().toString(), firstName: displayName, lastName: lastName || '', email, password, role: 'user', targetRole: targetRole || '' };
    users.push(newUser);
    saveUsers(users);

    res.json({ message: 'Success', token: newUser.id, user: { id: newUser.id, firstName: newUser.firstName, email: newUser.email, role: newUser.role } });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Success', token: user.id, user: { id: user.id, firstName: user.firstName || user.name, email: user.email, role: user.role || 'user' } });
});

// GET /api/auth/me — verify token and return current user
app.get('/api/auth/me', requireAuth, (req, res) => {
    const { id, firstName, name, email, role } = req.user;
    res.json({ user: { id, firstName: firstName || name, email, role: role || 'user' } });
});

// ------ SECURE JOB SEARCH PROXY (Hides Adzuna APIs) ------
app.get('/api/jobs', requireAuth, async (req, res) => {
    try {
        const { what = 'developer', where = 'india', page = 1, sort_by = 'relevance' } = req.query;
        const countryMap = { 'india': 'in', 'uk': 'gb', 'us': 'us' };
        const countryCode = countryMap[where.toLowerCase()] || 'in';

        const appId = process.env.ADZUNA_APP_ID;
        const appKey = process.env.ADZUNA_API_KEY;

        const apiUrl = `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/${page}?app_id=${appId}&app_key=${appKey}&what=${what}&where=${where}&sort_by=${sort_by}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Remap Adzuna to match UI format
        const jobs = (data.results || []).map(r => ({
            title: r.title,
            company: r.company?.display_name || 'Unknown',
            location: r.location?.display_name || where,
            category: r.category?.label || 'General',
            created: r.created,
            description: r.description,
            salary_min: r.salary_min,
            salary_max: r.salary_max,
            currency: countryCode === 'in' ? 'INR' : countryCode === 'gb' ? 'GBP' : 'USD',
            contract_type: r.contract_type || 'Full Time',
            redirect_url: r.redirect_url,
            logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.company?.display_name || 'J')}&background=0f4c81&color=fff&size=64`
        }));

        res.json({ jobs, total: data.count || 0, country: countryCode });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error fetching jobs securely' });
    }
});

// ------ JOB FRAUD RISK ANALYSIS ------
app.post('/api/jobs/verify', (req, res) => {
    const job = req.body;
    const signals = [];
    let riskScore = 0;

    // Signal checks
    if (!job.company || job.company === 'Unknown') {
        signals.push({ type: 'danger', icon: '🔴', text: 'Company name is missing or unknown' });
        riskScore += 25;
    } else {
        signals.push({ type: 'safe', icon: '✅', text: `Company: ${job.company}` });
    }

    if (!job.salary_min && !job.salary_max) {
        signals.push({ type: 'warn', icon: '⚠️', text: 'Salary not disclosed — verify before applying' });
        riskScore += 10;
    } else {
        signals.push({ type: 'safe', icon: '✅', text: 'Salary range is publicly listed' });
    }

    const desc = (job.description || '').toLowerCase();
    const fraudKeywords = ['urgent', 'no experience needed', 'work from home earn', 'guaranteed income', 'click here', 'whatsapp', 'telegram'];
    const foundFraudKw = fraudKeywords.filter(k => desc.includes(k));
    if (foundFraudKw.length > 0) {
        signals.push({ type: 'danger', icon: '🚨', text: `Suspicious keywords detected: "${foundFraudKw.join('", "')}"` });
        riskScore += foundFraudKw.length * 15;
    } else {
        signals.push({ type: 'safe', icon: '✅', text: 'No suspicious language detected in description' });
    }

    if (job.redirect_url && job.redirect_url.includes('adzuna')) {
        signals.push({ type: 'safe', icon: '✅', text: 'Posted via verified Adzuna job board' });
    } else {
        signals.push({ type: 'info', icon: 'ℹ️', text: 'External application link — verify company website' });
        riskScore += 5;
    }

    if (job.category && job.category !== 'General') {
        signals.push({ type: 'safe', icon: '✅', text: `Listed under: ${job.category}` });
    }

    const trustPct = Math.max(0, Math.min(100, 100 - riskScore));
    const verdict = trustPct >= 70 ? 'Looks Legitimate ✅' : trustPct >= 40 ? 'Proceed with Caution ⚠️' : 'High Risk — Verify Carefully 🚨';
    const verdictIcon = trustPct >= 70 ? '✅' : trustPct >= 40 ? '⚠️' : '🚨';
    const verdictColor = trustPct >= 70 ? '#22c55e' : trustPct >= 40 ? '#f59e0b' : '#ef4444';

    // Build LinkedIn apply URL from job title + company
    const liQuery = encodeURIComponent(`${job.title} ${job.company}`);
    const linkedinUrl = `https://www.linkedin.com/jobs/search/?keywords=${liQuery}`;

    res.json({ trustPct, verdict, verdictIcon, verdictColor, riskScore, signals, linkedinUrl });
});

// ------ YOUTUBE COURSES DATA ------
app.get('/api/courses', (req, res) => {
    const courses = {
        'Web Development': [
            { icon: '🌐', title: 'HTML & CSS Full Course', channel: 'Dave Gray', desc: 'Complete HTML and CSS tutorial from beginner to advanced.', url: 'https://www.youtube.com/watch?v=mU6anWqZJcc' },
            { icon: '⚡', title: 'JavaScript Full Course', channel: 'Bro Code', desc: 'Master JavaScript step by step with projects and exercises.', url: 'https://www.youtube.com/watch?v=8dWL3wF_OMw' },
            { icon: '⚛️', title: 'React JS Full Course', channel: 'Traversy Media', desc: 'Build real-world apps with React.js, hooks, and Redux.', url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0' },
            { icon: '🟢', title: 'Node.js Full Course', channel: 'Dave Gray', desc: 'Complete Node.js and Express.js backend development course.', url: 'https://www.youtube.com/watch?v=f2EqECiTBL8' },
            { icon: '🎨', title: 'CSS Flexbox & Grid', channel: 'Kevin Powell', desc: 'Master modern CSS layouts with Flexbox and CSS Grid.', url: 'https://www.youtube.com/watch?v=phWxA89Dy94' },
        ],
        'Java & Spring': [
            { icon: '☕', title: 'Java Full Course', channel: 'Bro Code', desc: 'Learn Java from scratch — OOP, data structures, and more.', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo' },
            { icon: '🍃', title: 'Spring Boot Tutorial', channel: 'Amigoscode', desc: 'Build production-ready REST APIs with Spring Boot.', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U' },
            { icon: '🔷', title: 'Java DSA & Algorithms', channel: 'Kunal Kushwaha', desc: 'Data structures and algorithms in Java with interview prep.', url: 'https://www.youtube.com/watch?v=rZ41y93P2Qo' },
            { icon: '🚀', title: 'Microservices with Spring', channel: 'Daily Code Buffer', desc: 'Build and deploy microservices architecture with Spring Boot.', url: 'https://www.youtube.com/watch?v=BnknNTN8icw' },
        ],
        'AI & ML': [
            { icon: '🤖', title: 'Machine Learning Course', channel: 'StatQuest', desc: 'StatQuest makes complex ML concepts crystal clear.', url: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI' },
            { icon: '🧠', title: 'Deep Learning Specialization', channel: '3Blue1Brown', desc: 'Neural networks explained with beautiful visual intuitions.', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
            { icon: '🐍', title: 'Python for Data Science', channel: 'Tech With Tim', desc: 'Full Python course for data science with pandas, numpy & matplotlib.', url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI' },
            { icon: '🔥', title: 'PyTorch Deep Learning', channel: 'Daniel Bourke', desc: 'Zero to mastery in PyTorch — hands-on deep learning.', url: 'https://www.youtube.com/watch?v=Z_ikDlimN6A' },
            { icon: '🌟', title: 'LLMs & Prompt Engineering', channel: 'Andrej Karpathy', desc: 'Understanding Large Language Models from the ground up.', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
        ],
        'DevOps & Cloud': [
            { icon: '🐳', title: 'Docker Full Course', channel: 'TechWorld with Nana', desc: 'Complete Docker course — containers, images, and Compose.', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE' },
            { icon: '☸️', title: 'Kubernetes Full Course', channel: 'TechWorld with Nana', desc: 'Kubernetes from zero to production — hands-on with labs.', url: 'https://www.youtube.com/watch?v=X48VuDVv0do' },
            { icon: '🟠', title: 'AWS for Beginners', channel: 'freeCodeCamp', desc: 'AWS core services explained with hands-on demos.', url: 'https://www.youtube.com/watch?v=ulprqHHWlng' },
            { icon: '🔵', title: 'CI/CD with GitHub Actions', channel: 'TechWorld with Nana', desc: 'Automate your software delivery pipeline with GitHub Actions.', url: 'https://www.youtube.com/watch?v=R8_veQiYBjI' },
        ],
        'Data Structures': [
            { icon: '📊', title: 'DSA Full Course in Python', channel: 'freeCodeCamp', desc: 'Complete data structures and algorithms in Python.', url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA' },
            { icon: '🔍', title: 'Sorting Algorithms Visualized', channel: 'Michael Sambol', desc: 'Every sorting algorithm explained clearly with animations.', url: 'https://www.youtube.com/watch?v=kPRA0W1kECg' },
            { icon: '🌲', title: 'Trees & Graphs', channel: 'Back To Back SWE', desc: 'Complete guide to trees, heaps and graph algorithms.', url: 'https://www.youtube.com/watch?v=oSWTXtMglKE' },
            { icon: '💡', title: 'Dynamic Programming Masterclass', channel: 'NeetCode', desc: 'DP patterns with LeetCode problems — interview ready.', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk' },
        ],
        'System Design': [
            { icon: '🏗️', title: 'System Design Full Course', channel: 'Gaurav Sen', desc: 'Learn how to design scalable systems — used by top engineers.', url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0' },
            { icon: '🔌', title: 'Designing REST APIs', channel: 'Hussein Nasser', desc: 'Build robust, scalable, secure REST APIs from scratch.', url: 'https://www.youtube.com/watch?v=7nm1dYdmKKs' },
            { icon: '⚡', title: 'Database Design & SQL', channel: 'Caleb Curry', desc: 'SQL and database design patterns for real-world applications.', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
            { icon: '📦', title: 'Microservices Architecture', channel: 'GOTO Conferences', desc: 'Patterns and pitfalls of microservices — real engineer talks.', url: 'https://www.youtube.com/watch?v=rv4LlmLmVWk' },
        ],
    };
    const domains = Object.keys(courses);
    res.json({ courses, domains });
});

// Route catch-all to redirect to API health
app.get('*', (req, res) => {
    res.send('CareerSprout API Backend is successfully running on Railway!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend Server running on port ${PORT}`));
