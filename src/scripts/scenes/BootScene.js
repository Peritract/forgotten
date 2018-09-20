//Functions
import animationSetUp from '../utilities/animationSetUp.js';

export default class BootScene extends Phaser.Scene {
	preload(){
		
		//setup the progress bar
		let progressBar = this.add.graphics().setDepth(2); //Make the bar appear on top, not with.
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0xffffff,1);
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
		
		this.load.image("dust", './assets/dust.png')
		this.load.image("blood", './assets/blood.png')
		
		this.load.spritesheet("playerSprite", './assets/oubliette-tileset-extruded.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2});
		this.load.image("tileset", './assets/oubliette-tileset-extruded.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2}); 
		
		let max_level = 8
		//load the level in.
		for (let i = 1; i <= max_level; i++){
			this.load.tilemapTiledJSON(i, './assets/levels/level_' + i + '.json')
		}  
	}
	
	create(){
		//Set up sounds
		this.sound.add("coin_gain");
		this.sound.add("life_gain");
		this.sound.add("key_gain");
		
		//Start the music
		this.sound.play("theme", {loop: true});
		
		//Set up animations to be used by all scenes. 
		animationSetUp(this, "playerSprite");
		
		this.input.keyboard.on('keydown_M', function (event) {
			this.sound.mute = !this.sound.mute;
		}.bind(this));	
		
		this.scene.launch("MainScene");		
	}
	
}