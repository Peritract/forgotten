 
 
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
		let coin = scene.coinGroup.create(x, y, "playerSprite");
		coin.setSize(10,10);
		coin.name = "coin";
		coin.anims.play('coin-spin');
	 } else {
		return;
	 }
	layer.removeTileAt(tile.x, tile.y);
}