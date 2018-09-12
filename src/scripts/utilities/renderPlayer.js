export default function renderPlayer(player){
	if (player.body.velocity.x < 0 && (player.body.onFloor() || player.body.touching.down)){
		player.anims.play('left', true);
		player.flipX = false;
	} else if (player.body.velocity.x >= 0 && (player.body.onFloor() || player.body.touching.down)){
		player.anims.play('left', true);
		player.flipX = true;
	} else if (player.body.velocity.y <= 0 && !(player.body.onFloor() || player.body.touching.down)){
		player.anims.play('up', true);
		if (player.body.velocity.x < 0){
			player.flipX = true;
		} else {
			player.flipX = false;
		}
	} else if (player.body.velocity.y > 0 && !(player.body.onFloor() || player.body.touching.down)){
		player.anims.play('down', true);
	} else {
		player.anims.play('left', true);
		player.flipX = true;
	}
}