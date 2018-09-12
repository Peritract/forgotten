export default function addPlayer(scene, x, y, image) {
		let player = scene.physics.add.sprite(x, y, image);
		player.setScale(3);
		player.setBounce(0);
		player.setCollideWorldBounds(true);		
		return player;
}
