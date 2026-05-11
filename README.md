# LuaGen – Free Lua Generator for Steam Games

LuaGen is a **free and ad-free Lua file generator** for Steam games. By entering a Steam Game ID, you can instantly generate and download verified Lua archives for thousands of popular games.

---

## 🚀 Why LuaGen?

- **⚡ Instant Downloads** – No waiting, files are ready in seconds.
- **🎮 Huge Collection** – Access to **100,000+ verified Lua archives**.
- **🛡️ Safe & Verified** – All files are scanned and community-tested.
- **📂 Triple Backup System** – Primary API → GitHub backup → Community fallback for maximum availability.
- **🌐 Fast Delivery** – Hosted on **Cloudflare Pages + optimized CDN storage** for ultra-fast response times.
- **🔧 SSR-Powered** – Built with Astro for server-side rendering and optimal performance.

---

## 🔧 How It Works

1. Enter a valid **Steam Game ID**.
2. LuaGen checks our **primary API server** (`api.luagen.revobd.club`) to see if a `.zip` archive exists.
3. If found → instant download.
4. If not found → fallback to **GitHub backup** (SteamAutoCracks/ManifestHub).
5. If still not found → fallback to **community backup server[CLOSED]**.
6. Done! 🎉

This triple-fallback architecture makes LuaGen **fast, lightweight, and extremely reliable**.

---

## 📦 Installation Guide

1. **Download & Extract** – Right-click the downloaded `.zip` and extract it.
2. **Install Steam Tools** – Download [Steam Tools](https://www.steamtools.net/) and install.
3. **Drag & Drop Files** – Select all extracted Lua files and drag them onto the Steam Tools icon.
4. **Restart Steam** – Restart Steam fully to apply changes.

⚠️ Always **backup original files** before applying modifications.

---

## 🎯 Additional Tools

### DEPO-TOOL
Need more than just Lua files? Check out [DEPO-TOOL](https://depotool.pages.dev/) for:
- **Download DLCs** – Access additional game content and expansions
- **Unlock Achievements** – Manage and unlock game achievements
- **Bypass Ubisoft & Other Auths** – Bypass authentication requirements

---

## ❓ FAQ

**Q: How do I find my Game's Steam ID?**  
👉 Visit the game's Steam store page – the number in the URL is your Game ID. Or use [steamdb.info](https://steamdb.info).

**Q: Are these files safe?**  
👉 Yes. All Lua files are scanned, verified, and widely used by the community.

**Q: Why is LuaGen so fast compared to other tools?**  
👉 LuaGen is powered by:
- **Cloudflare CDN** for global caching and instant delivery.
- **Pre-compiled `.zip` archives** (no server-side building).
- **Direct file mapping by Game ID** (no database lookup needed).
- **Astro SSR** for optimized server-side rendering and API routes.

**Q: How do you manage 100,000+ files?**  
👉 Files are stored as **flat static `.zip` archives**, served via CDN. This avoids complex databases and ensures minimal overhead. Cloudflare handles global caching, making even large collections extremely fast to access.

**Q: What if a file isn't found on any server?**  
👉 Our triple-fallback system checks three different sources. If still not found, email us at [contact@revobd.club](mailto:contact@revobd.club) and we'll add it to our collection.

---

## 📊 Technical Details

### Tech Stack
- **Framework:** Astro 5.0 with SSR (Server-Side Rendering)
- **UI Library:** React 18
- **Styling:** Tailwind CSS + shadcn/ui components
- **Language:** TypeScript
- **Hosting:** Cloudflare Pages (static + SSR deployment)
- **File Storage:** Multi-CDN architecture with automatic fallbacks

### Architecture
- **Frontend:** React components with Astro islands for optimal performance
- **Backend:** Astro API routes for server-side file checking (bypasses CORS)
- **File Delivery:** 
  - Primary: `api.luagen.revobd.club`
  - Backup 1: GitHub (SteamAutoCracks/ManifestHub)
  - Backup 2: Community backup server
- **SEO:** Full meta tags, Open Graph, Twitter Cards, JSON-LD schema, sitemap

### Key Features
- Server-side file availability checking (no CORS issues)
- Automatic fallback system across 3 servers
- Optimized for Core Web Vitals
- Mobile-responsive design
- Dark mode support via next-themes

---

## 🛠️ Development

### Prerequisites
- Node.js 18+ or Bun
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/HasibulHasan098/Luagen.git
cd Luagen

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
/
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── components/      # React components
│   │   ├── pages/       # Page components (IndexPage, NotFoundPage)
│   │   └── ui/          # shadcn/ui components
│   ├── layouts/         # Astro layouts with SEO
│   ├── pages/           # Astro pages (file-based routing)
│   │   ├── api/         # API routes (check-lua.ts)
│   │   ├── index.astro  # Home page
│   │   ├── 404.astro    # 404 page
│   │   └── sitemap.xml.ts # Dynamic sitemap
│   ├── lib/             # Utility functions
│   └── index.css        # Global styles
├── astro.config.mjs     # Astro configuration
└── package.json
```

## 📧 Support

For missing files, requests, or issues:  
**Email:** [contact@revobd.club](mailto:contact@revobd.club)

---

## 📝 License

This project is open source and available for personal use.

---

⭐ If you find LuaGen useful, consider giving this repo a **star** on GitHub!

---

## 🙏 Credits

- Built with [Astro](https://astro.build)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com)
