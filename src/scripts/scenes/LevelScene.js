import Player from '../utilities/Player.js';
import createLevel from '../utilities/createLevel.js';
import populateLevel from '../utilities/populateLevel.js';
import UI from '../utilities/UI.js';

export default class LevelScene extends Phaser.Scene {
	
	create(){
		//Make the map and layers.
		createLevel(this, this.registry.get("level"), "oubliette-tileset-extruded","tileset");
		
		//Create the background, should there be one.
		this.map.createStaticLayer("background", this.map_layers, 0, 0);
		
		//Set up the tiles that directly interact with the player - mostly just walls
		this.midground = this.map.createDynamicLayer("midground", this.map_layers, 0, 0);
		this.midground.setCollisionByProperty({ block: true });
		
		//Create the player and place them at the level's spawn point
		let player_origin = this.map.findObject("objects", obj => obj.name === "player_origin");
		this.player = new Player(this, "playerSprite", player_origin.x, player_origin.y, this.registry);
		
		//Set collision groups for non-player objects.
		this.fireGroup = this.physics.add.staticGroup();
		this.collectGroup = this.physics.add.staticGroup();
		this.doorGroup = this.physics.add.staticGroup();
		this.voidGroup = this.physics.add.staticGroup();
		this.enemyGroup = this.physics.add.group();
		this.invisibleWallGroup = this.physics.add.staticGroup();
		this.messageGroup = this.physics.add.staticGroup();
		
		this.midground.forEachTile(tile => {
			//check if each tile should be replaced with a sprite.
			populateLevel(this, this.midground, tile);
		});
	
		//Set collisions between objects & groups of objects.
		
		//Player collisions
		this.physics.add.collider(this.player.sprite, this.midground, (a,b) => this.player.checkWall(), null, this); //makes blocks solid on map
		this.physics.add.overlap(this.player.sprite, this.collectGroup, (a,b) => this.player.collect(b), null, this);
		this.physics.add.overlap(this.player.sprite, this.fireGroup, () => this.player.killed(), null, this);
		this.physics.add.overlap(this.player.sprite, this.doorGroup, (a,b) => this.player.open(b), null, this);
		this.physics.add.overlap(this.player.sprite, this.voidGroup, (a,b) => this.player.fell(), null, this);
		this.physics.add.overlap(this.player.sprite, this.enemyGroup, (a,b) => this.player.killed(), null, this);
		this.physics.add.overlap(this.player.sprite, this.messageGroup, (a,b) => this.UI.setMessage(b.message), null, this);
		
		//Enemy collisions
		this.physics.add.collider(this.enemyGroup, this.midground);
		this.physics.add.overlap(this.enemyGroup, this.invisibleWallGroup, (a,b)=> a.soul.turn(), null, this);
		this.physics.add.overlap(this.enemyGroup, this.fireGroup, (a,b) => a.soul.killed(), null, this);
		this.physics.add.overlap(this.enemyGroup, this.voidGroup, (a,b) => a.soul.fell(), null, this);
		
		//Create the foreground, should there be one. Tiles on this level appear
		//in front of the player & other sprites.
		this.map.createStaticLayer("foreground", this.map_layers, 0, 0).setDepth(2);
		
		//Set the camera to follow the player
		this.camera = this.cameras.main;
		this.camera.setBounds(-16, -16, 51 * 16, 31 * 16);
		this.camera.setViewport(0,21,this.camera.width, this.camera.height - 21);
		this.camera.setZoom(1.2);
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
			for (let i = 0; i < this.enemyGroup.children.entries.length; i++){
				this.enemyGroup.children.entries[i].soul.control();
				}
				this.UI.updateAll(this.player);
				
		} else if (this.player.mode == "destroyed"){
			//store the score, head to the game over scene
			this.registry.set("score", this.player.score);
			this.scene.start("EndScene", {victory: false});
			
		} else if (this.player.mode == "victory"){
			//store necessary information, move on
			this.registry.set("lives", this.player.lives);
			this.registry.set("score", this.player.score);
			this.registry.set("level", this.registry.get("level") + 1);	

			if (this.registry.get("level") <= 8){ //Current highest level
				this.scene.start("LevelScene"); //next level
			} else {
				this.scene.start("EndScene", {victory: true}); //end of game
			}
		}
	}
}
