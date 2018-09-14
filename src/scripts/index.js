import 'phaser'

import '../styles/index.css';

import {SimpleScene} from './scenes/simple-scene';

const gameConfig = {
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: false
        }
    },
	antialias: false, //Stops jittering on static layers when the camera moves.
	width: 680,
	height: 400,
	scene: SimpleScene
};

new Phaser.Game(gameConfig);