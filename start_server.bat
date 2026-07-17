@echo off
cd /d "%~dp0study-planner"
echo Starting Next.js development server...
echo The app will be available at http://localhost:3000
start http://localhost:3000
npm run dev
