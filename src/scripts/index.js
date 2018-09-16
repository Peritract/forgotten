import 'phaser'

import '../styles/index.css';

import BootScene from './scenes/BootScene.js';
import MainScene from './scenes/MainScene.js';
import LevelScene from './scenes/LevelScene.js';

const gameConfig = {
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
	antialias: false, //Stops jittering on static layers when the camera moves.
	width: 680,
	height: 400,
	scene: BootScene
};

let game = new Phaser.Game(gameConfig);
game.scene.add("MainScene", MainScene);
game.scene.add("LevelScene", LevelScene);