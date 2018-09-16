export default class Enemy {
	constructor(scene, spritesheet, x, y){
		this.spritesheet = spritesheet;
		this.sprite = scene.enemyGroup.create(x, y, spritesheet);
		this.sprite.setBounce(0);
		this.sprite.setSize(7, 12).setOffset(6,3);
		this.sprite.anims.play("enemy-walk",true);
		this.sprite.soul = this; //circular reference so obj can be found by sprite later.
		
		this.dead = false;
		this.speed = 50;
		this.left = false;
	}
	
	control(){
		if (this.left){
			this.sprite.setVelocityX(this.speed);
		} else {
			this.sprite.setVelocityX(-this.speed);
		}
	}
	
	turn(){
		this.sprite.flipX = !this.sprite.flipX;
		this.left = !this.left;
	}
	
	killed(){
		if (!this.dead){
			this.dead = true;
			this.sprite.anims.play('enemy-death', true);
			this.sprite.setVelocityX(0);
			this.sprite.setVelocityY(0);
			this.die();
		}
	}
	
	fell(){
		if (!this.dead){
			this.dead = true;
			this.die();
		}
	}
	
	die(){
		this.sprite.setVelocityX(0);
		this.sprite.setVelocityY(0);
		setTimeout(function(){
				this.destroy()
		}.bind(this),1000);
	}
	
	destroy(){
		this.sprite.destroy();
	}
}