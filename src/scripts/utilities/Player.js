import particleSetUp from './particleSetUp.js';

export default class Player {
	constructor(scene, spritesheet, x, y, data){
		this.spritesheet = spritesheet;
		this.origin = [x,y];
		this.keys = scene.input.keyboard.createCursorKeys();
		this.sprite = scene.physics.add.sprite(x, y, spritesheet);
		this.audio = scene.sound;
		this.sprite.setSize(10, 10).setOffset(3,6).setDepth(1); //Make collisions look neater.
		
		particleSetUp(this, scene);
		
		this.grounded = false;		
		this.acceleration = 0;
		this.jump_acceleration = 180;
		this.wall_jump = "none";
		
		this.lives = 3;
		if (data.has("lives")){
			this.lives = data.get("lives");
		}
		this.score = 0;
		if (data.has("score")){
			this.score = data.get("score");
		}
		this.keys_held = 0;
		this.dead = false;
		this.mode = "normal"; //tracks when the scene needs changing.
		
		//Tell the game the keys aren't pressed down
		//This is important because sometimes Phaser forgets to update things.
		//I have no idea why. 
		this.keys.right.isDown = false;
		this.keys.left.isDown = false;
		this.keys.up.isDown = false;
		
		
	}
	
	checkWall(){
		if (!this.grounded){
			if (this.sprite.body.blocked.right){
				this.wall_jump = "left";
				if (this.sprite.body.velocity.y > 0){
					this.dust_left.emitParticleAt(this.sprite.x + 5, this.sprite.y + 4);
				}
			} else if (this.sprite.body.blocked.left){
				this.wall_jump = "right";
				if (this.sprite.body.velocity.y > 0){
					this.dust_right.emitParticleAt(this.sprite.x - 5, this.sprite.y + 4);
				}
			} else {
				this.wall_jump = "none";
			}
		} else {
			this.wall_jump = "none";
		}
	}
	
	control(){
		if (!this.dead){
			this.grounded = (this.sprite.body.onFloor() || this.sprite.body.blocked.down)
			this.acceleration = this.grounded ? 150 : 75;
			this.sprite.body.gravity.x = this.wall_jump == "right" ? -10 : 0;
			this.sprite.body.gravity.x = this.wall_jump == "left" ? 10 : this.sprite.body.gravity.x;
			this.sprite.body.gravity.y = this.wall_jump != "none" ? -100 : 0;
			if (this.grounded){
				if (this.keys.left.isDown){
					this.sprite.setVelocityX(-this.acceleration);
					this.sprite.flipX = false;
				} else if (this.keys.right.isDown){
					this.sprite.setVelocityX(this.acceleration);
					this.sprite.flipX = true;
				} else {
					this.sprite.setVelocityX(0);
				}
				if (this.keys.up.isDown){
					this.sprite.setVelocityY(-this.jump_acceleration);
				}
			} else {
				if (this.wall_jump == "left" && this.keys.up.isDown && this.keys.left.isDown){
					//check for left wall jump
					if (!this.sprite.body.blocked.left){
						this.sprite.setVelocityY(-this.jump_acceleration)
						this.sprite.setVelocityX(-this.acceleration);
						this.wall_jump = "none";
					}
				} else if (this.wall_jump == "right" && this.keys.up.isDown && this.keys.right.isDown){
					if (!this.sprite.body.blocked.right){
						this.sprite.setVelocityY(-this.jump_acceleration)
						this.sprite.setVelocityX(this.acceleration);
					this.wall_jump = "none";
					}
				} else {
					if (this.keys.left.isDown){
						this.sprite.setVelocityX(-this.acceleration);
						this.sprite.flipX = false;
					} else if (this.keys.right.isDown){
						this.sprite.setVelocityX(this.acceleration);
						this.sprite.flipX = true;
					} else {
						this.sprite.setVelocityX(0);
					}
				}
			}
			this.checkWall();
		}
	}
	
	render(){
		if (!this.dead){
			if (this.grounded){
				if (this.sprite.anims.currentAnim != "player-walk"){
					this.sprite.anims.play('player-walk', true);
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
		if (item.name == "coin"){
			this.score += 10;
		} else if (item.name == "life"){
			this.lives += 1;
		} else if (item.name == "key"){
			this.keys_held += 1;
		}
		item.destroy();
	}
	
	die(){
		setTimeout(function(){
			this.lives -= 1;
			if (this.lives > 0){
				this.sprite.x = this.origin[0];
				this.sprite.y = this.origin[1];
				this.sprite.setVelocityX(0);
				this.sprite.setVelocityY(0);
				this.dead = false;
			} else {
				this.destroy();
			}
		}.bind(this),2500);
	}
	
	killed(){
		if (!this.dead){
			this.dead = true;
			this.blood.emitParticleAt(this.sprite.x, this.sprite.y + 7);
			this.audio.play("hurt");
			this.sprite.anims.play('player-death', true);
			this.sprite.setVelocityX(0);
			this.sprite.setVelocityY(0);
			this.die();
		}
	}
	
	fell(){
		if (!this.dead){
			this.dead = true;
			this.sprite.setVelocityX(0);
			this.sprite.anims.play('player-fall', true);
			this.die();
		}
	}
	
	open(door){
		if (door.state == "shut" && this.keys_held > 0){
			door.anims.play("door-open", true);
			door.state = "open";
			this.keys_held == 0;
		} else if (door.state == "open"){
			this.mode = "victory";
		}
	}
	
	destroy(){
		this.sprite.destroy();
		this.mode = "destroyed";
	}
}