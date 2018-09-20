export default function particleSetUp(player, scene){
	//Creates necessary global animations, accessible from any scene.
	player.dust_right = scene.add.particles("dust").setDepth(3);
	player.dust_left = scene.add.particles("dust").setDepth(3);
	player.blood = scene.add.particles("blood").setDepth(3);
		
	player.dust_left.createEmitter({
			angle: { min: 90, max: 270 },
			speed: { min: 50, max: 100},
			quantity: 2,
			lifespan: 50,
			alpha: { start: 0.8, end: 0 },
			scale: { start: 1, end: 1 },
			on: false
		});
		
	player.dust_right.createEmitter({
			angle: { min: -90, max: 90 },
			speed: { min: 50, max: 100},
			quantity: 2,
			lifespan: 50,
			alpha: { start: 0.8, end: 0 },
			scale: { start: 1, end: 1 },
			on: false
		});
	
	player.blood.createEmitter({
			angle: { min: 10, max: 170 },
			speed: { min: 50, max: 100},
			quantity: 2,
			lifespan: 300,
			alpha: { start: 1, end: 0 },
			scale: { start: 4, end: 4 },
			on: false
		});
}