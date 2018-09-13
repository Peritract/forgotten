export default function createLevel(scene, tileset_key, tileset_name, tileset_tag){
	//This function pulls in a tileset and information about it in order to build the level.
	//Phaser handles this weirdly, so here is what is basically going on.
	//tileset_key is the name given to the tile map when it is formed from the tileset image.
	//tileset_tag is the name given to the tileset image when it is loaded in.
	//tileset_name is the name of the tileset in the tilemap. It has to be named separately, even though it is embedded.
	//for ease of extensibility, always name the image the same as the tileset loaded into Tiled for editing. 
	//This function attaches a bunch of properties to the parent scene object (passed in as scene)
	//The first one, map, is a map of tiles made from the tile map.
	//the second one, layers, is the map of tiles, in several layers, with the pictures added on.
	//the third one, midground, actually adds the map with images to the playable scene. 
	scene.map = scene.make.tilemap({ key: tileset_key, tileWidth: 16, tileHeight: 16 });
	scene.map_layers = scene.map.addTilesetImage(tileset_name, tileset_tag);
	scene.midground = scene.map.createStaticLayer("Midground", scene.map_layers, 0, 0);
}