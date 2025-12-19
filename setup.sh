#!/bin/bash

# ByteRizz Setup Script for Linux/Mac

echo "ByteRizz Setup Script"
echo "====================="
echo ""

# Check if Node.js is installed
echo "Checking for Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "Node.js found: $NODE_VERSION"
else
    echo "Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
echo "Checking for npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "npm found: $NPM_VERSION"
else
    echo "npm is not installed!"
    exit 1
fi

echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies!"
    exit 1
fi
echo "Frontend dependencies installed successfully!"

echo ""
echo "Installing backend dependencies..."
cd ../backend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies!"
    exit 1
fi
echo "Backend dependencies installed successfully!"

cd ..

echo ""
echo "Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Add your Gemini API key to backend/.env"
echo "2. Run 'npm run dev' in the backend directory"
echo "3. Run 'npm run dev' in the frontend directory"
echo "4. Open http://localhost:3000 in your browser"



