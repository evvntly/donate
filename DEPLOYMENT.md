# Evvntly Donation Portal - Deployment Guide

## Overview
The donation portal is a static Next.js site that calls the Fenix API for Stripe payment processing.

## Prerequisites
- Node.js 18+ installed
- Stripe account with API keys configured in Fenix
- Netlify account (or similar static hosting)

## Local Development

1. **Install dependencies:**
```bash
cd /Users/johnnybell/code/donate
npm install
```

2. **Environment Setup:**
   - Copy `.env.local.example` to `.env.local`
   - The default config points to `http://localhost:3000/api` (Fenix)
   - Make sure Fenix is running on port 3000

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
   - Visit http://localhost:7484

## Production Deployment

### Option 1: Netlify (Recommended)

1. **Connect to Git:**
   - Push the donate folder to a Git repository
   - Connect the repository to Netlify

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 18 or higher

3. **Environment Variables:**
   Add these in Netlify dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://evvntly.com/api
   NEXT_PUBLIC_DONATE_URL=https://donate.evvntly.com
   NEXT_PUBLIC_APP_URL=https://donate.evvntly.com
   ```

4. **Custom Domain:**
   - Add `donate.evvntly.com` as custom domain in Netlify
   - Configure DNS: Add CNAME record pointing to Netlify

### Option 2: Vercel

1. **Connect to Git:**
   - Push to GitHub/GitLab/Bitbucket
   - Import project in Vercel

2. **Build Settings:**
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `out`

3. **Environment Variables:**
   Same as Netlify (see above)

4. **Custom Domain:**
   - Add `donate.evvntly.com` in Vercel dashboard
   - Configure DNS as instructed

### Option 3: Static Hosting (Cloudflare Pages, AWS S3, etc.)

1. **Build locally:**
```bash
npm run build
```

2. **Deploy the `out` folder:**
   - Upload the entire `out` directory to your static host
   - Configure redirects (see `netlify.toml` for reference)

## Fenix API Setup

The donation portal requires the `create-donation-session` API endpoint in Fenix:

**File:** `/Users/johnnybell/code/fenix/src/pages/api/create-donation-session.js`

**Environment Variables Required in Fenix:**
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_DONATE_URL=https://donate.evvntly.com
```

## Testing

### Test Locally:
1. Start Fenix: `cd /Users/johnnybell/code/fenix && npm run dev`
2. Start Donate: `cd /Users/johnnybell/code/donate && npm run dev`
3. Visit http://localhost:7484
4. Test donation flow with Stripe test cards

### Test Production:
1. Use Stripe test mode keys initially
2. Test card: 4242 4242 4242 4242
3. Any future expiry date and CVC
4. Verify success page redirect
5. Check Stripe dashboard for payment

## Domain Setup

### DNS Configuration:
```
Type: CNAME
Name: donate
Value: [your-netlify-subdomain].netlify.app
TTL: Auto
```

### SSL Certificate:
- Netlify/Vercel provide free SSL automatically
- Certificate will be provisioned when domain is verified

## Monitoring

- Check Netlify/Vercel deployment logs for build errors
- Monitor Stripe dashboard for donation transactions
- Set up error tracking (Sentry, LogRocket, etc.) if needed

## Troubleshooting

**Build fails:**
- Check Node version (must be 18+)
- Verify all dependencies installed: `npm install`
- Check environment variables are set

**API calls fail:**
- Verify NEXT_PUBLIC_API_URL points to correct Fenix URL
- Check Fenix server is running and accessible
- Verify Stripe keys are configured in Fenix

**Redirect issues:**
- Check success_url and cancel_url in API endpoint
- Verify NEXT_PUBLIC_DONATE_URL matches deployed URL

## Security Notes

- All payment processing happens via Stripe
- No sensitive data stored in this application
- API calls to Fenix only send donation amounts
- Stripe handles PCI compliance

## Support

For issues or questions, contact the development team.
