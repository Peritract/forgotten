export default function controlPlayer(scene, player){
	let cursors = scene.input.keyboard.createCursorKeys();
		if (cursors.left.isDown  && (player.body.onFloor() || player.body.touching.down)){
			player.setVelocityX(-100);
		} else if (cursors.right.isDown && (player.body.onFloor() || player.body.touching.down)){
			player.setVelocityX(100);			
		} else if (player.body.onFloor() || player.body.touching.down){
			player.setVelocityX(0);
		}
		if ((cursors.space.isDown || cursors.up.isDown) && (player.body.onFloor() || player.body.touching.down)){
			player.setVelocityY(-200); // jump update
		}
}