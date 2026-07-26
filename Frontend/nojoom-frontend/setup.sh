#!/bin/bash

echo "🎨 NOJOOM Frontend Setup"
echo "========================"

# Navigate to project
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo "NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql" > .env.local
  echo "✅ Created .env.local"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Start dev server: npm run dev"
echo "  2. Open browser: http://localhost:3000"
echo ""
echo "📚 Read SETUP_GUIDE.md for more details"
