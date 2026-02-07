# Quack Attack - Project Overview

## What Is It?
Quack Attack is a 2D side-scrolling platformer game inspired by Super Mario. You play as a rubber ducky navigating through 10 progressively challenging levels, fighting octopus enemies, collecting miniature rubber duckies as currency, unlocking new characters with unique special attacks, and reaching the pancake at the end of each level.

## Tech Stack

| Technology | Purpose | License | Cost |
|---|---|---|---|
| **Phaser 3** (v3.90.0) | Game engine - arcade physics, sprites, animation, tilemap, camera | MIT | Free |
| **JavaScript** (ES6+ modules) | Programming language | - | Free |
| **Vite** (v7.3.1) | Dev server + production build tool | MIT | Free |
| **Piskel** | Pixel art sprite creation (browser-based) | - | Free |
| **jsfxr / OpenGameArt** | Sound effects and music | CC0 | Free |

**Total cost: $0** - The entire stack is free and open source.

## How to Run

```bash
# Install dependencies (first time only)
npm install

# Start development server (auto-opens browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The game runs at **http://localhost:3000** in any modern web browser.

## Game Resolution
- **800 x 480 pixels**, pixel art rendering
- Auto-scales to fit the browser window (`Phaser.Scale.FIT`)
- Centered in viewport (`Phaser.Scale.CENTER_BOTH`)

## Project Statistics
- **31 JavaScript source files**
- **10 levels** with hand-crafted platform layouts
- **5 playable characters** with unique special attacks
- **3 difficulty modes** (Easy, Medium, Hard)
- **~288 collectible duckies** across all levels
- **0 external asset files** - all sprites generated programmatically
