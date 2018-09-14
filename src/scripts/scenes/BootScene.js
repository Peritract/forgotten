//Functions
import animationSetUp from '../utilities/animationSetUp.js';

export default class BootScene extends Phaser.Scene {
	preload(){
		//Load resources used by all scenes.
		this.load.spritesheet("playerSprite", './assets/oubliette-tileset-extruded.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2});
		this.load.image("tileset", './assets/oubliette-tileset-extruded.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2}); 
	}
	
	create(){
		//Set up animations to be used by all scenes. 
		animationSetUp(this, "playerSprite");
		this.scene.start("MainScene");
	}
}