export default class Player {
	constructor(scene, spritesheet, x, y){
		this.spritesheet = spritesheet;
		this.origin = [x,y];
		this.keys = scene.input.keyboard.createCursorKeys();
		
		this.sprite = scene.physics.add.sprite(x, y, spritesheet);
		this.sprite.setBounce(0);
		
		this.sprite.setSize(10, 16); //Make collisions look neater.
		this.grounded = false;	
		this.acceleration = 0;
		this.jump_acceleration = 100;
		
		this.lives = 3;
		this.score = 0;
		this.dead = false;
		
		this.setupAnimations(scene, spritesheet);
	}
	
	setupAnimations(scene, spritesheet){
		scene.anims.create({
			key: 'player-walk',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 56, end: 57 }),
			frameRate: 2,
			repeat: -1
		})

		scene.anims.create({key: 'player-idle',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 56, end: 57 }),
			frameRate: 2,
			repeat: -1
		})
		
		scene.anims.create({key: 'player-fall',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 59, end: 59 }),
			frameRate: 1,
			repeat: -1
		})
		
		scene.anims.create({key: 'player-jump',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 58, end: 58}), 
			frameRate: 1,
			repeat: -1
		})
		
		scene.anims.create({key: 'player-death',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 60, end: 61}), 
			frameRate: 1,
			repeat: 0
		})
	}
	
	control(){
		if (!this.dead){
			this.grounded = (this.sprite.body.onFloor() || this.sprite.body.touching.down)
			this.acceleration = this.grounded ? 100 : 50;
			
			if (this.keys.left.isDown){
				this.sprite.setVelocityX(-this.acceleration);
				this.sprite.flipX = false;
			} else if (this.keys.right.isDown){
				this.sprite.setVelocityX(this.acceleration);
				this.sprite.flipX = true;
			} else if (this.grounded) {
				this.sprite.setVelocityX(0);
			}
			if ((this.keys.space.isDown || this.keys.up.isDown) && this.grounded){
				this.sprite.setVelocityY(-this.jump_acceleration);
			}
		}
	}
	
	render(){
		if (!this.dead){
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
	}
	
	collect(item){
		let num = 10;
		this.score += num
		item.destroy();
		console.log(this.score);
	}
	
	die(){
		if (!this.dead){
			this.sprite.anims.play('player-death', true);
			this.dead = true;
			this.lives -= 1;
			setTimeout(function(){
				if (this.lives > 0){
					this.sprite.x = this.origin[0];
					this.sprite.y = this.origin[1];
					this.dead = false;
				} else {

					this.destroy()
				}
			}.bind(this),2000);
		}
	}
	
	destroy(){
		this.sprite.destroy();
	}
	
}