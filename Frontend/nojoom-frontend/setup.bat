@echo off
echo.
echo ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
echo  NOJOOM Frontend Setup
echo ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
echo.

REM Install dependencies
echo [1/2] Installing dependencies...
call npm install

REM Create .env.local if it doesn't exist
if not exist .env.local (
  echo NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql > .env.local
  echo [2/2] Created .env.local
) else (
  echo [2/2] .env.local already exists
)

echo.
echo ✓ Setup complete!
echo.
echo Next steps:
echo   1. Start dev server: npm run dev
echo   2. Open browser: http://localhost:3000
echo.
echo For more details, read SETUP_GUIDE.md
echo.
pause
