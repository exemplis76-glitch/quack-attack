# Quack Attack - Scene Reference

All scenes extend `Phaser.Scene` and live in `src/scenes/`.

---

## BootScene (`src/scenes/BootScene.js`)

**Purpose:** Generates all game sprites programmatically on startup.

Since the game uses placeholder art, every texture is drawn using Phaser's Graphics API and converted into a texture via `graphics.generateTexture()`.

### Generated Textures

| Texture Key | Size | Description |
|---|---|---|
| `fireDucky` | 32x32 | Orange-red duck with beak and eye |
| `bubbleDucky` | 32x32 | Cyan duck |
| `lightningDucky` | 32x32 | Yellow duck |
| `bombingDucky` | 32x32 | Dark gray duck |
| `luckyDucky` | 32x32 | Green duck |
| `octopus` | 32x32 | Purple octopus with tentacles and eyes |
| `miniDucky` | 16x16 | Small yellow duck (collectible) |
| `pancake` | 32x32 | Stack of pancakes with butter and syrup |
| `fireball` | 12x12 | Orange/yellow gradient circle |
| `bomb` | 16x16 | Dark circle with fuse and spark |
| `bubble` | 24x24 | Semi-transparent blue circle with highlight |
| `lightning` | 16x32 | Yellow zigzag bolt shape |
| `heart` | 16x16 | Red heart (full HP) |
| `heartEmpty` | 16x16 | Dark red heart (lost HP) |
| `groundTile` | 16x16 | Green-topped brown platform tile |
| `movingTile` | 16x16 | Blue platform tile with pattern |

### Methods

| Method | Description |
|---|---|
| `create()` | Calls `generateSprites()`, then starts PreloadScene |
| `generateSprites()` | Orchestrates all texture generation |
| `generateDuckySprite(key, color)` | Creates a duck texture with the given color |
| `generateOctopusSprite()` | Creates the octopus enemy texture |
| `generateMiniDucky()` | Creates the 16x16 collectible duck |
| `generatePancake()` | Creates the pancake goal texture |
| `generateFireball()` | Creates the fireball projectile texture |
| `generateBomb()` | Creates the bomb projectile texture |
| `generateBubble()` | Creates the bubble effect texture |
| `generateLightning()` | Creates the lightning bolt texture |
| `generateHeart()` | Creates both full and empty heart textures |
| `generateTile()` | Creates the static ground platform tile |
| `generateMovingTile()` | Creates the moving platform tile |

---

## PreloadScene (`src/scenes/PreloadScene.js`)

**Purpose:** Splash screen shown briefly before the main menu.

Displays "QUACK ATTACK" title in yellow and "Loading..." text. After 500ms, transitions to MainMenuScene. This scene exists as a placeholder for a real asset loading bar when external assets are added.

---

## MainMenuScene (`src/scenes/MainMenuScene.js`)

**Purpose:** Main navigation hub of the game.

### Visual Layout (top to bottom)
1. "QUACK ATTACK" title (yellow, 48px, with orange stroke)
2. "A Rubber Ducky Adventure" subtitle
3. Fire Ducky sprite (3x scale)
4. Total duckies counter (mini ducky icon + count)
5. **PLAY** button → LevelSelectScene
6. **CHARACTERS** button → CharacterStoreScene
7. **DIFFICULTY** toggle button → Cycles easy/medium/hard
8. Controls hint text at bottom

### Reads From SaveSystem
- `getTotalDuckies()` - Displayed next to mini ducky icon
- `getDifficulty()` - Shown on difficulty button

### Methods

| Method | Description |
|---|---|
| `create()` | Builds all UI elements and button handlers |
| `createButton(x, y, text, callback)` | Reusable button with hover effects |

---

## LevelSelectScene (`src/scenes/LevelSelectScene.js`)

**Purpose:** Grid showing all 10 levels with lock/complete status.

### Visual Layout
- "SELECT LEVEL" title
- 5x2 grid of level buttons (5 columns, 2 rows)
- Each button shows: level number, level name below, gold star if completed
- Locked levels are grayed out and non-interactive
- "BACK" button at bottom

### Level Button States

| State | Background | Text Color | Interactive |
|---|---|---|---|
| Locked | `#555555` | `#888888` | No |
| Unlocked | `#3355aa` | `#ffffff` | Yes |
| Completed | `#228833` | `#ffffff` | Yes (gold star shown) |

### Reads From SaveSystem
- `load()` - Gets `unlockedLevels` and `completedLevels` arrays

---

## CharacterStoreScene (`src/scenes/CharacterStoreScene.js`)

**Purpose:** Character browsing, purchasing, and selection screen.

### Visual Layout
- "CHARACTER STORE" title
- Total duckies display
- 5 character cards in a horizontal row (140px each)
- Each card contains:
  - Character sprite (2x scale)
  - Character name
  - Description text
  - Action button (varies by state)
- "BACK" button at bottom

### Card States

| State | Border Color | Action Button |
|---|---|---|
| Selected | Gold (`#ffdd00`) | "SELECTED" label |
| Unlocked (not selected) | Gray (`#555577`) | "SELECT" button |
| Locked (can afford) | Gray (`#555577`) | Cost + "UNLOCK" button |
| Locked (can't afford) | Gray (`#555577`) | Cost + "LOCKED" label |

### Reads/Writes SaveSystem
- Reads: `load()`, `getTotalDuckies()`
- Writes: `spendDuckies()`, `unlockCharacter()`, `setSelectedCharacter()`
- Restarts scene after any purchase or selection to refresh UI

---

## GameScene (`src/scenes/GameScene.js`)

**Purpose:** The core gameplay scene - the actual platformer.

This is the most complex scene. It creates the level, spawns all entities, handles input, manages collisions, and orchestrates all game systems.

### Lifecycle

| Method | When Called | What It Does |
|---|---|---|
| `init(data)` | Scene starts | Receives `{ level }` from previous scene |
| `create()` | After init | Builds the entire level and initializes systems |
| `update(time, delta)` | Every frame | Processes input, updates enemies, checks for death |

### Create() Sequence
1. Load level definition from `LEVELS` array
2. Load save data (difficulty, selected character)
3. Look up character's special attack handler
4. Set world bounds based on level width
5. Set sky-blue background
6. Create static platform group and build ground tiles
7. Create moving platforms (if level has them)
8. Create player entity at spawn point
9. Add player-platform collider
10. Set up camera follow with smooth scrolling
11. Initialize HealthSystem, CombatSystem, ScoreSystem
12. Spawn enemies and add enemy-platform collider
13. Set up enemy-player overlap (damage on contact)
14. Spawn collectibles with pickup overlap
15. Create pancake goal with completion overlap
16. Set up keyboard input (arrows + space)
17. Listen for player-died event
18. Launch UIScene as parallel overlay
19. Forward game events to UIScene

### Update() Loop (every frame)
1. Handle player movement (arrow keys)
2. Check for slide attack (down arrow, JustDown)
3. Check for special attack (space, JustDown)
4. Update all enemy patrol logic
5. Animate moving platforms (sine wave)
6. Check for fall death (player below world)

### Key Properties

| Property | Type | Description |
|---|---|---|
| `levelNumber` | Number | Current level (1-10) |
| `difficulty` | String | 'easy', 'medium', or 'hard' |
| `characterId` | String | Selected character ID |
| `specialAttackHandler` | Object | Attack strategy for current character |
| `player` | Player | Player entity instance |
| `platformGroup` | StaticGroup | All ground/platform tiles |
| `movingPlatforms` | Array | Moving platform data + tiles |
| `enemyGroup` | Group | All octopus enemies |
| `collectibleGroup` | Group | All mini ducky pickups |
| `pancake` | Pancake | Level goal entity |
| `healthSystem` | HealthSystem | HP management |
| `combatSystem` | CombatSystem | Kill tracking |
| `scoreSystem` | ScoreSystem | Ducky collection |
| `cursors` | CursorKeys | Arrow key input |
| `spaceKey` | Key | Space bar input |
| `levelCompleted` | Boolean | Prevents double-completion |

---

## UIScene (`src/scenes/UIScene.js`)

**Purpose:** HUD overlay that runs simultaneously with GameScene.

### Visual Layout

```
┌──────────────────────────────────────────────────────────────┐
│ ♥♥♥♥♥          Kills: 7              🦆 x 12               │
│                Next special: 3 kills                         │
│                                                              │
│                                                              │
│                    (gameplay area)                            │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

| Element | Position | Content |
|---|---|---|
| Hearts | Top-left (20px from edge) | Full/empty hearts for current/max HP |
| Kill counter | Top-center | "Kills: N" text |
| Special indicator | Below kill counter | "Next special: N kills" or "SPECIAL READY! xN [SPACE]" |
| Ducky counter | Top-right | Mini ducky icon + "x N" |

### Event Listeners

| Event | Source | Handler |
|---|---|---|
| `update-hp` | GameScene | Rebuilds heart display |
| `update-kills` | GameScene | Updates kill text and special readiness |
| `update-duckies` | GameScene | Updates ducky count |
| `special-earned` | GameScene | Flash animation on special text |

---

## LevelCompleteScene (`src/scenes/LevelCompleteScene.js`)

**Purpose:** Shown after the player reaches and eats the pancake.

### Receives Data
```javascript
{ levelNumber, duckiesCollected, totalDuckies }
```

### Visual Layout
1. Large pancake graphic (3x scale)
2. "LEVEL COMPLETE!" title (yellow)
3. "Level N" subtitle
4. "+N collected" with mini ducky icon
5. "Total: N" in green
6. **REDO LEVEL** button
7. **NEXT LEVEL** button (hidden on Level 10)
8. **CHARACTER STORE** button
9. **HOME** button

---

## GameOverScene (`src/scenes/GameOverScene.js`)

**Purpose:** Shown when the player's HP reaches 0.

### Receives Data
```javascript
{ levelNumber }
```

### Visual Layout
1. "GAME OVER" title (red, large)
2. "Level N" subtitle
3. "The octopuses got you!" flavor text
4. **RETRY** button (replays same level)
5. **CHARACTER STORE** button
6. **HOME** button
