# Quack Attack - Entity Reference

All entities extend `Phaser.Physics.Arcade.Sprite` and live in `src/entities/`.

---

## Player (`src/entities/Player.js`)

The player character. Handles movement, jumping, slide attacks, and damage response.

### Constructor
```javascript
new Player(scene, x, y, characterId)
```

| Parameter | Type | Description |
|---|---|---|
| `scene` | Phaser.Scene | The GameScene instance |
| `x` | Number | Spawn X position (pixels) |
| `y` | Number | Spawn Y position (pixels) |
| `characterId` | String | Texture key (e.g., 'fireDucky') |

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `characterId` | String | From constructor | Which character skin is active |
| `isInvincible` | Boolean | `false` | True during invincibility frames |
| `isSliding` | Boolean | `false` | True during slide attack animation |
| `facingRight` | Boolean | `true` | Direction the player is facing |

### Physics Body
- **Size:** 20x24 pixels
- **Offset:** 6x8 from sprite origin
- **Collides with world bounds:** Yes

### Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `handleMovement(cursors)` | CursorKeys | void | Processes arrow key input for horizontal movement and jumping. Does nothing if currently sliding. |
| `slideAttack()` | None | Zone or null | Creates a temporary hitbox (28x24) in front of the player. Player lunges at 2x speed. Hitbox destroys after 300ms. Returns the hitbox zone for collision setup, or null if already sliding. |
| `triggerInvincibility()` | None | void | Makes player invincible for 1.5 seconds. Sprite blinks by tweening alpha between 0.3 and 1.0. Does nothing if already invincible. |
| `takeHit(enemyX)` | Number | Boolean | Called when an enemy touches the player. If not invincible: applies knockback away from enemyX, triggers invincibility. Returns `true` if damage was dealt, `false` if invincible. |

### Movement Constants (from `gameConfig.js`)
- **Speed:** 160 px/s (horizontal)
- **Jump force:** -350 (upward velocity)
- **Slide speed:** 320 px/s (double normal speed)
- **Invincibility duration:** 1500ms

---

## Octopus (`src/entities/Octopus.js`)

Enemy entity that patrols back and forth and damages the player on contact.

### Constructor
```javascript
new Octopus(scene, x, y, speed, patrolDist)
```

| Parameter | Type | Description |
|---|---|---|
| `scene` | Phaser.Scene | The GameScene instance |
| `x` | Number | Spawn X position (pixels) |
| `y` | Number | Spawn Y position (pixels) |
| `speed` | Number | Movement speed (pixels/sec, varies by level: 40-100) |
| `patrolDist` | Number | Patrol distance in tiles (converted to pixels internally) |

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `speed` | Number | From constructor | Movement velocity |
| `patrolDist` | Number | From constructor (x TILE_SIZE) | Patrol range in pixels |
| `startX` | Number | Spawn X | Center of patrol path |
| `direction` | Number | `1` | Current direction (1=right, -1=left) |
| `frozen` | Boolean | `false` | True when frozen by Bubble attack |
| `isDead` | Boolean | `false` | True when killed |

### Physics Body
- **Size:** 24x28 pixels
- **Offset:** 4x4 from sprite origin
- **Collides with world bounds:** Yes

### Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `update()` | None | void | Called every frame by GameScene. Handles patrol logic: reverses direction when reaching patrol boundaries or blocked by walls. Does nothing if dead or frozen. |
| `freeze(duration)` | Number (ms) | void | Stops movement, applies blue tint. After `duration` ms, restores movement and clears tint. Only works if not dead. |
| `die()` | None | void | Kills the enemy. Disables physics, applies red tint, plays death animation (float up + fade out over 400ms), then destroys sprite. Only triggers once. |

### Patrol Behavior
1. Starts moving right at `speed`
2. When reaching `startX + patrolDist`, reverses to left
3. When reaching `startX - patrolDist`, reverses to right
4. Also reverses if `body.blocked.left` or `body.blocked.right` (hit a wall)

---

## Collectible (`src/entities/Collectible.js`)

Miniature rubber ducky pickup that serves as in-game currency.

### Constructor
```javascript
new Collectible(scene, x, y)
```

### Physics
- **No gravity** (floats in place)
- **Immovable** (doesn't get pushed by player)
- **Texture:** `miniDucky` (16x16)

### Animation
Continuous bobbing: oscillates 4px up and down with a sine ease over 800ms.

### Interaction
Destroyed on overlap with player. GameScene handles the pickup logic (incrementing ScoreSystem).

---

## Pancake (`src/entities/Pancake.js`)

The level goal object placed at the end of each level.

### Constructor
```javascript
new Pancake(scene, x, y)
```

### Physics
- **No gravity** (static position)
- **Immovable**
- **Texture:** `pancake` (32x32)

### Animation
Gentle pulse: scales between 1.0x and 1.1x with a sine ease over 1000ms.

### Interaction
Triggers `completeLevel()` in GameScene on overlap with player.

---

## Fireball (`src/entities/Fireball.js`)

Projectile spawned by Fire Ducky's special attack.

### Constructor
```javascript
new Fireball(scene, x, y, direction)
```

| Parameter | Type | Description |
|---|---|---|
| `direction` | Number | 1 (right) or -1 (left) |

### Physics
- **No gravity** (travels horizontally)
- **Velocity:** 300 * direction px/s
- **Texture:** `fireball` (12x12)

### Lifetime
Auto-destroys after 1500ms if it doesn't hit anything.

### Interaction
`FireballAttack` sets up overlap with enemy group. On hit: enemy dies, fireball destroys.

---

## Bomb (`src/entities/Bomb.js`)

Projectile spawned by Bombing Ducky's special attack. Falls from the sky onto enemies.

### Constructor
```javascript
new Bomb(scene, x, y)
```

### Physics
- **Has gravity** (falls downward)
- **Initial velocity:** 200 px/s downward
- **Texture:** `bomb` (16x16)

### Lifetime
Auto-destroys after 3000ms if it doesn't hit anything.

### Interaction
`BombAttack` sets up overlap with enemy group. On hit: enemy dies, bomb destroys.

---

## Bubble (`src/entities/Bubble.js`)

Visual effect spawned by Bubble Ducky's special attack.

### Constructor
```javascript
new Bubble(scene, x, y)
```

### Physics
- **No gravity**
- **Circular body** (12px radius)
- **Texture:** `bubble` (24x24)

### Animation
Expands from 0.1x to 1.5x scale with Back easing over 300ms.

### Lifetime
Auto-destroys after 500ms. The actual freeze effect is applied by `BubbleAttack` directly to enemies within range - this entity is purely visual.

---

## Lightning (`src/entities/Lightning.js`)

Visual effect spawned by Lightning Ducky's special attack.

### Constructor
```javascript
new Lightning(scene, x, y)
```

### Physics
- **No gravity**
- **Texture:** `lightning` (16x32)

### Animation
Fades from alpha 1.0 to 0.0 over 400ms, then auto-destroys.

### Interaction
Purely visual. The actual damage is applied by `LightningAttack` directly to enemies within range.
