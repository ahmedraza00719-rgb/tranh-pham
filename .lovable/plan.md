## Goal

Make this one-page Vietnamese F&B site deployable to Netlify as a plain static site, with a working Netlify Forms contact form.

## What you'll do in Netlify after the changes

- **Build command:** `bun run build` (or `npm run build`)
- **Publish directory:** `dist`
- **Node version:** 20

Form submissions will appear under **Forms** in your Netlify site dashboard. You can enable email notifications from there.

---

## Changes to the project

### 1. Replace the Vite config (TanStack Start → plain React SPA)

`vite.config.ts` currently uses `@lovable.dev/vite-tanstack-config` (TanStack Start + Cloudflare Worker target). Replace with a standard Vite + React config:

- `@vitejs/plugin-react` (already in devDependencies)
- `@tailwindcss/vite` (already installed) for Tailwind v4
- `vite-tsconfig-paths` (already installed) for the `@/` alias
- Output: `dist/` (Vite default)

### 2. Add SPA bootstrap files

- `index.html` at the project root with `<title>`, meta tags, Google Fonts links, OG/Twitter image (copy what's currently in `__root.tsx` head), and `<div id="root">`.
- `src/main.tsx` that imports `./styles.css` and mounts `<App />` into `#root`.

### 3. Move the page content into `src/App.tsx`

- Copy the JSX body of `Index()` from `src/routes/index.tsx` into a new `src/App.tsx` component.
- All asset imports (`hero.jpg`, product images), shadcn UI imports, sonner Toaster, Google Map iframe, smooth-scroll nav, phone `0433 44114`, etc. stay identical.
- Remove the `createFileRoute` wrapper — it's just a plain component now.

### 4. Convert the contact form to a Netlify Form

In the `<form>` element:
- Add `name="contact"`, `method="POST"`, `data-netlify="true"`, `data-netlify-honeypot="bot-field"`.
- Add a hidden `<input type="hidden" name="form-name" value="contact" />`.
- Add a hidden honeypot `<input name="bot-field" />` (visually hidden).
- Give each field a `name` attribute matching the form (`name`, `email`, `message`).
- On submit: `fetch("/", { method: "POST", headers: {...}, body: encoded form data })`, then show the existing sonner toast on success.
- Keep the existing zod validation client-side before submitting.
- Add a static copy of the form to `index.html` (hidden) so Netlify's build-time form detector registers it. This is a standard Netlify Forms requirement for SPAs.

### 5. Delete TanStack-specific files

- `src/router.tsx`
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routeTree.gen.ts` (auto-generated, no longer needed)
- The empty `src/routes/` folder

### 6. Add Netlify config files

- `netlify.toml` at project root:
  ```toml
  [build]
    command = "bun run build"
    publish = "dist"
  ```
- `public/_redirects` with `/*  /index.html  200` (SPA fallback — harmless for a one-pager, future-proof).

### 7. Clean `package.json` (optional but tidy)

Remove now-unused deps: `@cloudflare/vite-plugin`, `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, `@lovable.dev/vite-tanstack-config`. The build will work either way; removing keeps `node_modules` lean.

---

## What stays exactly the same

- All visuals: hero image, products grid, story, what-we-do, contact, map.
- Phone `0433 44114`, address, Google Maps iframe.
- Tailwind v4 styling and `src/styles.css` design tokens.
- shadcn UI components (Button, Input, Textarea, Sonner).
- The Lovable preview keeps working — Vite dev server just serves the SPA instead of TanStack Start.

## Trade-offs you should know about

- **You lose SSR.** Fine here — there's no dynamic server data, and SEO for a one-pager works great with static `<title>`/meta in `index.html`.
- **The Lovable `Publish` button + `tranh-pham-llc.lovable.app` will still work**, but as a static SPA rather than a TanStack Start app. No user-visible difference.
- **Future routes** would need to be added as React components + entries in `_redirects`, not as TanStack route files.

---

Approve this and I'll switch to build mode and make all the changes in one pass.