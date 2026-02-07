# Quack Attack - Attack System Reference

All attack classes live in `src/attacks/` and implement a common interface:

```javascript
class AttackName {
  execute(scene, player) {
    // Perform the attack
    // scene = GameScene reference (access enemyGroup, combatSystem, cameras, etc.)
    // player = Player entity reference (access position, facing direction)
  }
}
```

The `GameScene` maps each character to its attack via the `SPECIAL_ATTACKS` lookup table:

```javascript
const SPECIAL_ATTACKS = {
  FireballAttack:    new FireballAttack(),
  BubbleAttack:     new BubbleAttack(),
  LightningAttack:  new LightningAttack(),
  BombAttack:       new BombAttack(),
  LuckyAttack:      new LuckyAttack(),
};
```

---

## SlideAttack (`src/attacks/SlideAttack.js`)

**Used by:** All characters (common attack, Down arrow)
**Requires charges:** No (always available)

### Behavior
Delegates directly to `player.slideAttack()`. Returns the hitbox zone for GameScene to set up collision detection.

### How It Works
1. Player lunges forward at 2x speed
2. A temporary hitbox (28x24 pixels) appears in front of the player
3. Any octopus overlapping the hitbox is killed
4. Hitbox and slide state clear after 300ms
5. Player cannot start another slide while already sliding

---

## FireballAttack (`src/attacks/FireballAttack.js`)

**Used by:** Fire Ducky
**Character cost:** Free (starter)

### Behavior
Spawns a `Fireball` entity that travels horizontally.

### How It Works
1. Determines direction from `player.facingRight`
2. Creates Fireball at player position + 16px offset in facing direction
3. Fireball travels at 300px/s in that direction
4. Sets up physics overlap between fireball and `scene.enemyGroup`
5. On hit: enemy dies (`enemy.die()`), kill registered (`scene.combatSystem.registerKill()`), fireball destroyed
6. Fireball auto-destroys after 1.5s if it doesn't hit anything

### Stats
| Stat | Value |
|---|---|
| Damage | Kills 1 enemy |
| Range | ~450px (300px/s * 1.5s) |
| Speed | 300px/s |
| Targets | Single (first enemy hit) |

---

## BubbleAttack (`src/attacks/BubbleAttack.js`)

**Used by:** Bubble Ducky
**Character cost:** 25 duckies

### Behavior
Freezes all nearby octopuses in place for 3 seconds.

### How It Works
1. Spawns a visual `Bubble` entity at player position (expands, then fades)
2. Iterates all enemies in `scene.enemyGroup`
3. Skips dead or already-frozen enemies
4. For each enemy within 150px radius: calls `enemy.freeze(BUBBLE_FREEZE_DURATION)`
5. Frozen enemies stop moving, turn blue (tinted)
6. After 3 seconds, frozen enemies resume patrol
7. Does **NOT** kill enemies - just immobilizes them

### Stats
| Stat | Value |
|---|---|
| Damage | None (crowd control only) |
| Range | 150px radius from player |
| Duration | 3000ms (3 seconds) |
| Targets | All enemies in range |

### Strategic Use
- Freeze a group, then slide attack them while immobilized
- Create safe passage through enemy-heavy sections
- Pairs well with the fact that frozen enemies can't deal damage

---

## LightningAttack (`src/attacks/LightningAttack.js`)

**Used by:** Lightning Ducky
**Character cost:** 50 duckies

### Behavior
Instantly kills all nearby enemies with a lightning strike visual.

### How It Works
1. Gets all non-dead enemies from `scene.enemyGroup`
2. For each enemy within 200px radius:
   - Spawns a `Lightning` visual effect at the enemy's position (above their head)
   - Calls `enemy.die()` to kill the enemy
   - Calls `scene.combatSystem.registerKill()` to register the kill
3. Lightning visuals fade out over 400ms

### Stats
| Stat | Value |
|---|---|
| Damage | Instant kill |
| Range | 200px radius from player |
| Duration | Instant |
| Targets | All enemies in range |

### Strategic Use
- Best for clearing clusters of nearby enemies
- Wider range than Bubble (200px vs 150px) and actually kills
- Good for earning more special charges quickly (kills feed the 5-kill counter)

---

## BombAttack (`src/attacks/BombAttack.js`)

**Used by:** Bombing Ducky
**Character cost:** 75 duckies

### Behavior
Drops bombs from the sky onto every visible enemy on screen.

### How It Works
1. Gets all non-dead enemies from `scene.enemyGroup`
2. Filters to only enemies currently visible on screen (within camera bounds)
3. For each visible enemy:
   - Spawns a `Bomb` entity directly above the enemy (20px above camera top)
   - Bomb falls with gravity + 200px/s initial downward velocity
   - Sets up physics overlap between bomb and enemy group
   - On hit: enemy dies, kill registered, bomb destroyed
4. Bombs auto-destroy after 3s if they miss

### Stats
| Stat | Value |
|---|---|
| Damage | Instant kill per bomb |
| Range | All visible enemies on screen |
| Duration | ~1-2s fall time |
| Targets | All on-screen enemies |

### Strategic Use
- Most powerful attack - clears the entire screen
- Slight delay due to bomb fall time (enemies could move)
- Best used in open areas where all enemies are visible
- Ideal for the later levels with 14-20 enemies

---

## LuckyAttack (`src/attacks/LuckyAttack.js`)

**Used by:** Lucky Ducky
**Character cost:** 100 duckies

### Behavior
Randomly selects and executes one of the three non-fireball special attacks.

### How It Works
1. Maintains an array of attack instances: `[BubbleAttack, LightningAttack, BombAttack]`
2. Randomly selects one using `Math.floor(Math.random() * 3)`
3. Calls the chosen attack's `execute(scene, player)` method
4. The selected attack behaves identically to its standalone version

### Probability
| Attack | Chance |
|---|---|
| Bubble Freeze | 33.3% |
| Lightning Strike | 33.3% |
| Bomb Rain | 33.3% |

### Strategic Use
- Unpredictable but always powerful
- Worth the 100 ducky investment since every outcome is strong
- Fun factor - you never know what you'll get
- All three possible outcomes are the special attacks of other (cheaper) characters

---

## Attack Comparison Table

| Attack | Character | Range | Kills? | Targets | Delay | Best For |
|---|---|---|---|---|---|---|
| Slide | All | Contact | Yes | Single | None | Quick single kills |
| Fireball | Fire | 450px line | Yes | Single | None | Safe ranged kill |
| Bubble | Bubble | 150px area | No | All nearby | None | Crowd control |
| Lightning | Lightning | 200px area | Yes | All nearby | None | Clearing clusters |
| Bomb | Bombing | Screen-wide | Yes | All visible | ~1-2s | Screen wipe |
| Lucky | Lucky | Varies | Varies | Varies | Varies | Surprise factor |
