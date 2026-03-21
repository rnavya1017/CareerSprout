const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'temp.html');
const cssPath = path.join(__dirname, 'temp_style.css');
const jsPath = path.join(__dirname, 'app.js');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// Global replaces
html = html.replace(/CareerConnect/g, 'CareerSprout');
html = html.replace(/"The best time to plant a tree was 20 years ago\. The second best time is now\."/g, '"Life takes care of one , those who takes care of life"');
html = html.replace(/<div class="author-chips">[\s\S]*?<\/div>/g, '<div class="author-chips"><div class="author-chip"><div class="author-info"><span class="author-name">MD Shahzad</span></div></div></div>'); // simplifying authors
// Update script link from app.js to script.js since I will overwrite script.js
html = html.replace(/app\.js/g, 'script.js');

// In JS, check for fetch to modify
js = js.replace(/CareerConnect/g, 'CareerSprout');
// The user has a backend fetching jobs on /api/jobs at localhost:5000 right now.
// Let's swap the railway API fetching for their local backend:
js = js.replace(/https:\/\/api\.adzuna\.com\/v1\/api\/jobs/g, 'http://localhost:5000/api/jobs');
// Actually, it might be fetching via their own backend? Let's just point all `/api/...` to `http://localhost:5000/api/...` if it's hitting relative paths.
// Let's just inject the auth logic. The user base might already have an auth modal inside the base HTML! (It does: `<div id="authModal">`). 
// So I don't need to block it using my alert if it's integrated natively. I'll just save it as is.

fs.writeFileSync(path.join(__dirname, 'vanilla-frontend', 'index.html'), html);
fs.writeFileSync(path.join(__dirname, 'vanilla-frontend', 'style.css'), css);
fs.writeFileSync(path.join(__dirname, 'vanilla-frontend', 'script.js'), js);

console.log('Conversion Complete.');
