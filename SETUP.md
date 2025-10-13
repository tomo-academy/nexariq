# NEXARIQ Setup Guide

## Overview
NEXARIQ has been configured to use xAI models directly via API key authentication, removing the dependency on Vercel AI Gateway.

## Changes Made

### 1. AI Provider Configuration
- **File**: `lib/ai/providers.ts`
- Replaced Vercel AI Gateway with direct xAI integration
- Added support for multiple Grok models:
  - `grok-4` (default)
  - `grok-2-1212`
  - `grok-3`
  - `grok-3-fast`
  - `grok-3-mini`
  - `grok-3-mini-fast`

### 2. Dependencies
- **File**: `package.json`
- Removed: `@ai-sdk/gateway`
- Kept: `@ai-sdk/xai` for direct xAI integration
- Updated package name to `nexariq`

### 3. Environment Variables
- **File**: `.env.example`
- Removed: `AI_GATEWAY_API_KEY`
- Added: `XAI_API_KEY` - Get from https://console.x.ai/

### 4. Error Handling
- **Files**: `lib/errors.ts`, `app/(chat)/api/chat/route.ts`
- Removed AI Gateway credit card activation error handling
- Removed `activate_gateway` surface type

### 5. Branding
- **Files**: `README.md`, `components/chat-header.tsx`, `components/icons.tsx`
- Replaced Vercel branding with NEXARIQ
- Added `NexariqIcon` component
- Updated header to display "NEXARIQ" instead of "Deploy with Vercel" button

## Setup Instructions

### 1. Install Dependencies
```bash
cd e:\nexarriq-\nexariq
pnpm install
```

### 2. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your credentials:
# - XAI_API_KEY=your_xai_api_key_here
# - AUTH_SECRET=your_auth_secret
# - POSTGRES_URL=your_database_url
# - BLOB_READ_WRITE_TOKEN=your_blob_token (optional)
# - REDIS_URL=your_redis_url (optional)
```

### 3. Run Database Migrations
```bash
pnpm db:migrate
```

### 4. Start Development Server
```bash
pnpm dev
```

The application will be available at http://localhost:3000

## API Key Setup

### Get xAI API Key
1. Visit https://console.x.ai/
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

## Available Models

The following xAI models are configured and ready to use:

| Model ID | Description |
|----------|-------------|
| `grok-4` | Latest Grok 4 model (default) |
| `grok-2-1212` | Grok 2 (December 2024) |
| `grok-3` | Latest Grok 3 model |
| `grok-3-fast` | Fast variant of Grok 3 |
| `grok-3-mini` | Compact Grok 3 model |
| `grok-3-mini-fast` | Fast compact variant |

## Notes

- All TypeScript lint errors related to missing modules will resolve after running `pnpm install`
- The logo file is located at `public/images/nexa.jpg`
- Favicon can be updated at `app/favicon.ico`
- The application uses the same database schema as the original template

## Troubleshooting

### Module not found errors
Run `pnpm install` to install all dependencies.

### Database connection errors
Ensure your `POSTGRES_URL` is correctly set in `.env.local`.

### xAI API errors
- Verify your `XAI_API_KEY` is valid
- Check your xAI account has sufficient credits
- Ensure the API key has the necessary permissions

## Next Steps

1. Install dependencies: `pnpm install`
2. Set up environment variables
3. Run migrations: `pnpm db:migrate`
4. Start the dev server: `pnpm dev`
5. Test the application with different Grok models
