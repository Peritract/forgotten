import Player from '../utilities/Player.js';
import createLevel from '../utilities/createLevel.js';
import populateLevel from '../utilities/populateLevel.js';
import UI from '../utilities/UI.js';

export default class LevelScene extends Phaser.Scene {
	
	init(data){
		this.data = data; //store any information that has been passed in. 
	}

	preload(){
		//load the level in.
		this.level_tag = "level_1"; //load first level as a default.
		if (this.data.level){
			this.level_tag = this.data.level;
		}
		this.load.tilemapTiledJSON(this.level_tag, './assets/levels/' + this.level_tag + '.json')
	}
	
	create(){
		//Make the map and layers.
		createLevel(this, this.level_tag,"oubliette-tileset-extruded","tileset");
		
		//Create the background, should there be one.
		this.map.createStaticLayer("background", this.map_layers, 0, 0);
		
		//Set up the tiles that directly interact with the player - mostly just walls
		this.midground = this.map.createDynamicLayer("midground", this.map_layers, 0, 0);
		this.midground.setCollisionByProperty({ block: true });
		
		//Create the player and place them at the level's spawn point
		let player_origin = this.map.findObject("objects", obj => obj.name === "player_origin");
		this.player = new Player(this, "playerSprite", player_origin.x, player_origin.y, this.data);
		
		//Set collision groups for non-player objects.
		this.fireGroup = this.physics.add.staticGroup();
		this.collectGroup = this.physics.add.staticGroup();
		this.doorGroup = this.physics.add.staticGroup();
		
		this.midground.forEachTile(tile => {
			//check if each tile should be replaced with a sprite.
			populateLevel(this, this.midground, tile);
		});
	
		//Set collisions between objects & groups of objects.
		this.physics.add.collider(this.player.sprite, this.midground); //makes blocks solid on map
		this.physics.add.overlap(this.player.sprite, this.collectGroup, (a,b) => this.player.collect(b), null, this);
		this.physics.add.overlap(this.player.sprite, this.fireGroup, () => this.player.die(), null, this);
		this.physics.add.overlap(this.player.sprite, this.doorGroup, (a,b) => console.log(b.name, b.state), null, this);
		
		
		//Create the foreground, should there be one. Tiles on this level appear
		//in front of the player & other sprites.
		this.map.createStaticLayer("foreground", this.map_layers, 0, 0).setDepth(2);
		
		//Set the camera to follow the player
		this.camera = this.cameras.main;
		this.camera.setDeadzone(50,50);
		//this.camera.setZoom(2);
		this.camera.startFollow(this.player.sprite, false, 0.8, 0.8);
		
		// Add UI elements:
		this.UI = new UI(this);
	}

	update(){
		if (this.player.mode == "normal"){
			//Player update/render
			this.player.control();
			this.player.render();
		
			//Other update/render
			this.UI.updateAll(this.player);
			
		} else if (this.player.mode == "destroyed"){
			this.scene.start("MainScene");
		} else if (this.player.mode == "victory"){
			let data  = {
				lives: this.player.lives,
				score: this.player.score
			}			
			this.scene.start("LevelScene", data);
		}
	}
}
