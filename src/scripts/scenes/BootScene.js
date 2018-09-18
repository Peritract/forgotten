//Functions
import animationSetUp from '../utilities/animationSetUp.js';

export default class BootScene extends Phaser.Scene {
	preload(){
		//setup the progress bar
		
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0xffffff,0);
		progressBox.fillRect(240, 190, 200, 20);
		
		//Load resources used by all scenes.
		this.load.on('progress', function (value) {
			progressBar.clear();
			progressBar.fillStyle(0xac3232);
			progressBar.fillRect(245, 195, 190 * value, 10);
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
		});
		
		this.load.audio("coin_gain", './assets/coin1.wav')
		this.load.audio("life_gain", './assets/life1.wav')
		this.load.audio("key_gain", './assets/key1.wav')
		this.load.audio("theme", "./assets/theme.wav")
		this.load.spritesheet("playerSprite", './assets/oubliette-tileset-extruded.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2});
		this.load.image("tileset", './assets/oubliette-tileset-extruded.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2}); 
	}
	
	create(){
		//Set up animations to be used by all scenes. 
		animationSetUp(this, "playerSprite");
		this.sound.add("theme").play({loop: true});		
		
		this.scene.start("MainScene");		
	}
}