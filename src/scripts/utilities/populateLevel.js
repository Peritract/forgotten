 import Enemy from './Enemy.js';
 import getMessage from './getMessage.js';

 
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
		 let life = scene.collectGroup.create(x, y, "playerSprite", tile.index - 1).setSize(4, 16).setOffset(6, 0);
		 life.name = "life";
	 } else if (tile.index == 29){
		 let key = scene.collectGroup.create(x, y, "playerSprite", tile.index - 1).setSize(11, 10).setOffset(2, 2);
		 key.name = "key";
	 } else if (tile.index == 27 || tile.index == 28){
		 let door = scene.doorGroup.create(x, y, "playerSprite").setSize(4, 1).setOffset(6, 15);
		 door.name = "door";
		 door.state = "open";
		 door.anims.play("door-open");
		 if (tile.index == 27){
			 door.anims.play("door-shut");
			 door.state = "shut";
		 }
	 } else if (tile.index == 40){
		 let Void = scene.voidGroup.create(x, y, "playerSprite", tile.index - 1).setSize(16, 12).setOffset(0, 4);
	 } else if (tile.index == 41){
		 new Enemy(scene, "playerSprite", x, y);
	 } else if (tile.index == 47){
		 scene.invisibleWallGroup.create(x, y, "playerSprite", tile.index - 1).setSize(1,16).setOffset(7,0);
	 } else if (tile.index == 32){
		 let book = scene.messageGroup.create(x, y, "playerSprite", tile.index - 1);
		 book.message = getMessage();
	 } else {
		return;
	 }
	layer.removeTileAt(tile.x, tile.y);
}