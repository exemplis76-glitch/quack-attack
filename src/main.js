import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, GRAVITY } from './config/gameConfig.js';
import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import LevelSelectScene from './scenes/LevelSelectScene.js';
import CharacterStoreScene from './scenes/CharacterStoreScene.js';
import GameScene from './scenes/GameScene.js';
import UIScene from './scenes/UIScene.js';
import LevelCompleteScene from './scenes/LevelCompleteScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import BeachMenuScene from './scenes/BeachMenuScene.js';
import BeachLevelSelectScene from './scenes/BeachLevelSelectScene.js';
import BeachCharacterStoreScene from './scenes/BeachCharacterStoreScene.js';
import LavaMenuScene from './scenes/LavaMenuScene.js';
import LavaLevelSelectScene from './scenes/LavaLevelSelectScene.js';
import LavaCharacterStoreScene from './scenes/LavaCharacterStoreScene.js';

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GRAVITY },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    BootScene,
    PreloadScene,
    MainMenuScene,
    LevelSelectScene,
    CharacterStoreScene,
    GameScene,
    UIScene,
    LevelCompleteScene,
    GameOverScene,
    BeachMenuScene,
    BeachLevelSelectScene,
    BeachCharacterStoreScene,
    LavaMenuScene,
    LavaLevelSelectScene,
    LavaCharacterStoreScene,
  ],
};

const game = new Phaser.Game(config);
