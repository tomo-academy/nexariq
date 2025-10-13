# NEXARIQ - Vercel Deployment Guide

## Prerequisites
- GitHub account with access to https://github.com/tomo-academy/nexariq
- Vercel account (sign up at https://vercel.com)
- xAI API key from https://console.x.ai/
- PostgreSQL database (recommended: Neon, Supabase, or Vercel Postgres)
- (Optional) Vercel Blob storage for file uploads
- (Optional) Redis for caching

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to https://vercel.com/new
   - Import the repository: `tomo-academy/nexariq`
   - Select the repository and click "Import"

2. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `pnpm build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Environment Variables**
   Add the following environment variables in Vercel:

   **Required:**
   ```
   XAI_API_KEY=your_xai_api_key_here
   AUTH_SECRET=your_random_secret_here
   POSTGRES_URL=your_postgres_connection_string
   ```

   **Optional:**
   ```
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   REDIS_URL=your_redis_connection_string
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd e:\nexarriq-\nexariq

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account/team
# - Link to existing project? No (first time) or Yes (subsequent)
# - What's your project's name? nexariq
# - In which directory is your code located? ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

## Environment Variables Setup

### 1. AUTH_SECRET
Generate a secure random string:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

### 2. XAI_API_KEY
1. Visit https://console.x.ai/
2. Sign in or create an account
3. Go to API Keys section
4. Create a new API key
5. Copy and save it securely

### 3. POSTGRES_URL
Choose one of these providers:

**Neon (Recommended):**
1. Visit https://neon.tech/
2. Create a new project
3. Copy the connection string
4. Format: `postgresql://user:password@host/database?sslmode=require`

**Vercel Postgres:**
1. In Vercel Dashboard, go to Storage
2. Create a new Postgres database
3. Connect it to your project
4. Connection string is auto-added

**Supabase:**
1. Visit https://supabase.com/
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string (URI format)

### 4. BLOB_READ_WRITE_TOKEN (Optional)
For file upload functionality:
1. In Vercel Dashboard, go to Storage
2. Create a new Blob store
3. Connect it to your project
4. Token is auto-added

### 5. REDIS_URL (Optional)
For caching:
1. Use Upstash Redis (https://upstash.com/)
2. Create a new Redis database
3. Copy the connection string

## Post-Deployment Configuration

### 1. Set Environment Variables in Vercel
```bash
# Via CLI
vercel env add XAI_API_KEY
vercel env add AUTH_SECRET
vercel env add POSTGRES_URL

# Or via Dashboard:
# Project Settings > Environment Variables > Add
```

### 2. Run Database Migrations
After first deployment, run migrations:
```bash
# Option A: Via Vercel CLI
vercel env pull .env.local
pnpm db:migrate

# Option B: Add to build command in vercel.json
# (Already configured in package.json build script)
```

### 3. Configure Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Vercel-Specific Configurations

### Build Settings
The project is configured with:
- **Build Command**: `tsx lib/db/migrate && next build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Development Command**: `pnpm dev`

### Next.js Configuration
File: `next.config.ts`
- Partial Prerendering (PPR) enabled
- Image optimization configured
- Vercel Analytics ready

### Instrumentation
File: `instrumentation.ts`
- OpenTelemetry configured for Vercel
- Service name: "nexariq"

## Troubleshooting

### Build Errors

**Error: Cannot find module '@ai-sdk/xai'**
- Solution: Ensure `pnpm install` runs successfully
- Check `package.json` has correct dependencies

**Error: Database connection failed**
- Solution: Verify `POSTGRES_URL` is correct
- Ensure database is accessible from Vercel
- Check SSL mode is enabled

**Error: XAI_API_KEY not found**
- Solution: Add environment variable in Vercel Dashboard
- Redeploy after adding variables

### Runtime Errors

**Error: Invalid API key**
- Solution: Verify xAI API key is valid
- Check key has necessary permissions
- Ensure key is not expired

**Error: Database query failed**
- Solution: Run migrations: `pnpm db:migrate`
- Check database schema is up to date

### Performance Issues

**Slow response times**
- Enable Redis caching
- Check xAI API rate limits
- Monitor Vercel Analytics

## Monitoring & Analytics

### Vercel Analytics
Already integrated via `@vercel/analytics` package.
View analytics in Vercel Dashboard > Analytics.

### OpenTelemetry
Configured via `@vercel/otel` for distributed tracing.
View traces in Vercel Dashboard > Observability.

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Rotate secrets regularly** - Especially `AUTH_SECRET`
3. **Use environment variables** - Never hardcode API keys
4. **Enable HTTPS** - Automatic on Vercel
5. **Monitor API usage** - Check xAI console regularly

## Scaling Considerations

### Vercel Limits (Hobby Plan)
- 100 GB bandwidth/month
- 100 hours serverless function execution
- 6,000 minutes build time

### Upgrade to Pro if needed:
- Unlimited bandwidth
- 1,000 hours serverless function execution
- Team collaboration features

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **xAI Docs**: https://docs.x.ai/
- **GitHub Issues**: https://github.com/tomo-academy/nexariq/issues

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] Database created and connected
- [ ] xAI API key added
- [ ] First deployment successful
- [ ] Database migrations run
- [ ] Application tested in production
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Monitoring set up

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add VARIABLE_NAME

# View deployment logs
vercel logs

# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback
```

---

**Your NEXARIQ deployment is ready! 🚀**

Visit your deployment at: `https://your-project.vercel.app`
