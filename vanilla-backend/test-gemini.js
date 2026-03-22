const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function test() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        console.log("Checking api key presence:", !!process.env.GEMINI_API_KEY);
        
        const prompt = "Please summarize this test message: Hello world.";
        console.log("Sending to Gemini...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        console.log("Response:", response.text);
    } catch (e) {
        console.error("Test Error:", e);
    }
}
test();
