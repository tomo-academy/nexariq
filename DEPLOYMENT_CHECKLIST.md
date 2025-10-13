# NEXARIQ - Vercel Deployment Checklist ✅

## Pre-Deployment

- [x] Code pushed to GitHub repository: `tomo-academy/nexariq`
- [x] All Vercel AI Gateway dependencies removed
- [x] Direct xAI integration configured
- [x] NEXARIQ branding applied
- [x] AI Gateway error handling removed
- [x] Service name updated to "nexariq"
- [x] Deployment documentation created

## Vercel Setup

### 1. Import Project to Vercel
- [ ] Go to https://vercel.com/new
- [ ] Import repository: `tomo-academy/nexariq`
- [ ] Framework: Next.js (auto-detected)
- [ ] Root Directory: `./`

### 2. Configure Environment Variables

**Required Variables:**
- [ ] `XAI_API_KEY` - Get from https://console.x.ai/
- [ ] `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- [ ] `POSTGRES_URL` - Database connection string

**Optional Variables:**
- [ ] `BLOB_READ_WRITE_TOKEN` - For file uploads
- [ ] `REDIS_URL` - For caching

### 3. Database Setup
- [ ] Create PostgreSQL database (Neon/Supabase/Vercel Postgres)
- [ ] Copy connection string
- [ ] Add to Vercel environment variables
- [ ] Migrations will run automatically on build

### 4. xAI API Setup
- [ ] Create account at https://console.x.ai/
- [ ] Generate API key
- [ ] Add to Vercel environment variables
- [ ] Verify key has sufficient credits

## Deployment

### First Deployment
- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check deployment logs for errors
- [ ] Verify deployment URL works

### Post-Deployment Testing
- [ ] Visit deployment URL
- [ ] Test authentication (sign up/login)
- [ ] Create a new chat
- [ ] Send a message (test xAI integration)
- [ ] Test different Grok models
- [ ] Upload a file (if Blob storage configured)
- [ ] Check chat history persistence

## Configuration Verification

### Environment Variables Check
```bash
# Pull environment variables locally
vercel env pull .env.local

# Verify all required variables are present
cat .env.local
```

### Build Configuration
- [x] Build command: `tsx lib/db/migrate && next build`
- [x] Output directory: `.next`
- [x] Install command: `pnpm install`
- [x] Node version: 18.x or higher

### Database Migration
- [x] Migrations run automatically during build
- [ ] Verify tables created in database
- [ ] Check database connection in production

## Monitoring & Analytics

- [ ] Enable Vercel Analytics
- [ ] Check OpenTelemetry traces
- [ ] Monitor function execution times
- [ ] Set up error alerts

## Optional Enhancements

- [ ] Configure custom domain
- [ ] Set up staging environment
- [ ] Enable preview deployments
- [ ] Configure deployment protection
- [ ] Set up team access

## Troubleshooting

### Common Issues

**Build fails with module errors:**
- Ensure `pnpm install` completes successfully
- Check package.json dependencies

**Database connection fails:**
- Verify POSTGRES_URL format
- Check database is accessible from Vercel
- Ensure SSL mode is enabled

**xAI API errors:**
- Verify XAI_API_KEY is correct
- Check API key has credits
- Monitor rate limits

**Runtime errors:**
- Check Vercel function logs
- Verify all environment variables are set
- Test locally with production env vars

## Success Criteria

- [ ] Application builds without errors
- [ ] All environment variables configured
- [ ] Database connected and migrations run
- [ ] xAI API integration working
- [ ] Authentication functional
- [ ] Chat creation and messaging works
- [ ] File uploads work (if configured)
- [ ] No console errors in production

## Resources

- **Repository**: https://github.com/tomo-academy/nexariq
- **Deployment Guide**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- **Setup Guide**: [SETUP.md](SETUP.md)
- **Vercel Dashboard**: https://vercel.com/dashboard
- **xAI Console**: https://console.x.ai/

## Quick Deploy Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Check deployment status
vercel ls
```

---

## Deployment Status

- **Repository**: ✅ Pushed to GitHub
- **Configuration**: ✅ Ready for Vercel
- **Documentation**: ✅ Complete
- **Next Step**: Import to Vercel and configure environment variables

**Ready to deploy! 🚀**

Visit https://vercel.com/new/clone?repository-url=https://github.com/tomo-academy/nexariq to start deployment.
