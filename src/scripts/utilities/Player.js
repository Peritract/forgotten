export default class Player {
	constructor(scene, spritesheet, x, y){
		this.spritesheet = spritesheet;
		this.keys = scene.input.keyboard.createCursorKeys();
		
		this.sprite = scene.physics.add.sprite(x, y, spritesheet);
		this.sprite.setBounce(0);
		this.sprite.setCollideWorldBounds(true);
		
		this.grounded = false;	
		this.acceleration = 0;
		this.jump_acceleration = 200; 
		
		this.setupAnimations(scene, spritesheet);
	}
	
	setupAnimations(scene, spritesheet){
		scene.anims.create({
			key: 'player-walk',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 8, end: 15 }),
			frameRate: 12,
			repeat: -1
		})

		scene.anims.create({key: 'player-idle',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 0, end: 3 }),
			frameRate: 2,
			repeat: -1
		})
		
		scene.anims.create({key: 'player-fall',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 10, end: 10 }),
			frameRate: 1,
			repeat: -1
		})
		
		scene.anims.create({key: 'player-jump',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 13, end: 13}), 
			frameRate: 1,
			repeat: -1
		})
		
		scene.anims.create({key: 'player-duck',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 4, end: 7}),
			frameRate: 12,
			repeat: -1
		})
	}
	
	control(){
		this.grounded = (this.sprite.body.onFloor() || this.sprite.body.touching.down)
		this.acceleration = this.grounded ? 300 : 100;
		
		if (this.keys.left.isDown){
			this.sprite.setVelocityX(-this.acceleration);
			this.sprite.flipX = true;
		} else if (this.keys.right.isDown){
			this.sprite.setVelocityX(this.acceleration);
			this.sprite.flipX = false;
		} else if (this.grounded) {
			this.sprite.setVelocityX(0);
		}
		if ((this.keys.space.isDown || this.keys.up.isDown) && this.grounded){
			this.sprite.setVelocityY(-this.jump_acceleration);
		}
	}
	
	render(){
		if (this.grounded){
			if (this.sprite.body.velocity.x != 0){
				this.sprite.anims.play('player-walk', true);
			} else {
				this.sprite.anims.play('player-idle', true);
			}
		} else {
			if (this.sprite.body.velocity.y < 0){
				this.sprite.anims.play('player-jump');
			} else {
				this.sprite.anims.play('player-fall');
			}
		}
	}
	
	destroy(){
		this.sprite.destroy();
	}
	
}