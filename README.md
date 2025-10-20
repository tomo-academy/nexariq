<h1 align="center">NEXARIQ</h1>

<p align="center">
    NEXARIQ is a powerful AI chatbot application built with Next.js and the AI SDK, powered by xAI's Grok models.
</p>


<p align="center">
  <a href="https://chat-sdk.dev"><strong>Read Docs</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports xAI (default), OpenAI, Fireworks, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication

## Model Providers

NEXARIQ uses [xAI](https://x.ai) models directly through the AI SDK. The following models are available:

- **grok-4** (default) - Latest Grok 4 model
- **grok-2-1212** - Grok 2 (December 2024)
- **grok-3** - Latest Grok 3 model
- **grok-3-fast** - Fast variant of Grok 3
- **grok-3-mini** - Compact Grok 3 model
- **grok-3-mini-fast** - Fast compact variant

### Authentication

You need to provide an xAI API key by setting the `XAI_API_KEY` environment variable in your `.env.local` file. Get your API key from [https://console.x.ai/](https://console.x.ai/).

## Deploy Your Own

You can deploy NEXARIQ to Vercel:

1. Fork or clone this repository
2. Import to Vercel from https://vercel.com/new
3. Configure environment variables (see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md))
4. Deploy!

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run NEXARIQ. Create a `.env.local` file with the required variables.

> Note: You should not commit your `.env.local` file or it will expose secrets that will allow others to control access to your AI and authentication provider accounts.

1. Copy `.env.example` to `.env.local`
2. Add your xAI API key: `XAI_API_KEY=your_api_key_here`
3. Configure other required environment variables (database, auth, etc.)

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000).
