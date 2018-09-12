import oubliette_img from '../../assets/oubliette_tileset_transparent.png';
import addPlayer from '../utilities/addPlayer.js';
import addPlayerAnimations from '../utilities/addPlayerAnimations.js';
import controlPlayer from '../utilities/controlPlayer.js';
import renderPlayer from '../utilities/renderPlayer.js';

export class SimpleScene extends Phaser.Scene {
	preload(){
		this.load.spritesheet("Oubliette",oubliette_img, { frameWidth: 16, frameHeight: 16 });
	}
	
	create(){
		addPlayerAnimations(this, "Oubliette");
		this.player = addPlayer(this, 20, 30, "Oubliette");
		let platforms = this.physics.add.staticGroup()
		platforms.create(45,45,"Oubliette").setScale(3)
	}
	
	update(){
		controlPlayer(this, this.player);
		renderPlayer(this.player);
	}
}
