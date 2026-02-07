# Quack Attack - Game Systems Reference

All systems live in `src/systems/`.

---

## HealthSystem (`src/systems/HealthSystem.js`)

Manages player hit points based on difficulty setting.

### Constructor
```javascript
new HealthSystem(scene, difficulty)
```

| Parameter | Type | Description |
|---|---|---|
| `scene` | Phaser.Scene | GameScene reference (for event emitting) |
| `difficulty` | String | 'easy', 'medium', or 'hard' |

### HP Values by Difficulty

| Difficulty | Max HP |
|---|---|
| Easy | 8 |
| Medium | 5 |
| Hard | 3 |

### Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `takeDamage(amount)` | Number | void | Reduces `currentHP` by `amount` (min 0). Emits `hp-changed`. If HP reaches 0, emits `player-died`. |
| `heal(amount)` | Number | void | Increases `currentHP` by `amount` (max `maxHP`). Emits `hp-changed`. |
| `getHP()` | None | Number | Returns current HP |
| `getMaxHP()` | None | Number | Returns max HP for current difficulty |

### Events Emitted

| Event | Parameters | When |
|---|---|---|
| `hp-changed` | `(currentHP, maxHP)` | After any HP change |
| `player-died` | None | When currentHP reaches 0 |

### Usage in GameScene
```javascript
// Created in GameScene.create()
this.healthSystem = new HealthSystem(this, this.difficulty);

// Called on enemy-player collision
this.healthSystem.takeDamage(1);

// Listened for in GameScene
this.events.on('player-died', () => this.gameOver());
```

---

## CombatSystem (`src/systems/CombatSystem.js`)

Tracks kills and manages special attack charges. Every 5 kills earns 1 special attack use.

### Constructor
```javascript
new CombatSystem(scene)
```

### Properties

| Property | Type | Initial | Description |
|---|---|---|---|
| `killCount` | Number | 0 | Total enemies killed this level |
| `specialUsesAvailable` | Number | 0 | Charges ready to use |
| `specialUsesUsed` | Number | 0 | Charges already consumed |

### Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `registerKill()` | None | void | Increments `killCount`. Calculates `totalEarned = floor(killCount / 5)`. Updates `specialUsesAvailable = totalEarned - specialUsesUsed`. Emits `kill-count-changed`. If a new charge was earned, also emits `special-earned`. |
| `canUseSpecial()` | None | Boolean | Returns `true` if `specialUsesAvailable > 0` |
| `useSpecial()` | None | Boolean | Consumes 1 charge. Returns `true` if successful, `false` if no charges available. |
| `getKillCount()` | None | Number | Returns total kills this level |
| `getSpecialUses()` | None | Number | Returns available charges |
| `getKillsUntilNextSpecial()` | None | Number | Calculates remaining kills until next charge |

### Special Charge Math

```
KILLS_PER_SPECIAL = 5

Kill  1 → 0 charges earned, 0 available
Kill  2 → 0 charges earned, 0 available
Kill  3 → 0 charges earned, 0 available
Kill  4 → 0 charges earned, 0 available
Kill  5 → 1 charge earned,  1 available  ← SPECIAL READY!
Kill  6 → 1 charge earned,  1 available  (if not used)
Kill  7 → 1 charge earned,  1 available
Kill  8 → 1 charge earned,  1 available
Kill  9 → 1 charge earned,  1 available
Kill 10 → 2 charges earned, 2 available  ← ANOTHER CHARGE!

If player uses 1 charge at kill 5:
Kill  6 → 1 earned - 1 used = 0 available
Kill 10 → 2 earned - 1 used = 1 available
```

### Events Emitted

| Event | Parameters | When |
|---|---|---|
| `kill-count-changed` | `(killCount, specialUsesAvailable)` | After every kill or special use |
| `special-earned` | None | When a new charge is earned (every 5th kill) |

### Usage in GameScene
```javascript
// Created in GameScene.create()
this.combatSystem = new CombatSystem(this);

// Called when enemy is killed (slide or projectile)
this.combatSystem.registerKill();

// Called when player presses Space
if (this.combatSystem.canUseSpecial()) {
  this.combatSystem.useSpecial();
  this.specialAttackHandler.execute(this, this.player);
}
```

---

## ScoreSystem (`src/systems/ScoreSystem.js`)

Tracks miniature rubber duckies collected during the current level.

### Constructor
```javascript
new ScoreSystem(scene)
```

### Properties

| Property | Type | Initial | Description |
|---|---|---|---|
| `levelDuckies` | Number | 0 | Duckies collected this level |

### Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `collectDucky()` | None | void | Increments `levelDuckies`. Emits `ducky-collected`. |
| `getLevelDuckies()` | None | Number | Returns duckies collected this level |

### Events Emitted

| Event | Parameters | When |
|---|---|---|
| `ducky-collected` | `(levelDuckies)` | After each pickup |

### Important Note
Collected duckies are **only saved to persistent storage when the level is completed**. If the player dies, the duckies collected that run are lost. The saving happens in `GameScene.completeLevel()`:

```javascript
SaveSystem.addDuckies(this.scoreSystem.getLevelDuckies());
```

---

## SaveSystem (`src/systems/SaveSystem.js`)

Handles persistent storage using the browser's `localStorage`. All methods are static.

### Storage Key
```
'quack-attack-save'
```

### Default Save Data
```javascript
{
  totalDuckies: 0,
  unlockedCharacters: ['fireDucky'],
  selectedCharacter: 'fireDucky',
  unlockedLevels: [1],
  completedLevels: [],
  difficulty: 'medium',
}
```

### Core Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `load()` | None | Object | Reads from localStorage. Merges with defaults to handle missing keys. Returns defaults on parse error. |
| `save(data)` | Object | void | Writes full save object to localStorage as JSON |

### Ducky Currency Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `getTotalDuckies()` | None | Number | Returns total accumulated duckies |
| `addDuckies(amount)` | Number | void | Adds to total (on level complete) |
| `spendDuckies(amount)` | Number | Boolean | Deducts from total if affordable. Returns `true` on success, `false` if insufficient funds. |

### Character Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `getSelectedCharacter()` | None | String | Returns character ID |
| `setSelectedCharacter(charId)` | String | void | Updates selected character |
| `unlockCharacter(charId)` | String | void | Adds character to unlocked list |
| `isCharacterUnlocked(charId)` | String | Boolean | Checks if character is unlocked |

### Level Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `unlockLevel(levelNum)` | Number | void | Adds level to unlocked list |
| `completeLevel(levelNum)` | Number | void | Marks level complete + unlocks next level (if < 10) |
| `isLevelUnlocked(levelNum)` | Number | Boolean | Checks if level is unlocked |

### Difficulty Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `getDifficulty()` | None | String | Returns 'easy', 'medium', or 'hard' |
| `setDifficulty(diff)` | String | void | Updates difficulty setting |

### Error Handling
- `load()` catches JSON parse errors and returns defaults
- Missing keys are filled in by spreading defaults: `{ ...defaults, ...savedData }`
- No data validation beyond parse error handling

### When Save Methods Are Called

| Method | Called From | Trigger |
|---|---|---|
| `addDuckies()` | GameScene.completeLevel() | Player reaches pancake |
| `completeLevel()` | GameScene.completeLevel() | Player reaches pancake |
| `spendDuckies()` | CharacterStoreScene | Player buys a character |
| `unlockCharacter()` | CharacterStoreScene | Player buys a character |
| `setSelectedCharacter()` | CharacterStoreScene | Player selects a character |
| `setDifficulty()` | MainMenuScene | Player toggles difficulty |
