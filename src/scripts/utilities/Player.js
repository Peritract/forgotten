export default class Player {
	constructor(scene, spritesheet, x, y, data=null){
		this.spritesheet = spritesheet;
		this.origin = [x,y];
		this.keys = scene.input.keyboard.createCursorKeys();
		this.sprite = scene.physics.add.sprite(x, y, spritesheet);
		this.sprite.setBounce(0);
		
		this.sprite.setSize(10, 10).setOffset(3,6).setDepth(1); //Make collisions look neater.
		this.grounded = false;	
		this.acceleration = 0;
		this.jump_acceleration = 200;
		
		this.lives = 3;
		if (data.lives){
			this.lives = data.lives;
		}
		this.score = 0;
		if (data.score){
			this.score = data.score;
		}
		this.keys_held = 0;
		this.dead = false;
		this.mode = "normal"; //tracks when the scene needs changing.
	}
	
	control(){
		if (!this.dead){
			this.grounded = (this.sprite.body.onFloor() || this.sprite.body.touching.down)
			this.acceleration = this.grounded ? 150 : 75;
			
			if ((this.keys.space.isDown || this.keys.up.isDown) && this.grounded){
				this.sprite.setVelocityY(-this.jump_acceleration);
			} else if ((this.keys.space.isDown || this.keys.up.isDown) && !this.grounded){
				if (this.sprite.body.blocked.right && this.keys.right.isDown){
					this.sprite.setVelocityY(-this.jump_acceleration / 1.3);
					this.sprite.setVelocityX(-this.acceleration * 1.8);
				} else if (this.sprite.body.blocked.left && this.keys.left.isDown){
					this.sprite.setVelocityY(-this.jump_acceleration / 1.3);
					this.sprite.setVelocityX(this.acceleration * 1.8);
				}
			} else {
				if (this.keys.left.isDown){
					this.sprite.setVelocityX(-this.acceleration);
					this.sprite.flipX = false;
				} else if (this.keys.right.isDown){
					this.sprite.setVelocityX(this.acceleration);
					this.sprite.flipX = true;
				} else if (this.grounded) {
					this.sprite.setVelocityX(0);
				}			
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
		this.sprite.setVelocityX(0);
		this.sprite.setVelocityY(0);
		
		setTimeout(function(){
			this.lives -= 1;
			if (this.lives > 0){
				this.sprite.x = this.origin[0];
				this.sprite.y = this.origin[1];
				this.dead = false;
			} else {
				this.destroy()
			}
		}.bind(this),2500);
	}
	
	killed(){
		if (!this.dead){
			this.dead = true;
			this.sprite.anims.play('player-death', true);
			this.sprite.setVelocityX(0);
			this.sprite.setVelocityY(0);
			this.die();
		}
	}
	
	fell(){
		if (!this.dead){
			this.dead = true;
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
			console.log("passing through");
			this.mode = "victory";
		}
	}
	
	destroy(){
		this.sprite.destroy();
		this.mode = "destroyed";
	}
}