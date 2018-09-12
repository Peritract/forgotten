import oubliette_img from '../../assets/oubliette_tileset_transparent.png';

export class SimpleScene extends Phaser.Scene {
	preload(){
		this.load.spritesheet("Oubliette",oubliette_img, { frameWidth: 16, frameHeight: 16 })
	}
	
	create(){	
		this.wanderer = this.physics.add.sprite(20, 30, "Oubliette");
		this.wanderer.setScale(3);
		this.wanderer.setBounce(0.2);
		this.wanderer.setCollideWorldBounds(true);
		
		this.anims.create({
			key: 'w_left',
			frames: this.anims.generateFrameNumbers("Oubliette", { start: 56, end: 57 }),
			frameRate: 2,
			repeat: -1
		})
		
		this.wanderer.anims.play('w_left', true);
		this.wanderer.flipX = true;
	}
	
	update(){
		let cursors = this.input.keyboard.createCursorKeys();
		
		if (cursors.left.isDown){
			this.wanderer.anims.play('w_left', true);
			this.wanderer.flipX = false;
			this.wanderer.setVelocityX(-100);
		} else if (cursors.right.isDown){
			this.wanderer.anims.play('w_left', true);
			this.wanderer.flipX = true;
			this.wanderer.setVelocityX(100);
		} else {
			this.wanderer.anims.play('w_left', true);
			this.wanderer.setVelocityX(0);
		}
	}
}
