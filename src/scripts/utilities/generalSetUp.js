export default function generalSetUp(scene,spritesheet){
	//this function does things that are easy to abstract away,
	//but not individually worth their own module at the current time
	//eventually, it should end up empty.
	scene.anims.create({
			key: 'coin-spin',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 48, end: 53 }),
			frameRate: 5,
			repeat: -1
	})
	
	scene.anims.create({
			key: 'fire-burn',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 13, end: 15 }),
			frameRate: 5,
			repeat: -1
	})
}