#!/usr/bin/env node
// Simple env verifier for CI / production builds (Netlify, Vercel, etc.)
const required = ['NEXT_PUBLIC_SITE_URL', 'TMDB_READ_TOKEN']

const missing = required.filter((k) => !process.env[k])

if (missing.length) {
  console.error(`\nMissing required environment variables: ${missing.join(', ')}\n`)
  console.error('Set them in your environment or add them in your platform build settings (Netlify site settings -> Build & deploy -> Environment).')
  process.exit(1)
}

console.log('All required environment variables are present.')
