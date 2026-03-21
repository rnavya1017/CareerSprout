const fs = require('fs');
let js = fs.readFileSync('vanilla-frontend/script.js', 'utf8');

// Replace global API with blank local origin
js = js.replace(/const API = '.*';/g, "const API = '';");

// Hardcode full URLs where required
js = js.replace(/\$\{API\}\/api\/auth/g, 'http://localhost:5000/api/auth');
js = js.replace(/\$\{API\}\/api\/jobs/g, 'http://localhost:5000/api/jobs');
js = js.replace(/\$\{API\}\/api\/ats/g, 'https://job-nexus-production.up.railway.app/api/ats');
js = js.replace(/\$\{API\}\/api\/resume/g, 'https://job-nexus-production.up.railway.app/api/resume');
js = js.replace(/\$\{API\}\/api\/linkedin/g, 'https://job-nexus-production.up.railway.app/api/linkedin');

fs.writeFileSync('vanilla-frontend/script.js', js);
console.log('Endpoints re-routed successfully.');
