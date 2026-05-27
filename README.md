# Shane Brown × PowerWyze Investor Kiosk

A premium in-meeting tablet experience for Shane Brown, built for a 390×844 portrait display.

## Local Development

```bash
cd public
python3 -m http.server 4072
```

## Deployment

Deploy to Vercel with serverless functions:

```bash
vercel deploy --prod --yes --force
```

Required Vercel environment variables:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `ELEVENLABS_API_KEY` (optional, for voice agent)
