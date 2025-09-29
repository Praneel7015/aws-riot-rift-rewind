# Gaming Hub Landing Page

An animated, gaming-themed personal landing page built with the Next.js Pages Router. It features neon-inspired visual effects, a featured game library, and an about page—all statically generated for fast loads.

## Features
- **Immersive visuals** – CRT overlays, scanlines, and a particle network background powered by reusable React hooks.
- **Featured game showcase** – Steam header art rendered with `next/image`, ready for quick curation.
- **Quick navigation hub** – Prominent profile links, social icons, and a dedicated about page.
- **Static generation by default** – Home (`/`) and About (`/about`) routes pre-rendered on build.
- **Optional Umami analytics** – Drop in environment variables to enable privacy-friendly tracking.

## Getting started
1. **Prerequisites**
   - Node.js ≥ 18
   - A package manager (examples below use `pnpm`, adapt for `npm` or `yarn` if you prefer)
2. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/landing-page.git
   cd landing-page
   ```
3. **Install dependencies**
   ```bash
   pnpm install
   ```
4. **Start the dev server**
   ```bash
   pnpm run dev
   ```
5. Visit [http://localhost:3000](http://localhost:3000) to explore the site.

### Available scripts
| Script | Description |
| --- | --- |
| `pnpm run dev` | Start the Next.js development server with hot reloading. |
| `pnpm run build` | Create an optimized production build. |
| `pnpm start` | Launch the production server after building. |


## Customization guide
- **Avatar & metadata** – Update `avatarSrc`, `name`, and `siteTitle` in `components/layout.js`.
- **Hero copy & social links** – Edit the introductory text and link buttons in `pages/index.js`.
- **Featured games** – Modify the `FEATURED_GAMES` array in `pages/index.js` with your own titles and Steam app IDs (or swap in other assets).
- **About content** – Adjust the sections inside `pages/about.js` to reflect your story.
- **Visual effects** – Tweak color variables in `styles/global.css` and the animations in `styles/effects.module.css`.
- **Particle settings** – Pass custom options to `<ParticleField />` or adjust defaults in `hooks/useParticleNetwork.js`.


## Deployment
1. Build the project locally with `pnpm run build`.
2. Deploy the `.next` output using any Node-friendly host, or import the repository into [Vercel](https://vercel.com/) for zero-config deployments.
3. If self-hosting, run `pnpm start` on your server behind a reverse proxy.

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.

Inspired by the official [Next.js Pages Router tutorial](https://nextjs.org/learn) and customized for a gaming aestheeic.