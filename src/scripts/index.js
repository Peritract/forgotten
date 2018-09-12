import 'phaser'

import '../styles/index.css';

import {SimpleScene} from './scenes/simple-scene';

const gameConfig = {
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },	
	width: 680,
	height: 400,
	scene: SimpleScene
};

new Phaser.Game(gameConfig);

console.log("connected")