# Quack Attack - Level Data Reference

All levels are defined in `src/config/levelDefs.js` as an array of objects.

---

## Level Data Structure

Each level object has the following shape:

```javascript
{
  id: Number,              // Level number (1-10)
  name: String,            // Display name
  width: Number,           // Level width in tiles
  octopusCount: Number,    // Total enemies (informational)
  octopusSpeed: Number,    // Enemy speed in px/s
  collectibleCount: Number,// Total collectibles (informational)
  platforms: [             // Static ground/platforms
    { x, y, w, h }        // Position in tiles, width/height in tiles
  ],
  movingPlatforms: [       // Optional - moving platforms (levels 4+)
    { x, y, w, h, moveX, moveY, speed }
  ],
  enemyPositions: [        // Where enemies spawn
    { x, y, patrolDist }   // Position in tiles, patrol range in tiles
  ],
  collectiblePositions: [  // Where duckies spawn
    { x, y }               // Position in tiles
  ],
  pancakePosition: { x, y },  // Goal position in tiles
  playerStart: { x, y },      // Spawn position in tiles
}
```

### Coordinate System
- All positions are in **tile units** (1 tile = 16 pixels)
- Origin is top-left of the level
- Y increases downward
- Ground level is typically y=12 (192px)
- World height is fixed at 15 tiles (240px)

### Moving Platform Properties

| Property | Type | Description |
|---|---|---|
| `x` | Number | Starting X position in tiles |
| `y` | Number | Starting Y position in tiles |
| `w` | Number | Width in tiles |
| `h` | Number | Height in tiles (usually 1) |
| `moveX` | Number | Horizontal movement range in tiles (0 = no horizontal movement) |
| `moveY` | Number | Vertical movement range in tiles (negative = moves up, 0 = no vertical movement) |
| `speed` | Number | Animation speed multiplier (0.5 = slow, 1.0 = fast) |

Moving platforms oscillate using a sine wave: `offset = sin(time * PI) * range`

---

## Level 1 - Tutorial

| Property | Value |
|---|---|
| Width | 80 tiles (1280px) |
| Enemies | 3 octopuses |
| Enemy Speed | 40 px/s |
| Collectibles | 15 duckies |
| Moving Platforms | None |

**Design:** Simple flat ground with small raised platforms. Introduces basic movement and slide attack. Low enemy count and slow speed for learning.

```
Platforms: Main ground (x:5 w:70), plus 4 small platforms
Enemies: x:20, x:40, x:55 (all on ground level)
Pancake: x:75
Player Start: x:3
```

---

## Level 2 - Jumping Jacks

| Property | Value |
|---|---|
| Width | 100 tiles (1600px) |
| Enemies | 5 octopuses |
| Enemy Speed | 50 px/s |
| Collectibles | 18 duckies |
| Moving Platforms | None |

**Design:** Introduces gaps between platforms. Player must jump across sections of ground. First time the player risks falling.

```
Platforms: 7 ground sections with gaps, plus 3 elevated platforms
Enemies: Spread across ground sections
Pancake: x:93
Player Start: x:5
```

---

## Level 3 - High Rise

| Property | Value |
|---|---|
| Width | 110 tiles (1760px) |
| Enemies | 6 octopuses |
| Enemy Speed | 60 px/s |
| Collectibles | 21 duckies |
| Moving Platforms | None |

**Design:** Multi-height platforms requiring vertical navigation. Some collectibles placed on high platforms to reward skilled jumping.

```
Platforms: Ground sections with 2-3 tier platform stacks
Enemies: Mix of ground and elevated patrols
Pancake: x:105
Player Start: x:5
```

---

## Level 4 - Moving On

| Property | Value |
|---|---|
| Width | 120 tiles (1920px) |
| Enemies | 7 octopuses |
| Enemy Speed | 65 px/s |
| Collectibles | 24 duckies |
| Moving Platforms | 4 platforms |

**Design:** Introduces moving platforms. Some gaps can only be crossed using the moving platforms. Mix of vertical and horizontal movers.

```
Moving Platforms:
  - x:26 vertical (speed 0.5)
  - x:52 horizontal (speed 0.8)
  - x:80 vertical (speed 0.6)
  - x:106 horizontal (speed 0.7)
Pancake: x:116
Player Start: x:5
```

---

## Level 5 - The Long Run

| Property | Value |
|---|---|
| Width | 140 tiles (2240px) |
| Enemies | 8 octopuses |
| Enemy Speed | 70 px/s |
| Collectibles | 27 duckies |
| Moving Platforms | None |

**Design:** First truly long level. Tests endurance with many ground sections and platforms. More enemies spread over a larger area.

```
Platforms: 15 ground/platform sections
Enemies: Evenly distributed every ~15 tiles
Pancake: x:137
Player Start: x:5
```

---

## Level 6 - Crossroads

| Property | Value |
|---|---|
| Width | 140 tiles (2240px) |
| Enemies | 10 octopuses |
| Enemy Speed | 80 px/s |
| Collectibles | 30 duckies |
| Moving Platforms | None |

**Design:** Complex multi-path layout with 3-tier platform stacks. Some enemies patrol on elevated platforms. Collectibles spread across all heights to encourage exploration.

```
Platforms: 22 platform pieces across 3 vertical tiers
Enemies: 8 on ground, 2 on elevated platforms
Pancake: x:135
Player Start: x:5
```

---

## Level 7 - Sky High

| Property | Value |
|---|---|
| Width | 150 tiles (2400px) |
| Enemies | 12 octopuses |
| Enemy Speed | 85 px/s |
| Collectibles | 33 duckies |
| Moving Platforms | None |

**Design:** Emphasizes vertical platforming with many 3-tier stacks. Enemies on both ground and top platforms. Requires precise jumping to collect all duckies.

```
Platforms: 26 platform pieces, frequent 3-tier stacks
Enemies: 9 on ground, 3 on elevated platforms (y:5)
Pancake: x:145
Player Start: x:5
```

---

## Level 8 - Narrow Escape

| Property | Value |
|---|---|
| Width | 160 tiles (2560px) |
| Enemies | 14 octopuses |
| Enemy Speed | 90 px/s |
| Collectibles | 36 duckies |
| Moving Platforms | None |

**Design:** Very narrow platforms (3-4 tiles wide) with many gaps. Tests precision platforming. High enemy density on the small platforms.

```
Platforms: 26 sections, many only 3-4 tiles wide
Enemies: Tight patrol ranges (1-3 tiles) on narrow platforms
Pancake: x:156
Player Start: x:5
```

---

## Level 9 - Gauntlet

| Property | Value |
|---|---|
| Width | 160 tiles (2560px) |
| Enemies | 16 octopuses |
| Enemy Speed | 95 px/s |
| Collectibles | 39 duckies |
| Moving Platforms | None |

**Design:** Enemy-heavy gauntlet. Many octopuses, some in pairs. Elevated enemies on platforms. Tests combat skills and special attack management.

```
Platforms: 23 sections with elevated platforms
Enemies: High density, some at y:8 (elevated), most at y:11 (ground)
Pancake: x:155
Player Start: x:5
```

---

## Level 10 - Final Feast

| Property | Value |
|---|---|
| Width | 200 tiles (3200px) |
| Enemies | 20 octopuses |
| Enemy Speed | 100 px/s |
| Collectibles | 45 duckies |
| Moving Platforms | 6 platforms |

**Design:** Epic finale combining everything. Longest level with the most enemies, fastest speed, multi-tier platforms, and moving platforms. The ultimate test.

```
Moving Platforms:
  - x:22  vertical (speed 0.7)
  - x:57  horizontal (speed 0.9)
  - x:100 vertical (speed 0.8)
  - x:127 horizontal (speed 1.0)
  - x:154 vertical (speed 0.9)
  - x:181 horizontal (speed 1.0)

Platforms: 36 sections across ground and elevated tiers
Enemies: 15 on ground, 5 on elevated platforms (y:5)
Pancake: x:196
Player Start: x:5
```

---

## Summary Table

| Level | Name | Width | Enemies | Speed | Duckies | Moving? |
|---|---|---|---|---|---|---|
| 1 | Tutorial | 80 | 3 | 40 | 15 | No |
| 2 | Jumping Jacks | 100 | 5 | 50 | 18 | No |
| 3 | High Rise | 110 | 6 | 60 | 21 | No |
| 4 | Moving On | 120 | 7 | 65 | 24 | Yes (4) |
| 5 | The Long Run | 140 | 8 | 70 | 27 | No |
| 6 | Crossroads | 140 | 10 | 80 | 30 | No |
| 7 | Sky High | 150 | 12 | 85 | 33 | No |
| 8 | Narrow Escape | 160 | 14 | 90 | 36 | No |
| 9 | Gauntlet | 160 | 16 | 95 | 39 | No |
| 10 | Final Feast | 200 | 20 | 100 | 45 | Yes (6) |

**Totals:** 113 enemies, 288 collectible duckies across all 10 levels
