# Evvntly Donation Portal

A Next.js donation portal with Stripe integration.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:7484
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:7484](http://localhost:7484)

## Build

```bash
npm run build
```

## Deploy

The site is configured for static export and can be deployed to Netlify, Vercel, or any static hosting.
