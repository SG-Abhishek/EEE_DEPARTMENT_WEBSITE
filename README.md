This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

///////
For devs:
This site is built with Next.js (App Router) and React. It is designed to be easily updatable without touching the core UI code.

How to Update Content
All changing text, links, and profiles are stored in the /data folder as JSON files.

To add a new teacher: Open data/faculty.json and append a new object with their name, role, and image path.

To update the syllabus: Open data/syllabus.json and add the new PDF links.

To change quick links: Open data/home.json.

Note: JSON syntax is strict. Ensure you use double quotes and do not leave trailing commas. If the site breaks after an edit, run the JSON through a validator or an AI assistant like GitHub Copilot to catch the typo.

Local Development
Run npm install to grab dependencies.

Run npm run dev to start the local server at localhost:3000.

Global styles are located in src/app/globals.css.