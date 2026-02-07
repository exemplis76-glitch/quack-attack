# Quack Attack - Game Design Document

## Core Concept
A rubber ducky must fight through 10 levels of octopus-infested platforming to reach and eat the pancake at the end of each level. Along the way, collect miniature rubber duckies to unlock new characters with unique special attacks.

---

## Controls

| Input | Action |
|---|---|
| **Left/Right Arrows** | Move left/right |
| **Up Arrow** | Jump (only when on ground) |
| **Down Arrow** | Slide attack (always available) |
| **Space Bar** | Special attack (character-specific, requires charges) |

---

## Characters

### Fire Ducky (Starter)
- **Cost:** Free (default character)
- **Color:** Orange-red
- **Special Attack:** Fireball
  - Shoots a fireball projectile horizontally in the direction the player faces
  - Travels at 300px/s, destroys after 1.5 seconds
  - Kills first octopus it hits

### Bubble Ducky
- **Cost:** 25 miniature duckies
- **Color:** Cyan/light blue
- **Special Attack:** Bubble Freeze
  - Freezes all octopuses within 150px radius
  - Frozen octopuses can't move or deal damage for 3 seconds
  - Octopuses turn blue when frozen
  - Does NOT kill enemies, just immobilizes them

### Lightning Ducky
- **Cost:** 50 miniature duckies
- **Color:** Yellow
- **Special Attack:** Lightning Strike
  - Strikes all enemies within 200px radius
  - Instantly kills all struck enemies
  - Visual lightning bolt effect at each enemy position

### Bombing Ducky
- **Cost:** 75 miniature duckies
- **Color:** Dark gray
- **Special Attack:** Bomb Rain
  - Drops bombs from the sky onto every octopus currently visible on screen
  - Bombs fall with gravity and explode on contact with enemies
  - Kills all on-screen enemies (most powerful attack)

### Lucky Ducky
- **Cost:** 100 miniature duckies
- **Color:** Green
- **Special Attack:** Random Special
  - Randomly performs one of: Bubble Freeze, Lightning Strike, or Bomb Rain
  - 33% chance for each attack type
  - Element of surprise - you never know what you'll get

---

## Combat System

### Slide Attack (Common Attack)
- **Trigger:** Down arrow key
- **Always available** - no kill requirement
- Creates a temporary hitbox in front of the player
- Player lunges forward at double speed for 300ms
- Kills any octopus that overlaps with the hitbox
- Player cannot change direction during a slide

### Special Attack (Character-Specific)
- **Trigger:** Space bar
- **Requires charges** - earned by killing octopuses
- **1 charge per 5 kills** (accumulates)
  - Kill 5 octopuses = 1 special use
  - Kill 10 octopuses = 2 special uses
  - Kill 15 octopuses = 3 special uses
  - And so on...
- **Charges reset each level** - start fresh every time
- Kill counter and charge display shown in HUD

### Enemies: Octopuses
- **Patrol behavior:** Walk back and forth within a defined patrol distance
- **Reverse at edges:** Turn around at walls or patrol boundaries
- **Damage:** Running into the player deals 1 HP damage
- **Speed:** Varies by level (40px/s in Level 1 up to 100px/s in Level 10)
- **Can be killed by:** Slide attack, fireball, lightning, or bombs
- **Can be frozen by:** Bubble attack (3 seconds)
- **Death animation:** Turns red, floats upward while fading out

### Player Damage & Invincibility
- Each octopus collision = **-1 HP**
- After being hit, player gets **1.5 seconds of invincibility**
- During invincibility, sprite blinks (alpha flashes between 0.3 and 1.0)
- Player is **knocked back** away from the octopus on hit
- **Fall death:** Falling below the level = instant death (all remaining HP lost)

---

## Health System

| Difficulty | Hit Points | Description |
|---|---|---|
| **Easy** | 8 HP | Forgiving - lots of room for error |
| **Medium** | 5 HP | Balanced challenge (default) |
| **Hard** | 3 HP | Punishing - every hit counts |

- Health displayed as hearts in the **top-left corner** of the HUD
- Full hearts = remaining HP, empty hearts = lost HP
- 0 HP = Game Over

---

## Collectibles

### Miniature Rubber Duckies
- Scattered throughout each level (15-45 per level, ~288 total)
- Bob up and down with a gentle animation
- Collected on contact with the player
- Serve as **currency** to unlock new characters in the Character Store
- Current level collection shown in HUD (top-right)
- **Only saved to total on level completion** (lost if you die)

### Pancake (Level Goal)
- Located at the end of each level
- Gently pulses (scale animation) to draw attention
- Touch it to complete the level
- Triggers the Level Complete screen

---

## Level Progression

| Level | Name | Enemies | Speed | Duckies | New Mechanics |
|---|---|---|---|---|---|
| 1 | Tutorial | 3 | 40 | 15 | Basic movement + slide attack |
| 2 | Jumping Jacks | 5 | 50 | 18 | Jumping over gaps |
| 3 | High Rise | 6 | 60 | 21 | Vertical platforming |
| 4 | Moving On | 7 | 65 | 24 | Moving platforms introduced |
| 5 | The Long Run | 8 | 70 | 27 | Longer level |
| 6 | Crossroads | 10 | 80 | 30 | Multiple paths, enemies on platforms |
| 7 | Sky High | 12 | 85 | 33 | Challenging vertical jumps |
| 8 | Narrow Escape | 14 | 90 | 36 | Narrow platforms, precision jumps |
| 9 | Gauntlet | 16 | 95 | 39 | Enemy-heavy gauntlet |
| 10 | Final Feast | 20 | 100 | 45 | Everything combined + moving platforms |

### Unlock System
- **Level 1** is unlocked by default
- Completing a level unlocks the next one
- Completed levels show a gold star in the level select screen
- Any unlocked level can be replayed to farm more duckies

---

## Character Economy

| Character | Cost | Cumulative Cost |
|---|---|---|
| Fire Ducky | Free | 0 |
| Bubble Ducky | 25 | 25 |
| Lightning Ducky | 50 | 75 |
| Bombing Ducky | 75 | 150 |
| Lucky Ducky | 100 | 250 |

**Total to unlock all characters: 250 duckies**
**Total available in game: ~288 duckies** (enough to unlock everything in one full playthrough with careful collection)
