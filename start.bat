@echo off
echo Starting CareerSprout Application...

start cmd /k "cd frontend && npm run dev"
start cmd /k "cd backend && mvnw spring-boot:run"

echo Development servers are starting...
