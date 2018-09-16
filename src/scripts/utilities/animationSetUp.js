export default function animationSetUp(scene,spritesheet){
	//Creates necessary global animations, accessible from any scene.
	
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
	
	scene.anims.create({
			key: 'key',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 28, end: 28 }),
			frameRate: 5,
			repeat: -1
	})
	
	scene.anims.create({
			key: 'life',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 29, end: 29 }),
			frameRate: 1,
			repeat: -1
	})

	scene.anims.create({
			key: 'door-open',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 27, end: 27 }),
			frameRate: 1,
			repeat: -1
	})
	
	scene.anims.create({
			key: 'door-shut',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 26, end: 26 }),
			frameRate: 1,
			repeat: -1
	})
	
	scene.anims.create({
			key: 'void',
			frames: scene.anims.generateFrameNumbers(spritesheet, { start: 39, end: 39 }),
			frameRate: 1,
			repeat: -1
	})
	
	scene.anims.create({
		key: 'player-walk',
		frames: scene.anims.generateFrameNumbers(spritesheet, { start: 56, end: 57 }),
		frameRate: 2,
		repeat: -1
	})

	scene.anims.create({key: 'player-idle',
		frames: scene.anims.generateFrameNumbers(spritesheet, { start: 56, end: 57 }),
		frameRate: 2,
		repeat: -1
	})
		
	scene.anims.create({key: 'player-fall',
		frames: scene.anims.generateFrameNumbers(spritesheet, { start: 59, end: 59 }),
		frameRate: 1,
		repeat: -1
	})
		
	scene.anims.create({key: 'player-jump',
		frames: scene.anims.generateFrameNumbers(spritesheet, { start: 58, end: 58}), 
		frameRate: 1,
		repeat: -1
	})
		
	scene.anims.create({key: 'player-death',
		frames: scene.anims.generateFrameNumbers(spritesheet, { start: 60, end: 61}), 
		frameRate: 2,
		repeat: 0
	})
	
	scene.anims.create({key: 'enemy-walk',
		frames: scene.anims.generateFrameNumbers(spritesheet, { start: 40, end: 44}), 
		frameRate: 3,
		repeat: -1
	})
	
	scene.anims.create({key: 'enemy-death',
		frames: scene.anims.generateFrameNumbers(spritesheet, { start: 45, end: 45}), 
		frameRate: 2,
		repeat: 0
	})
}