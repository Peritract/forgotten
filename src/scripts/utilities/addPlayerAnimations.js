export default function addPlayerAnimations(scene, image){
	scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers(image, { start: 56, end: 57 }),
			frameRate: 2,
			repeat: -1
		})
		
		scene.anims.create({key: 'up',
			frames: scene.anims.generateFrameNumbers(image, { start: 58, end: 58 }),
			frameRate: 2,
			repeat: -1
		})
		
		scene.anims.create({key: 'down',
			frames: scene.anims.generateFrameNumbers(image, { start: 59, end: 59 }),
			frameRate: 2,
			repeat: -1
		})
		
		scene.anims.create({key: 'land',
			frames: scene.anims.generateFrameNumbers(image, { start: 60, end: 60 }),
			frameRate: 2,
			repeat: -1
		})
		
		scene.anims.create({key: 'dead',
			frames: scene.anims.generateFrameNumbers(image, { start: 61, end: 61 }),
			frameRate: 2,
			repeat: -1
		})
}