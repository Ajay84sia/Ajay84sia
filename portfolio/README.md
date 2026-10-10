# Ajay Portfolio
Next.js 14 + Tailwind + Framer Motion + AOS + next-themes. All content lives in `data/portfolio.json`.
npm install && npm run dev   # http://localhost:3000

## Project images
Put screenshots in `public/projects/` and set `"image": "/projects/name.png"` per project in `data/portfolio.json`. A gradient placeholder shows when a file is missing.

## EmailJS contact form
1. Create a free account at emailjs.com, add an Email Service, and create a Template.
2. Template variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`. Set "Reply-To" to `{{from_email}}`.
3. Copy `.env.example` to `.env.local` and fill in Service ID, Template ID and Public Key. Restart `npm run dev`.
