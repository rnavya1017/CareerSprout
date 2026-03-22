const fs = require('fs');
const path = require('path');

async function testUpload() {
    // Create a dummy text file
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    
    let content = `--${boundary}\r\n`;
    content += `Content-Disposition: form-data; name="document"; filename="test.txt"\r\n`;
    content += `Content-Type: text/plain\r\n\r\n`;
    content += `Hello world, this is a test document to summarize.\r\n`;
    content += `--${boundary}--`;

    console.log("Sending request to http://localhost:5000/api/summarize");

    try {
        // Need to bypass auth? Or let's create a user and get a token.
        // For testing, let's just create a token or bypass it.
        const usersFile = require('./users.json');
        const token = usersFile.length > 0 ? usersFile[0].id : '';
        console.log("Using token:", token);

        const res = await fetch("http://localhost:5000/api/summarize", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": `multipart/form-data; boundary=${boundary}`
            },
            body: content
        });
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Response:", text);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testUpload();
