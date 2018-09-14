import oubliette from '../../assets/oubliette-tileset-extruded.png';

import level from '../../levels/base_level.json';

import Player from '../utilities/Player.js';
import createLevel from '../utilities/createLevel.js';
import populateLevel from '../utilities/populateLevel.js';
import generalSetUp from '../utilities/generalSetUp.js';
import UI from '../utilities/UI.js';

export class SimpleScene extends Phaser.Scene {
	preload(){
		this.load.spritesheet("playerSprite", oubliette, { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2});
		this.load.image("tileset", oubliette, { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2}); 
		this.load.tilemapTiledJSON("level", level);
	}
	
	create(){
		//load the level in.
		createLevel(this, "level","oubliette-tileset-extruded","tileset");
		
		//Set up sundries - should eventually be deprecated
		generalSetUp(this, "playerSprite");
		
		//Create the background, should there be one.
		this.map.createStaticLayer("background", this.map_layers, 0, 0);
		
		//Set up the tiles that directly interact with the player - mostly just walls
		this.midground = this.map.createDynamicLayer("midground", this.map_layers, 0, 0);
		this.midground.setCollisionByProperty({ block: true });
		
		//Create the player and place them at the level's spawn point
		let player_origin = this.map.findObject("objects", obj => obj.name === "player_origin");
		this.player = new Player(this, "playerSprite", player_origin.x, player_origin.y);
		
		//Set collision groups for non-player objects.
		this.fireGroup = this.physics.add.staticGroup();
		this.coinGroup = this.physics.add.staticGroup();
		
		this.midground.forEachTile(tile => {
			//check if each tile should be replaced with a sprite.
			populateLevel(this, this.midground, tile);
		});
	
		//Set collisions between objects & groups of objects.
		this.physics.add.collider(this.player.sprite, this.midground); //makes blocks solid on map
		this.physics.add.overlap(this.player.sprite, this.coinGroup, (a,b) => this.player.collect(b), null, this);
		this.physics.add.overlap(this.player.sprite, this.fireGroup, () => this.player.die(), null, this);
		
		
		//Create the foreground, should there be one. Tiles on this level appear
		//in front of the player & other sprites.
		this.map.createStaticLayer("foreground", this.map_layers, 0, 0);
		
		
		// Add UI elements:
		this.UI = new UI(this);
		
		//Set the camera to follow the player
		this.camera = this.cameras.main;
		this.camera.setDeadzone(50,50);
		this.camera.setZoom(2);
		this.camera.startFollow(this.player.sprite, false, 0.8, 0.8);
	}

	update(){
		//Player update/render
		this.player.control()
		this.player.render()
		
		//Other update/render
		this.UI.updateAll(this.player);
	}
}
