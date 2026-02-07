# Quack Attack - Architecture Document

## Project Structure

```
Dylan App/
├── package.json                          # Project config, dependencies, scripts
├── vite.config.js                        # Vite build config
├── index.html                            # Entry HTML (loads src/main.js)
│
├── src/
│   ├── main.js                           # Phaser game bootstrap + config
│   │
│   ├── config/                           # Data-driven configuration
│   │   ├── gameConfig.js                 # Physics, speed, HP constants
│   │   ├── characterDefs.js              # 5 character definitions
│   │   └── levelDefs.js                  # 10 level definitions
│   │
│   ├── scenes/                           # Phaser scene classes (screens)
│   │   ├── BootScene.js                  # Generates all sprite textures
│   │   ├── PreloadScene.js               # Splash screen
│   │   ├── MainMenuScene.js              # Main menu (Play/Characters/Difficulty)
│   │   ├── LevelSelectScene.js           # 10-level grid selection
│   │   ├── CharacterStoreScene.js        # Character unlock/select shop
│   │   ├── GameScene.js                  # Core gameplay (the platformer)
│   │   ├── UIScene.js                    # HUD overlay (HP/kills/duckies)
│   │   ├── LevelCompleteScene.js         # Post-level results screen
│   │   └── GameOverScene.js              # Death screen
│   │
│   ├── entities/                         # Game object classes
│   │   ├── Player.js                     # Player character
│   │   ├── Octopus.js                    # Enemy with patrol AI
│   │   ├── Collectible.js                # Mini ducky pickup
│   │   ├── Pancake.js                    # Level-end goal
│   │   ├── Fireball.js                   # Fire projectile
│   │   ├── Bomb.js                       # Falling bomb projectile
│   │   ├── Bubble.js                     # Bubble freeze effect
│   │   └── Lightning.js                  # Lightning strike effect
│   │
│   ├── attacks/                          # Attack strategy classes
│   │   ├── SlideAttack.js                # Common slide (delegates to Player)
│   │   ├── FireballAttack.js             # Spawns fireball + collision
│   │   ├── BubbleAttack.js              # Area freeze within 150px
│   │   ├── LightningAttack.js            # Area kill within 200px
│   │   ├── BombAttack.js                 # Bombs on all visible enemies
│   │   └── LuckyAttack.js               # Random pick from Bubble/Lightning/Bomb
│   │
│   └── systems/                          # Game logic systems
│       ├── HealthSystem.js               # HP management per difficulty
│       ├── CombatSystem.js               # Kill tracking + special charges
│       ├── ScoreSystem.js                # Ducky collection per level
│       └── SaveSystem.js                 # localStorage persistence
│
├── assets/                               # Asset directories (placeholder)
│   ├── sprites/
│   ├── tilemaps/
│   └── audio/
│
└── docs/                                 # Documentation
    ├── 01-PROJECT-OVERVIEW.md
    ├── 02-GAME-DESIGN.md
    ├── 03-ARCHITECTURE.md
    ├── 04-SCENES.md
    ├── 05-ENTITIES.md
    ├── 06-ATTACKS.md
    ├── 07-SYSTEMS.md
    └── 08-LEVEL-DATA.md
```

---

## Scene Flow

```
BootScene ──► PreloadScene ──► MainMenuScene
                                    │
                        ┌───────────┼───────────┐
                        │           │           │
                        ▼           ▼           │
               LevelSelectScene  CharacterStore  Difficulty Toggle
                        │          Scene             (inline)
                        ▼
                   GameScene ◄──────────────────┐
                   + UIScene (parallel overlay)  │
                        │                        │
                 ┌──────┴──────┐                 │
                 ▼             ▼                 │
          LevelComplete   GameOverScene          │
             Scene              │                │
                 │         ┌────┤                 │
          ┌──────┼─────┐   │    │                 │
          ▼      ▼     ▼   ▼    ▼                 │
        Redo   Next  Store Retry Store            │
        Level  Level  ──►CharStoreScene           │
          │      │              │                 │
          └──────┴──────────────┴─────────────────┘
                        │
                        ▼
                   MainMenuScene (HOME button from any result screen)
```

### Scene Transition Details

| From | To | Trigger | Data Passed |
|---|---|---|---|
| BootScene | PreloadScene | Automatic (after sprite generation) | None |
| PreloadScene | MainMenuScene | Automatic (500ms delay) | None |
| MainMenuScene | LevelSelectScene | "PLAY" button click | None |
| MainMenuScene | CharacterStoreScene | "CHARACTERS" button click | None |
| LevelSelectScene | GameScene | Level button click | `{ level: <number> }` |
| LevelSelectScene | MainMenuScene | "BACK" button click | None |
| GameScene | LevelCompleteScene | Player touches pancake | `{ levelNumber, duckiesCollected, totalDuckies }` |
| GameScene | GameOverScene | Player HP reaches 0 | `{ levelNumber }` |
| LevelCompleteScene | GameScene | "REDO" or "NEXT LEVEL" click | `{ level: <number> }` |
| LevelCompleteScene | CharacterStoreScene | "CHARACTER STORE" click | None |
| LevelCompleteScene | MainMenuScene | "HOME" click | None |
| GameOverScene | GameScene | "RETRY" click | `{ level: <number> }` |
| GameOverScene | CharacterStoreScene | "CHARACTER STORE" click | None |
| GameOverScene | MainMenuScene | "HOME" click | None |
| CharacterStoreScene | MainMenuScene | "BACK" click | None |

---

## Parallel Scene Architecture

The **UIScene** (HUD) runs simultaneously with **GameScene** using Phaser's parallel scene system:

```
GameScene.create() calls:
  this.scene.launch('UIScene', { maxHP, currentHP })

GameScene publishes events:
  'hp-changed'         → UIScene updates hearts
  'kill-count-changed' → UIScene updates kill counter + special indicator
  'ducky-collected'    → UIScene updates ducky counter
  'special-earned'     → UIScene flashes special text

GameScene.completeLevel() or .gameOver() calls:
  this.scene.stop('UIScene')
```

This separation ensures:
- HUD elements don't scroll with the camera
- HUD logic is isolated from gameplay logic
- HUD can be updated without touching GameScene

---

## Design Patterns

### Strategy Pattern (Attacks)
Each character's special attack is a separate class implementing a common interface:

```javascript
class SomeAttack {
  execute(scene, player) {
    // Perform the attack using scene and player references
  }
}
```

The `GameScene` holds a reference to the current character's attack strategy and calls `execute()` when the player presses Space. This allows easy addition of new attack types without modifying GameScene.

### Data-Driven Design (Levels & Characters)
Levels and characters are defined as pure data objects in `config/`:

- **`levelDefs.js`** - Array of 10 level objects with platforms, enemies, collectibles, and positions
- **`characterDefs.js`** - Object mapping character IDs to their properties (name, color, attack, cost)

This makes it trivial to add new levels or characters by just adding data - no code changes needed.

### Event-Driven Communication
Game systems communicate via Phaser's event emitter:

```
HealthSystem   ──emit('hp-changed')──►      UIScene
CombatSystem   ──emit('kill-count-changed')──► UIScene
ScoreSystem    ──emit('ducky-collected')──►   UIScene
HealthSystem   ──emit('player-died')──►      GameScene
CombatSystem   ──emit('special-earned')──►   UIScene
```

This keeps systems decoupled - the HealthSystem doesn't know about the UI, it just emits events.

### Entity Inheritance
All game entities extend `Phaser.Physics.Arcade.Sprite`:

```
Phaser.Physics.Arcade.Sprite
  ├── Player
  ├── Octopus
  ├── Collectible
  ├── Pancake
  ├── Fireball
  ├── Bomb
  ├── Bubble
  └── Lightning
```

Each entity manages its own physics body, animations, and behavior in its `constructor` and `update` methods.

---

## Collision Map

| Object A | Object B | Type | Effect |
|---|---|---|---|
| Player | Platforms | Collider | Player stands on platforms |
| Player | Moving Platforms | Collider | Player rides moving platforms |
| Player | Enemies (Octopus) | Overlap | Player takes 1 HP damage + knockback |
| Player | Collectibles | Overlap | Ducky collected, counter increments |
| Player | Pancake | Overlap | Level completed |
| Enemies | Platforms | Collider | Enemies walk on platforms |
| Slide Hitbox | Enemies | Overlap | Enemy killed, kill registered |
| Fireball | Enemies | Overlap | Enemy killed, fireball destroyed |
| Bomb | Enemies | Overlap | Enemy killed, bomb destroyed |

---

## Physics Configuration

```javascript
{
  type: Phaser.AUTO,           // WebGL preferred, Canvas fallback
  width: 800,
  height: 480,
  pixelArt: true,              // No anti-aliasing on sprites
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },    // Downward gravity
      debug: false,
    },
  },
}
```

| Constant | Value | Usage |
|---|---|---|
| GRAVITY | 800 | World gravity (y-axis) |
| PLAYER_SPEED | 160 | Horizontal movement speed |
| JUMP_FORCE | -350 | Upward velocity on jump |
| TILE_SIZE | 16 | Base tile size in pixels |

---

## Persistence (SaveSystem)

Data stored in `localStorage` under key `'quack-attack-save'`:

```json
{
  "totalDuckies": 0,
  "unlockedCharacters": ["fireDucky"],
  "selectedCharacter": "fireDucky",
  "unlockedLevels": [1],
  "completedLevels": [],
  "difficulty": "medium"
}
```

### When Data is Written
- **Level complete:** `addDuckies()`, `completeLevel()` (unlocks next level)
- **Character store:** `spendDuckies()`, `unlockCharacter()`, `setSelectedCharacter()`
- **Main menu:** `setDifficulty()`

### Data Safety
- `load()` merges saved data with defaults (handles missing keys)
- Invalid JSON triggers fallback to defaults
- No sensitive data stored
