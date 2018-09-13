import playerSprite from '../../assets/industrial_man.png';
import tileset from '../../assets/industrial_tiles.png';
import level from '../../levels/base_level.json';
import Player from '../utilities/Player.js';
import createLevel from '../utilities/createLevel.js';

import tom from '../../assets/tom.png';

export class SimpleScene extends Phaser.Scene {
	preload(){
		this.load.spritesheet("playerSprite",playerSprite, { frameWidth: 32, frameHeight: 32, margin: 1, spacing: 2});
		this.load.image("tileset", tileset, { frameWidth: 32, frameHeight: 32, margin: 1, spacing: 2}); 
		this.load.tilemapTiledJSON("level", level);
		
		//this.load.spritesheet("tom",tom, { frameWidth: 32, frameHeight: 32 });
	}
	
	create(){		
		createLevel(this, "level","industrial_tiles","tileset");
		this.player = new Player(this, "playerSprite", 100, 50);
		//this.tom = new Player(this, "tom", 50,50)
		
		const camera = this.cameras.main;
		camera.startFollow(this.player.sprite);
	}
	
	update(){
		this.player.control()
		this.player.render()
		
		//this.tom.control()
		//this.tom.render()
	}
}
