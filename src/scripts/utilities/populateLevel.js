 
 
 export default function populateLevel(scene, layer, tile){
	 //takes a tile as an argument. If that tile 
	 //matches a condition, replaces it with a sprite
	 //that does stuff
	 let x = tile.getCenterX();
	 let y = tile.getCenterY();
	 
	 if (tile.index === 14) {
		let fire = scene.fireGroup.create(x, y, "playerSprite");
		//set width, height depending on angle. Height now matches sprite image.
		fire.body.setSize(16, 10).setOffset(0, 6);
		fire.anims.play('fire-burn');
	 } else if (tile.index == 49){
		let coin = scene.collectGroup.create(x, y, "playerSprite");
		coin.setSize(10,10).setOffset(3,2);
		coin.name = "coin";
		coin.anims.play('coin-spin');
	 } else if (tile.index == 30){
		 let life = scene.collectGroup.create(x, y, "playerSprite");
		 life.name = "life";
		 life.anims.play("life");
	 } else if (tile.index == 29){
		 let key = scene.collectGroup.create(x, y, "playerSprite");
		 key.name = "key";
		 key.anims.play("key");
	 } else if (tile.index == 27 || tile.index == 28){
		 let door = scene.doorGroup.create(x, y, "playerSprite");
		 door.name = "door";
		 door.state = "open";
		 door.anims.play("door-open");
		 if (tile.index == 27){
			 door.anims.play("door-shut");
			 door.state = "shut";
		 }
	 } else if (tile.index == 40){
		 let Void = scene.voidGroup.create(x, y, "playerSprite");
		 Void.anims.play("void");
	 } else {
		return;
	 }
	layer.removeTileAt(tile.x, tile.y);
}