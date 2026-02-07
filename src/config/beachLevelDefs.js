export const BEACH_LEVELS = [
  // ── Level 1: Shallow Shores ──────────────────────────────────────────
  {
    id: 1,
    name: 'Shallow Shores',
    width: 90,
    octopusCount: 3,
    octopusSpeed: 45,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 20, h: 1 },     // starting beach
      { x: 10, y: 9, w: 5, h: 1 },       // low rock
      { x: 26, y: 12, w: 18, h: 1 },     // second sand stretch
      { x: 30, y: 9, w: 4, h: 1 },       // small platform
      { x: 36, y: 7, w: 3, h: 1 },       // higher rock
      { x: 48, y: 12, w: 16, h: 1 },     // third beach section
      { x: 52, y: 9, w: 5, h: 1 },       // mid platform
      { x: 68, y: 12, w: 20, h: 1 },     // final stretch
      { x: 72, y: 9, w: 4, h: 1 },       // elevated rock
      { x: 78, y: 7, w: 3, h: 1 },       // high perch
    ],
    waterZones: [
      { x: 22, w: 4 },                   // gap between first and second beach
    ],
    spikePositions: [
      { x: 14, y: 11 },                  // spike on starting beach
      { x: 55, y: 11 },                  // spike on third section
    ],
    enemyPositions: [
      { x: 32, y: 11, patrolDist: 4 },
      { x: 56, y: 11, patrolDist: 5 },
      { x: 80, y: 11, patrolDist: 4 },
    ],
    collectiblePositions: [
      // starting beach area (9)
      { x: 4, y: 10 },  { x: 6, y: 10 },  { x: 8, y: 10 },
      { x: 11, y: 7 },  { x: 13, y: 7 },  { x: 15, y: 10 },
      { x: 17, y: 10 },  { x: 19, y: 10 },  { x: 21, y: 10 },
      // second sand stretch (12)
      { x: 27, y: 10 },  { x: 29, y: 10 },  { x: 31, y: 7 },
      { x: 33, y: 7 },  { x: 35, y: 10 },  { x: 37, y: 5 },
      { x: 38, y: 5 },  { x: 39, y: 10 },  { x: 41, y: 10 },
      { x: 42, y: 10 },  { x: 43, y: 10 },  { x: 40, y: 10 },
      // third beach section (12)
      { x: 49, y: 10 },  { x: 50, y: 10 },  { x: 53, y: 7 },
      { x: 54, y: 7 },  { x: 56, y: 7 },  { x: 57, y: 10 },
      { x: 59, y: 10 },  { x: 60, y: 10 },  { x: 61, y: 10 },
      { x: 62, y: 10 },  { x: 51, y: 10 },  { x: 63, y: 10 },
      // final stretch (12)
      { x: 69, y: 10 },  { x: 70, y: 10 },  { x: 73, y: 7 },
      { x: 75, y: 7 },  { x: 77, y: 10 },  { x: 79, y: 5 },
      { x: 80, y: 5 },  { x: 81, y: 10 },  { x: 83, y: 10 },
      { x: 84, y: 10 },  { x: 85, y: 10 },  { x: 86, y: 10 },
    ],
    pancakePosition: { x: 86, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 2: Tide Pools ──────────────────────────────────────────────
  {
    id: 2,
    name: 'Tide Pools',
    width: 100,
    octopusCount: 5,
    octopusSpeed: 55,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 14, h: 1 },     // starting sand
      { x: 8, y: 9, w: 4, h: 1 },        // rock above start
      { x: 20, y: 12, w: 10, h: 1 },     // second pool edge
      { x: 23, y: 9, w: 3, h: 1 },       // stepping stone
      { x: 34, y: 12, w: 12, h: 1 },     // wide beach
      { x: 38, y: 9, w: 5, h: 1 },       // elevated rock
      { x: 40, y: 6, w: 3, h: 1 },       // high tideline
      { x: 50, y: 12, w: 10, h: 1 },     // fourth section
      { x: 53, y: 9, w: 4, h: 1 },       // mid rock
      { x: 64, y: 12, w: 14, h: 1 },     // long stretch
      { x: 68, y: 9, w: 4, h: 1 },       // elevated
      { x: 82, y: 12, w: 16, h: 1 },     // final beach
      { x: 86, y: 9, w: 5, h: 1 },       // last rock
    ],
    waterZones: [
      { x: 16, w: 4 },                   // first tide pool
      { x: 30, w: 4 },                   // second tide pool
    ],
    spikePositions: [
      { x: 12, y: 11 },
      { x: 36, y: 11 },
      { x: 56, y: 11 },
      { x: 72, y: 11 },
    ],
    enemyPositions: [
      { x: 10, y: 11, patrolDist: 4 },
      { x: 27, y: 11, patrolDist: 3 },
      { x: 42, y: 11, patrolDist: 4 },
      { x: 70, y: 11, patrolDist: 5 },
      { x: 90, y: 11, patrolDist: 4 },
    ],
    collectiblePositions: [
      // starting sand (9)
      { x: 4, y: 10 },  { x: 5, y: 10 },  { x: 7, y: 10 },
      { x: 9, y: 7 },   { x: 11, y: 7 },  { x: 10, y: 10 },
      { x: 13, y: 10 }, { x: 14, y: 10 }, { x: 15, y: 10 },
      // second pool edge (9)
      { x: 21, y: 10 }, { x: 22, y: 10 }, { x: 24, y: 7 },
      { x: 25, y: 7 },  { x: 26, y: 10 }, { x: 27, y: 10 },
      { x: 28, y: 10 }, { x: 29, y: 10 }, { x: 23, y: 10 },
      // wide beach (9)
      { x: 35, y: 10 }, { x: 37, y: 10 }, { x: 39, y: 7 },
      { x: 41, y: 4 },  { x: 42, y: 4 },  { x: 43, y: 10 },
      { x: 44, y: 10 }, { x: 45, y: 10 }, { x: 40, y: 7 },
      // fourth section (9)
      { x: 51, y: 10 }, { x: 52, y: 10 }, { x: 54, y: 7 },
      { x: 56, y: 7 },  { x: 55, y: 10 }, { x: 57, y: 10 },
      { x: 58, y: 10 }, { x: 59, y: 10 }, { x: 53, y: 10 },
      // long stretch + final beach (9)
      { x: 65, y: 10 }, { x: 67, y: 10 }, { x: 69, y: 7 },
      { x: 71, y: 7 },  { x: 74, y: 10 }, { x: 76, y: 10 },
      { x: 83, y: 10 }, { x: 87, y: 7 },  { x: 94, y: 10 },
    ],
    pancakePosition: { x: 95, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 3: Coral Climb ─────────────────────────────────────────────
  {
    id: 3,
    name: 'Coral Climb',
    width: 110,
    octopusCount: 6,
    octopusSpeed: 60,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 12, h: 1 },     // start beach
      { x: 7, y: 9, w: 4, h: 1 },        // first coral ledge
      { x: 5, y: 6, w: 3, h: 1 },        // high coral
      { x: 18, y: 12, w: 10, h: 1 },     // second shore
      { x: 20, y: 9, w: 5, h: 1 },       // mid rock
      { x: 32, y: 12, w: 8, h: 1 },      // narrow beach
      { x: 34, y: 9, w: 4, h: 1 },       // coral shelf
      { x: 36, y: 6, w: 3, h: 1 },       // upper coral
      { x: 44, y: 12, w: 12, h: 1 },     // wide section
      { x: 48, y: 9, w: 5, h: 1 },       // elevated
      { x: 60, y: 12, w: 10, h: 1 },     // mid beach
      { x: 63, y: 9, w: 4, h: 1 },       // stepping up
      { x: 65, y: 6, w: 3, h: 1 },       // high point
      { x: 74, y: 12, w: 12, h: 1 },     // long stretch
      { x: 78, y: 9, w: 4, h: 1 },       // rock
      { x: 90, y: 12, w: 8, h: 1 },      // near end
      { x: 102, y: 12, w: 6, h: 1 },     // final
    ],
    waterZones: [
      { x: 14, w: 4 },                   // first gap
      { x: 28, w: 4 },                   // second gap
      { x: 56, w: 4 },                   // third gap
    ],
    spikePositions: [
      { x: 10, y: 11 },
      { x: 24, y: 11 },
      { x: 38, y: 11 },
      { x: 52, y: 11 },
      { x: 82, y: 11 },
    ],
    enemyPositions: [
      { x: 9, y: 11, patrolDist: 3 },
      { x: 23, y: 11, patrolDist: 4 },
      { x: 36, y: 11, patrolDist: 3 },
      { x: 50, y: 11, patrolDist: 4 },
      { x: 76, y: 11, patrolDist: 5 },
      { x: 93, y: 11, patrolDist: 3 },
    ],
    collectiblePositions: [
      // start area (9)
      { x: 4, y: 10 },  { x: 6, y: 10 },  { x: 8, y: 7 },
      { x: 10, y: 7 },  { x: 6, y: 4 },   { x: 7, y: 4 },
      { x: 11, y: 10 }, { x: 12, y: 10 }, { x: 13, y: 10 },
      // second shore (9)
      { x: 19, y: 10 }, { x: 21, y: 7 },  { x: 23, y: 7 },
      { x: 24, y: 10 }, { x: 25, y: 10 }, { x: 26, y: 10 },
      { x: 20, y: 10 }, { x: 22, y: 10 }, { x: 27, y: 10 },
      // narrow beach + coral (9)
      { x: 33, y: 10 }, { x: 35, y: 7 },  { x: 37, y: 4 },
      { x: 38, y: 4 },  { x: 39, y: 10 }, { x: 45, y: 10 },
      { x: 47, y: 10 }, { x: 49, y: 7 },  { x: 51, y: 7 },
      // mid beach area (9)
      { x: 53, y: 10 }, { x: 55, y: 10 }, { x: 61, y: 10 },
      { x: 64, y: 7 },  { x: 66, y: 4 },  { x: 67, y: 4 },
      { x: 68, y: 10 }, { x: 62, y: 10 }, { x: 69, y: 10 },
      // final areas (9)
      { x: 75, y: 10 }, { x: 77, y: 10 }, { x: 79, y: 7 },
      { x: 81, y: 7 },  { x: 83, y: 10 }, { x: 84, y: 10 },
      { x: 91, y: 10 }, { x: 94, y: 10 }, { x: 104, y: 10 },
    ],
    pancakePosition: { x: 105, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 4: Driftwood Bridge ────────────────────────────────────────
  {
    id: 4,
    name: 'Driftwood Bridge',
    width: 120,
    octopusCount: 8,
    octopusSpeed: 65,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 14, h: 1 },     // starting shore
      { x: 8, y: 9, w: 4, h: 1 },        // driftwood pile
      { x: 20, y: 12, w: 8, h: 1 },      // second island
      { x: 22, y: 9, w: 3, h: 1 },       // small elevation
      { x: 32, y: 12, w: 10, h: 1 },     // bridge landing
      { x: 35, y: 9, w: 4, h: 1 },       // bridge support
      { x: 37, y: 6, w: 3, h: 1 },       // top of bridge
      { x: 46, y: 12, w: 8, h: 1 },      // mid section
      { x: 58, y: 12, w: 12, h: 1 },     // wide beach
      { x: 62, y: 9, w: 5, h: 1 },       // rock shelf
      { x: 64, y: 6, w: 3, h: 1 },       // high point
      { x: 74, y: 12, w: 8, h: 1 },      // next shore
      { x: 86, y: 12, w: 10, h: 1 },     // long section
      { x: 89, y: 9, w: 4, h: 1 },       // elevated
      { x: 100, y: 12, w: 8, h: 1 },     // near end
      { x: 112, y: 12, w: 6, h: 1 },     // final
    ],
    waterZones: [
      { x: 16, w: 4 },                   // first water
      { x: 28, w: 4 },                   // second water
      { x: 54, w: 4 },                   // third water
    ],
    movingPlatforms: [
      { x: 42, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.5 },
      { x: 82, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.6 },
    ],
    spikePositions: [
      { x: 11, y: 11 },
      { x: 25, y: 11 },
      { x: 39, y: 11 },
      { x: 50, y: 11 },
      { x: 68, y: 11 },
      { x: 92, y: 11 },
    ],
    enemyPositions: [
      { x: 7, y: 11, patrolDist: 4 },
      { x: 23, y: 11, patrolDist: 3 },
      { x: 37, y: 11, patrolDist: 4 },
      { x: 49, y: 11, patrolDist: 3 },
      { x: 63, y: 11, patrolDist: 5 },
      { x: 77, y: 11, patrolDist: 3 },
      { x: 91, y: 11, patrolDist: 4 },
      { x: 104, y: 11, patrolDist: 3 },
    ],
    collectiblePositions: [
      // starting shore (9)
      { x: 4, y: 10 },  { x: 6, y: 10 },  { x: 9, y: 7 },
      { x: 11, y: 7 },  { x: 10, y: 10 }, { x: 12, y: 10 },
      { x: 13, y: 10 }, { x: 14, y: 10 }, { x: 15, y: 10 },
      // second island + bridge (9)
      { x: 21, y: 10 }, { x: 23, y: 7 },  { x: 24, y: 10 },
      { x: 26, y: 10 }, { x: 33, y: 10 }, { x: 36, y: 7 },
      { x: 38, y: 4 },  { x: 39, y: 4 },  { x: 40, y: 10 },
      // mid section + moving platform area (9)
      { x: 43, y: 8 },  { x: 47, y: 10 }, { x: 49, y: 10 },
      { x: 51, y: 10 }, { x: 52, y: 10 }, { x: 59, y: 10 },
      { x: 61, y: 10 }, { x: 63, y: 7 },  { x: 65, y: 4 },
      // next shore area (9)
      { x: 66, y: 4 },  { x: 67, y: 10 }, { x: 69, y: 10 },
      { x: 75, y: 10 }, { x: 77, y: 10 }, { x: 79, y: 10 },
      { x: 80, y: 10 }, { x: 83, y: 8 },  { x: 87, y: 10 },
      // final areas (9)
      { x: 90, y: 7 },  { x: 92, y: 7 },  { x: 93, y: 10 },
      { x: 95, y: 10 }, { x: 101, y: 10 }, { x: 103, y: 10 },
      { x: 105, y: 10 }, { x: 107, y: 10 }, { x: 114, y: 10 },
    ],
    pancakePosition: { x: 116, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 5: Sandcastle Run ──────────────────────────────────────────
  {
    id: 5,
    name: 'Sandcastle Run',
    width: 130,
    octopusCount: 10,
    octopusSpeed: 70,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 12, h: 1 },     // start
      { x: 6, y: 9, w: 4, h: 1 },        // sandcastle base
      { x: 8, y: 6, w: 3, h: 1 },        // castle tower
      { x: 18, y: 12, w: 8, h: 1 },      // approach
      { x: 30, y: 12, w: 10, h: 1 },     // courtyard
      { x: 33, y: 9, w: 5, h: 1 },       // castle wall
      { x: 35, y: 6, w: 3, h: 1 },       // turret
      { x: 44, y: 12, w: 6, h: 1 },      // narrow path
      { x: 54, y: 12, w: 10, h: 1 },     // wide castle base
      { x: 57, y: 9, w: 4, h: 1 },       // rampart
      { x: 59, y: 6, w: 3, h: 1 },       // high tower
      { x: 68, y: 12, w: 8, h: 1 },      // outer wall
      { x: 80, y: 12, w: 12, h: 1 },     // grand hall
      { x: 84, y: 9, w: 5, h: 1 },       // throne platform
      { x: 86, y: 6, w: 3, h: 1 },       // throne top
      { x: 96, y: 12, w: 8, h: 1 },      // back garden
      { x: 108, y: 12, w: 10, h: 1 },    // exit path
      { x: 122, y: 12, w: 6, h: 1 },     // final
    ],
    waterZones: [
      { x: 14, w: 4 },
      { x: 26, w: 4 },
      { x: 50, w: 4 },
      { x: 76, w: 4 },
    ],
    movingPlatforms: [
      { x: 40, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.6 },
      { x: 104, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.7 },
    ],
    spikePositions: [
      { x: 10, y: 11 },
      { x: 22, y: 11 },
      { x: 37, y: 11 },
      { x: 47, y: 11 },
      { x: 62, y: 11 },
      { x: 72, y: 11 },
      { x: 88, y: 11 },
      { x: 100, y: 11 },
    ],
    enemyPositions: [
      { x: 8, y: 11, patrolDist: 3 },
      { x: 21, y: 11, patrolDist: 3 },
      { x: 34, y: 11, patrolDist: 4 },
      { x: 46, y: 11, patrolDist: 2 },
      { x: 57, y: 11, patrolDist: 4 },
      { x: 70, y: 11, patrolDist: 3 },
      { x: 83, y: 11, patrolDist: 5 },
      { x: 85, y: 8, patrolDist: 2 },
      { x: 99, y: 11, patrolDist: 3 },
      { x: 112, y: 11, patrolDist: 4 },
    ],
    collectiblePositions: [
      // start + castle (9)
      { x: 4, y: 10 },  { x: 5, y: 10 },  { x: 7, y: 7 },
      { x: 9, y: 4 },   { x: 10, y: 4 },  { x: 11, y: 10 },
      { x: 12, y: 10 }, { x: 13, y: 10 }, { x: 19, y: 10 },
      // approach + courtyard (9)
      { x: 21, y: 10 }, { x: 23, y: 10 }, { x: 25, y: 10 },
      { x: 31, y: 10 }, { x: 34, y: 7 },  { x: 36, y: 4 },
      { x: 37, y: 4 },  { x: 38, y: 10 }, { x: 39, y: 10 },
      // narrow + wide castle (9)
      { x: 41, y: 8 },  { x: 45, y: 10 }, { x: 48, y: 10 },
      { x: 55, y: 10 }, { x: 58, y: 7 },  { x: 60, y: 4 },
      { x: 61, y: 4 },  { x: 63, y: 10 }, { x: 56, y: 10 },
      // outer wall + grand hall (9)
      { x: 69, y: 10 }, { x: 71, y: 10 }, { x: 74, y: 10 },
      { x: 81, y: 10 }, { x: 85, y: 7 },  { x: 87, y: 4 },
      { x: 89, y: 10 }, { x: 90, y: 10 }, { x: 91, y: 10 },
      // garden + exit (9)
      { x: 97, y: 10 }, { x: 99, y: 10 }, { x: 102, y: 10 },
      { x: 105, y: 8 }, { x: 109, y: 10 }, { x: 111, y: 10 },
      { x: 114, y: 10 }, { x: 116, y: 10 }, { x: 124, y: 10 },
    ],
    pancakePosition: { x: 126, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 6: Shipwreck Pass ──────────────────────────────────────────
  {
    id: 6,
    name: 'Shipwreck Pass',
    width: 140,
    octopusCount: 12,
    octopusSpeed: 80,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 10, h: 1 },     // shore
      { x: 6, y: 9, w: 3, h: 1 },        // wreckage
      { x: 16, y: 12, w: 8, h: 1 },      // hull section
      { x: 18, y: 9, w: 4, h: 1 },       // deck piece
      { x: 20, y: 6, w: 3, h: 1 },       // mast
      { x: 28, y: 12, w: 6, h: 1 },      // debris
      { x: 38, y: 12, w: 10, h: 1 },     // sandbar
      { x: 41, y: 9, w: 4, h: 1 },       // timber platform
      { x: 52, y: 12, w: 8, h: 1 },      // beach
      { x: 54, y: 9, w: 3, h: 1 },       // cargo
      { x: 64, y: 12, w: 10, h: 1 },     // wide wreck section
      { x: 67, y: 9, w: 5, h: 1 },       // upper deck
      { x: 69, y: 6, w: 3, h: 1 },       // crow's nest
      { x: 78, y: 12, w: 6, h: 1 },      // plank
      { x: 88, y: 12, w: 10, h: 1 },     // bow section
      { x: 91, y: 9, w: 4, h: 1 },       // rail
      { x: 93, y: 6, w: 3, h: 1 },       // top rail
      { x: 102, y: 12, w: 8, h: 1 },     // stern
      { x: 114, y: 12, w: 10, h: 1 },    // far shore
      { x: 117, y: 9, w: 4, h: 1 },      // final rock
      { x: 128, y: 12, w: 10, h: 1 },    // end beach
    ],
    waterZones: [
      { x: 12, w: 4 },
      { x: 24, w: 4 },
      { x: 34, w: 4 },
      { x: 60, w: 4 },
      { x: 84, w: 4 },
    ],
    movingPlatforms: [
      { x: 48, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.6 },
      { x: 110, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.7 },
    ],
    spikePositions: [
      { x: 9, y: 11 },
      { x: 19, y: 11 },
      { x: 31, y: 11 },
      { x: 43, y: 11 },
      { x: 56, y: 11 },
      { x: 66, y: 11 },
      { x: 80, y: 11 },
      { x: 94, y: 11 },
      { x: 118, y: 11 },
    ],
    enemyPositions: [
      { x: 7, y: 11, patrolDist: 3 },
      { x: 19, y: 11, patrolDist: 3 },
      { x: 21, y: 5, patrolDist: 1 },
      { x: 30, y: 11, patrolDist: 2 },
      { x: 42, y: 11, patrolDist: 4 },
      { x: 55, y: 11, patrolDist: 3 },
      { x: 68, y: 11, patrolDist: 4 },
      { x: 70, y: 5, patrolDist: 1 },
      { x: 80, y: 11, patrolDist: 2 },
      { x: 92, y: 11, patrolDist: 4 },
      { x: 105, y: 11, patrolDist: 3 },
      { x: 131, y: 11, patrolDist: 4 },
    ],
    collectiblePositions: [
      // shore + wreckage (9)
      { x: 4, y: 10 },  { x: 5, y: 10 },  { x: 7, y: 7 },
      { x: 8, y: 7 },   { x: 9, y: 10 },  { x: 10, y: 10 },
      { x: 11, y: 10 }, { x: 17, y: 10 }, { x: 19, y: 7 },
      // hull + debris (9)
      { x: 21, y: 4 },  { x: 22, y: 4 },  { x: 23, y: 10 },
      { x: 29, y: 10 }, { x: 31, y: 10 }, { x: 33, y: 10 },
      { x: 39, y: 10 }, { x: 42, y: 7 },  { x: 44, y: 7 },
      // beach + wide wreck (9)
      { x: 46, y: 10 }, { x: 49, y: 8 },  { x: 53, y: 10 },
      { x: 55, y: 7 },  { x: 56, y: 10 }, { x: 58, y: 10 },
      { x: 65, y: 10 }, { x: 68, y: 7 },  { x: 70, y: 4 },
      // plank + bow (9)
      { x: 71, y: 4 },  { x: 72, y: 10 }, { x: 73, y: 10 },
      { x: 79, y: 10 }, { x: 82, y: 10 }, { x: 89, y: 10 },
      { x: 92, y: 7 },  { x: 94, y: 4 },  { x: 95, y: 4 },
      // stern + end (9)
      { x: 97, y: 10 }, { x: 103, y: 10 }, { x: 106, y: 10 },
      { x: 108, y: 10 }, { x: 111, y: 8 }, { x: 115, y: 10 },
      { x: 118, y: 7 },  { x: 120, y: 7 }, { x: 132, y: 10 },
    ],
    pancakePosition: { x: 135, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 7: Volcano Beach ───────────────────────────────────────────
  {
    id: 7,
    name: 'Volcano Beach',
    width: 150,
    octopusCount: 14,
    octopusSpeed: 85,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 10, h: 1 },     // start lava shore
      { x: 7, y: 9, w: 3, h: 1 },        // volcanic rock
      { x: 16, y: 12, w: 8, h: 1 },      // obsidian beach
      { x: 18, y: 9, w: 4, h: 1 },       // lava ledge
      { x: 20, y: 6, w: 3, h: 1 },       // volcano step
      { x: 28, y: 12, w: 6, h: 1 },      // ash field
      { x: 30, y: 9, w: 3, h: 1 },       // basalt column
      { x: 38, y: 12, w: 8, h: 1 },      // lava flow edge
      { x: 41, y: 9, w: 4, h: 1 },       // elevated basalt
      { x: 43, y: 6, w: 3, h: 1 },       // high column
      { x: 50, y: 12, w: 6, h: 1 },      // narrow pass
      { x: 60, y: 12, w: 10, h: 1 },     // caldera rim
      { x: 63, y: 9, w: 5, h: 1 },       // inner rim
      { x: 74, y: 12, w: 8, h: 1 },      // slope
      { x: 76, y: 9, w: 3, h: 1 },       // rocky shelf
      { x: 86, y: 12, w: 10, h: 1 },     // magma beach
      { x: 89, y: 9, w: 4, h: 1 },       // hot rock
      { x: 91, y: 6, w: 3, h: 1 },       // summit piece
      { x: 100, y: 12, w: 6, h: 1 },     // cooling flow
      { x: 110, y: 12, w: 10, h: 1 },    // wide volcanic flat
      { x: 113, y: 9, w: 4, h: 1 },      // vent
      { x: 124, y: 12, w: 8, h: 1 },     // end approach
      { x: 136, y: 12, w: 12, h: 1 },    // final shore
    ],
    waterZones: [
      { x: 12, w: 4 },
      { x: 24, w: 4 },
      { x: 46, w: 4 },
      { x: 56, w: 4 },
      { x: 82, w: 4 },
    ],
    movingPlatforms: [
      { x: 34, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.7 },
      { x: 70, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.8 },
      { x: 106, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.7 },
    ],
    spikePositions: [
      { x: 9, y: 11 },
      { x: 17, y: 11 },
      { x: 29, y: 11 },
      { x: 40, y: 11 },
      { x: 52, y: 11 },
      { x: 62, y: 11 },
      { x: 75, y: 11 },
      { x: 88, y: 11 },
      { x: 102, y: 11 },
      { x: 114, y: 11 },
      { x: 126, y: 11 },
    ],
    enemyPositions: [
      { x: 6, y: 11, patrolDist: 3 },
      { x: 19, y: 11, patrolDist: 3 },
      { x: 21, y: 5, patrolDist: 1 },
      { x: 31, y: 11, patrolDist: 2 },
      { x: 42, y: 11, patrolDist: 3 },
      { x: 44, y: 5, patrolDist: 1 },
      { x: 53, y: 11, patrolDist: 2 },
      { x: 65, y: 11, patrolDist: 4 },
      { x: 77, y: 11, patrolDist: 3 },
      { x: 90, y: 11, patrolDist: 4 },
      { x: 92, y: 5, patrolDist: 1 },
      { x: 103, y: 11, patrolDist: 2 },
      { x: 115, y: 11, patrolDist: 4 },
      { x: 140, y: 11, patrolDist: 5 },
    ],
    collectiblePositions: [
      // lava shore area (9)
      { x: 4, y: 10 },  { x: 5, y: 10 },  { x: 8, y: 7 },
      { x: 9, y: 7 },   { x: 10, y: 10 }, { x: 17, y: 10 },
      { x: 19, y: 7 },  { x: 21, y: 4 },  { x: 22, y: 4 },
      // ash field + lava flow (9)
      { x: 29, y: 10 }, { x: 31, y: 7 },  { x: 32, y: 10 },
      { x: 35, y: 8 },  { x: 39, y: 10 }, { x: 42, y: 7 },
      { x: 44, y: 4 },  { x: 45, y: 4 },  { x: 40, y: 10 },
      // narrow pass + caldera (9)
      { x: 51, y: 10 }, { x: 53, y: 10 }, { x: 54, y: 10 },
      { x: 61, y: 10 }, { x: 64, y: 7 },  { x: 66, y: 7 },
      { x: 67, y: 10 }, { x: 69, y: 10 }, { x: 71, y: 8 },
      // slope + magma beach (9)
      { x: 75, y: 10 }, { x: 77, y: 7 },  { x: 78, y: 7 },
      { x: 80, y: 10 }, { x: 87, y: 10 }, { x: 90, y: 7 },
      { x: 92, y: 4 },  { x: 93, y: 4 },  { x: 95, y: 10 },
      // cooling + final (9)
      { x: 101, y: 10 }, { x: 104, y: 10 }, { x: 107, y: 8 },
      { x: 111, y: 10 }, { x: 114, y: 7 },  { x: 116, y: 7 },
      { x: 125, y: 10 }, { x: 130, y: 10 }, { x: 142, y: 10 },
    ],
    pancakePosition: { x: 145, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 8: Coral Maze ──────────────────────────────────────────────
  {
    id: 8,
    name: 'Coral Maze',
    width: 160,
    octopusCount: 16,
    octopusSpeed: 90,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 8, h: 1 },      // entrance
      { x: 5, y: 9, w: 3, h: 1 },        // first coral
      { x: 14, y: 12, w: 6, h: 1 },      // narrow ledge
      { x: 16, y: 9, w: 3, h: 1 },       // coral branch
      { x: 24, y: 12, w: 8, h: 1 },      // reef flat
      { x: 27, y: 9, w: 4, h: 1 },       // mid coral
      { x: 29, y: 6, w: 3, h: 1 },       // high branch
      { x: 36, y: 12, w: 6, h: 1 },      // gap section
      { x: 46, y: 12, w: 8, h: 1 },      // maze center
      { x: 49, y: 9, w: 4, h: 1 },       // coral shelf
      { x: 51, y: 6, w: 3, h: 1 },       // upper maze
      { x: 58, y: 12, w: 6, h: 1 },      // narrow
      { x: 68, y: 12, w: 8, h: 1 },      // wide coral bed
      { x: 71, y: 9, w: 4, h: 1 },       // shelf
      { x: 73, y: 6, w: 3, h: 1 },       // peak
      { x: 80, y: 12, w: 6, h: 1 },      // passage
      { x: 90, y: 12, w: 10, h: 1 },     // open area
      { x: 93, y: 9, w: 5, h: 1 },       // platform
      { x: 95, y: 6, w: 3, h: 1 },       // high coral
      { x: 104, y: 12, w: 6, h: 1 },     // narrow
      { x: 114, y: 12, w: 8, h: 1 },     // reef section
      { x: 117, y: 9, w: 4, h: 1 },      // elevated
      { x: 126, y: 12, w: 6, h: 1 },     // approach
      { x: 136, y: 12, w: 8, h: 1 },     // near end
      { x: 148, y: 12, w: 10, h: 1 },    // final reef
    ],
    waterZones: [
      { x: 10, w: 4 },
      { x: 20, w: 4 },
      { x: 42, w: 4 },
      { x: 64, w: 4 },
      { x: 86, w: 4 },
      { x: 110, w: 4 },
    ],
    movingPlatforms: [
      { x: 32, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.7 },
      { x: 54, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.8 },
      { x: 100, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.8 },
    ],
    spikePositions: [
      { x: 7, y: 11 },
      { x: 15, y: 11 },
      { x: 26, y: 11 },
      { x: 38, y: 11 },
      { x: 48, y: 11 },
      { x: 60, y: 11 },
      { x: 70, y: 11 },
      { x: 82, y: 11 },
      { x: 92, y: 11 },
      { x: 106, y: 11 },
      { x: 116, y: 11 },
      { x: 128, y: 11 },
      { x: 140, y: 11 },
    ],
    enemyPositions: [
      { x: 6, y: 11, patrolDist: 2 },
      { x: 15, y: 11, patrolDist: 2 },
      { x: 17, y: 8, patrolDist: 1 },
      { x: 28, y: 11, patrolDist: 3 },
      { x: 30, y: 5, patrolDist: 1 },
      { x: 38, y: 11, patrolDist: 2 },
      { x: 50, y: 11, patrolDist: 3 },
      { x: 52, y: 5, patrolDist: 1 },
      { x: 60, y: 11, patrolDist: 2 },
      { x: 72, y: 11, patrolDist: 3 },
      { x: 74, y: 5, patrolDist: 1 },
      { x: 82, y: 11, patrolDist: 2 },
      { x: 94, y: 11, patrolDist: 4 },
      { x: 106, y: 11, patrolDist: 2 },
      { x: 118, y: 11, patrolDist: 3 },
      { x: 150, y: 11, patrolDist: 4 },
    ],
    collectiblePositions: [
      // entrance + narrow ledge (9)
      { x: 4, y: 10 },  { x: 6, y: 7 },   { x: 7, y: 7 },
      { x: 8, y: 10 },  { x: 9, y: 10 },  { x: 15, y: 10 },
      { x: 17, y: 7 },  { x: 18, y: 7 },  { x: 19, y: 10 },
      // reef flat + gap section (9)
      { x: 25, y: 10 }, { x: 28, y: 7 },  { x: 30, y: 4 },
      { x: 31, y: 4 },  { x: 27, y: 10 }, { x: 33, y: 8 },
      { x: 37, y: 10 }, { x: 39, y: 10 }, { x: 40, y: 10 },
      // maze center + narrow (9)
      { x: 47, y: 10 }, { x: 50, y: 7 },  { x: 52, y: 4 },
      { x: 53, y: 4 },  { x: 48, y: 10 }, { x: 55, y: 8 },
      { x: 59, y: 10 }, { x: 61, y: 10 }, { x: 62, y: 10 },
      // wide coral + passage (9)
      { x: 69, y: 10 }, { x: 72, y: 7 },  { x: 74, y: 4 },
      { x: 75, y: 4 },  { x: 70, y: 10 }, { x: 76, y: 10 },
      { x: 81, y: 10 }, { x: 83, y: 10 }, { x: 84, y: 10 },
      // open area + final (9)
      { x: 91, y: 10 }, { x: 94, y: 7 },  { x: 96, y: 4 },
      { x: 97, y: 4 },  { x: 101, y: 8 }, { x: 105, y: 10 },
      { x: 115, y: 10 }, { x: 127, y: 10 }, { x: 152, y: 10 },
    ],
    pancakePosition: { x: 155, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 9: Tsunami Trail ───────────────────────────────────────────
  {
    id: 9,
    name: 'Tsunami Trail',
    width: 170,
    octopusCount: 18,
    octopusSpeed: 95,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 8, h: 1 },      // start shore
      { x: 5, y: 9, w: 3, h: 1 },        // debris
      { x: 14, y: 12, w: 6, h: 1 },      // wave break
      { x: 16, y: 9, w: 3, h: 1 },       // wreckage
      { x: 24, y: 12, w: 6, h: 1 },      // sandbank
      { x: 26, y: 9, w: 3, h: 1 },       // flotsam
      { x: 28, y: 6, w: 3, h: 1 },       // high debris
      { x: 34, y: 12, w: 8, h: 1 },      // broken shore
      { x: 37, y: 9, w: 4, h: 1 },       // reef
      { x: 46, y: 12, w: 6, h: 1 },      // narrow island
      { x: 48, y: 9, w: 3, h: 1 },       // rock
      { x: 56, y: 12, w: 8, h: 1 },      // wide bank
      { x: 59, y: 9, w: 4, h: 1 },       // elevated
      { x: 61, y: 6, w: 3, h: 1 },       // high rock
      { x: 68, y: 12, w: 6, h: 1 },      // strip
      { x: 78, y: 12, w: 8, h: 1 },      // surge zone
      { x: 81, y: 9, w: 4, h: 1 },       // platform
      { x: 83, y: 6, w: 3, h: 1 },       // high wave
      { x: 90, y: 12, w: 6, h: 1 },      // narrow
      { x: 100, y: 12, w: 8, h: 1 },     // mid trail
      { x: 103, y: 9, w: 4, h: 1 },      // shelf
      { x: 112, y: 12, w: 6, h: 1 },     // island
      { x: 122, y: 12, w: 8, h: 1 },     // wide approach
      { x: 125, y: 9, w: 4, h: 1 },      // crest
      { x: 127, y: 6, w: 3, h: 1 },      // peak
      { x: 134, y: 12, w: 6, h: 1 },     // near end
      { x: 144, y: 12, w: 8, h: 1 },     // penultimate
      { x: 156, y: 12, w: 12, h: 1 },    // final shore
    ],
    waterZones: [
      { x: 10, w: 4 },
      { x: 20, w: 4 },
      { x: 30, w: 4 },
      { x: 42, w: 4 },
      { x: 52, w: 4 },
      { x: 64, w: 4 },
      { x: 74, w: 4 },
    ],
    movingPlatforms: [
      { x: 86, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.8 },
      { x: 96, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.9 },
      { x: 108, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.8 },
      { x: 140, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.9 },
    ],
    spikePositions: [
      { x: 7, y: 11 },
      { x: 15, y: 11 },
      { x: 25, y: 11 },
      { x: 36, y: 11 },
      { x: 47, y: 11 },
      { x: 58, y: 11 },
      { x: 69, y: 11 },
      { x: 80, y: 11 },
      { x: 92, y: 11 },
      { x: 102, y: 11 },
      { x: 114, y: 11 },
      { x: 124, y: 11 },
      { x: 136, y: 11 },
      { x: 148, y: 11 },
      { x: 160, y: 11 },
    ],
    enemyPositions: [
      { x: 6, y: 11, patrolDist: 2 },
      { x: 15, y: 11, patrolDist: 2 },
      { x: 17, y: 8, patrolDist: 1 },
      { x: 27, y: 11, patrolDist: 2 },
      { x: 29, y: 5, patrolDist: 1 },
      { x: 38, y: 11, patrolDist: 3 },
      { x: 49, y: 11, patrolDist: 2 },
      { x: 60, y: 11, patrolDist: 3 },
      { x: 62, y: 5, patrolDist: 1 },
      { x: 70, y: 11, patrolDist: 2 },
      { x: 82, y: 11, patrolDist: 3 },
      { x: 84, y: 5, patrolDist: 1 },
      { x: 92, y: 11, patrolDist: 2 },
      { x: 104, y: 11, patrolDist: 3 },
      { x: 114, y: 11, patrolDist: 2 },
      { x: 126, y: 11, patrolDist: 3 },
      { x: 146, y: 11, patrolDist: 3 },
      { x: 162, y: 11, patrolDist: 5 },
    ],
    collectiblePositions: [
      // start + wave break (9)
      { x: 4, y: 10 },  { x: 6, y: 7 },   { x: 7, y: 7 },
      { x: 8, y: 10 },  { x: 9, y: 10 },  { x: 15, y: 10 },
      { x: 17, y: 7 },  { x: 18, y: 7 },  { x: 19, y: 10 },
      // sandbank + broken shore (9)
      { x: 25, y: 10 }, { x: 27, y: 7 },  { x: 29, y: 4 },
      { x: 30, y: 4 },  { x: 35, y: 10 }, { x: 38, y: 7 },
      { x: 40, y: 7 },  { x: 36, y: 10 }, { x: 41, y: 10 },
      // narrow island + wide bank (9)
      { x: 47, y: 10 }, { x: 49, y: 7 },  { x: 50, y: 7 },
      { x: 57, y: 10 }, { x: 60, y: 7 },  { x: 62, y: 4 },
      { x: 63, y: 4 },  { x: 58, y: 10 }, { x: 69, y: 10 },
      // surge zone + narrow (9)
      { x: 79, y: 10 }, { x: 82, y: 7 },  { x: 84, y: 4 },
      { x: 85, y: 4 },  { x: 80, y: 10 }, { x: 87, y: 8 },
      { x: 91, y: 10 }, { x: 93, y: 10 }, { x: 97, y: 8 },
      // mid trail to final (9)
      { x: 101, y: 10 }, { x: 104, y: 7 }, { x: 106, y: 7 },
      { x: 109, y: 8 },  { x: 113, y: 10 }, { x: 123, y: 10 },
      { x: 128, y: 4 },  { x: 135, y: 10 }, { x: 160, y: 10 },
    ],
    pancakePosition: { x: 165, y: 11 },
    playerStart: { x: 4, y: 10 },
  },

  // ── Level 10: Kraken's Cove ──────────────────────────────────────────
  {
    id: 10,
    name: "Kraken's Cove",
    width: 200,
    octopusCount: 20,
    octopusSpeed: 100,
    collectibleCount: 45,
    platforms: [
      { x: 2, y: 12, w: 8, h: 1 },      // cove entrance
      { x: 5, y: 9, w: 3, h: 1 },        // rock
      { x: 3, y: 6, w: 3, h: 1 },        // high perch
      { x: 14, y: 12, w: 6, h: 1 },      // first island
      { x: 16, y: 9, w: 3, h: 1 },       // ledge
      { x: 24, y: 12, w: 4, h: 1 },      // tiny island
      { x: 32, y: 12, w: 6, h: 1 },      // reef
      { x: 34, y: 9, w: 3, h: 1 },       // coral top
      { x: 36, y: 6, w: 3, h: 1 },       // high coral
      { x: 42, y: 12, w: 8, h: 1 },      // kraken's reach
      { x: 45, y: 9, w: 4, h: 1 },       // tentacle dodge
      { x: 54, y: 12, w: 4, h: 1 },      // stepping stone
      { x: 62, y: 12, w: 6, h: 1 },      // craggy shore
      { x: 64, y: 9, w: 3, h: 1 },       // barnacle rock
      { x: 66, y: 6, w: 3, h: 1 },       // lookout
      { x: 72, y: 12, w: 4, h: 1 },      // narrow
      { x: 80, y: 12, w: 8, h: 1 },      // mid cove
      { x: 83, y: 9, w: 4, h: 1 },       // shelf
      { x: 85, y: 6, w: 3, h: 1 },       // upper shelf
      { x: 92, y: 12, w: 4, h: 1 },      // tiny spit
      { x: 100, y: 12, w: 6, h: 1 },     // wider ground
      { x: 102, y: 9, w: 3, h: 1 },      // elevation
      { x: 110, y: 12, w: 4, h: 1 },     // strip
      { x: 118, y: 12, w: 8, h: 1 },     // kraken's den
      { x: 121, y: 9, w: 4, h: 1 },      // bone pile
      { x: 123, y: 6, w: 3, h: 1 },      // skull top
      { x: 130, y: 12, w: 6, h: 1 },     // escape path
      { x: 140, y: 12, w: 8, h: 1 },     // deep section
      { x: 143, y: 9, w: 4, h: 1 },      // rock
      { x: 145, y: 6, w: 3, h: 1 },      // peak
      { x: 152, y: 12, w: 4, h: 1 },     // tiny
      { x: 160, y: 12, w: 6, h: 1 },     // cove wall
      { x: 162, y: 9, w: 3, h: 1 },      // wall ledge
      { x: 170, y: 12, w: 8, h: 1 },     // near exit
      { x: 182, y: 12, w: 6, h: 1 },     // exit approach
      { x: 192, y: 12, w: 6, h: 1 },     // final
    ],
    waterZones: [
      { x: 10, w: 4 },
      { x: 20, w: 4 },
      { x: 28, w: 4 },
      { x: 50, w: 4 },
      { x: 58, w: 4 },
      { x: 68, w: 4 },
      { x: 76, w: 4 },
      { x: 96, w: 4 },
    ],
    movingPlatforms: [
      { x: 38, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.8 },
      { x: 88, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 0.9 },
      { x: 106, y: 10, w: 3, h: 1, moveX: 0, moveY: -3, speed: 0.9 },
      { x: 136, y: 10, w: 3, h: 1, moveX: 3, moveY: 0, speed: 1.0 },
      { x: 156, y: 10, w: 3, h: 1, moveX: 0, moveY: -4, speed: 0.9 },
    ],
    spikePositions: [
      { x: 7, y: 11 },
      { x: 15, y: 11 },
      { x: 25, y: 11 },
      { x: 33, y: 11 },
      { x: 44, y: 11 },
      { x: 55, y: 11 },
      { x: 63, y: 11 },
      { x: 73, y: 11 },
      { x: 82, y: 11 },
      { x: 93, y: 11 },
      { x: 103, y: 11 },
      { x: 111, y: 11 },
      { x: 120, y: 11 },
      { x: 131, y: 11 },
      { x: 142, y: 11 },
      { x: 153, y: 11 },
      { x: 163, y: 11 },
      { x: 172, y: 11 },
    ],
    enemyPositions: [
      { x: 6, y: 11, patrolDist: 2 },
      { x: 4, y: 5, patrolDist: 1 },
      { x: 15, y: 11, patrolDist: 2 },
      { x: 17, y: 8, patrolDist: 1 },
      { x: 25, y: 11, patrolDist: 1 },
      { x: 35, y: 11, patrolDist: 2 },
      { x: 37, y: 5, patrolDist: 1 },
      { x: 46, y: 11, patrolDist: 3 },
      { x: 55, y: 11, patrolDist: 1 },
      { x: 65, y: 11, patrolDist: 2 },
      { x: 67, y: 5, patrolDist: 1 },
      { x: 73, y: 11, patrolDist: 1 },
      { x: 84, y: 11, patrolDist: 3 },
      { x: 86, y: 5, patrolDist: 1 },
      { x: 103, y: 11, patrolDist: 2 },
      { x: 122, y: 11, patrolDist: 3 },
      { x: 124, y: 5, patrolDist: 1 },
      { x: 144, y: 11, patrolDist: 3 },
      { x: 171, y: 11, patrolDist: 4 },
      { x: 194, y: 11, patrolDist: 2 },
    ],
    collectiblePositions: [
      // cove entrance (9)
      { x: 4, y: 10 },  { x: 6, y: 7 },   { x: 4, y: 4 },
      { x: 5, y: 4 },   { x: 8, y: 10 },  { x: 9, y: 10 },
      { x: 15, y: 10 }, { x: 17, y: 7 },  { x: 18, y: 7 },
      // first islands (9)
      { x: 25, y: 10 }, { x: 26, y: 10 }, { x: 33, y: 10 },
      { x: 35, y: 7 },  { x: 37, y: 4 },  { x: 38, y: 4 },
      { x: 39, y: 8 },  { x: 43, y: 10 }, { x: 46, y: 7 },
      // kraken's reach area (9)
      { x: 48, y: 7 },  { x: 55, y: 10 }, { x: 56, y: 10 },
      { x: 63, y: 10 }, { x: 65, y: 7 },  { x: 67, y: 4 },
      { x: 68, y: 4 },  { x: 73, y: 10 }, { x: 75, y: 10 },
      // mid cove (9)
      { x: 81, y: 10 }, { x: 84, y: 7 },  { x: 86, y: 4 },
      { x: 87, y: 4 },  { x: 89, y: 8 },  { x: 93, y: 10 },
      { x: 94, y: 10 }, { x: 101, y: 10 }, { x: 103, y: 7 },
      // kraken's den to final (9)
      { x: 107, y: 8 },  { x: 111, y: 10 }, { x: 119, y: 10 },
      { x: 122, y: 7 },  { x: 124, y: 4 },  { x: 131, y: 10 },
      { x: 141, y: 10 }, { x: 161, y: 10 }, { x: 194, y: 10 },
    ],
    pancakePosition: { x: 196, y: 11 },
    playerStart: { x: 4, y: 10 },
  },
];
