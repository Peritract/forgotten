export default class UI{
	//Holder for all the UI elements. 
	constructor(scene){
		this.scene = scene;
		this.elements  = scene.add.group();
		
		//Draw an opaque box where the UI elements should appear.
		let rect = new Phaser.Geom.Rectangle(0, 0, 680, 21);
		let graphics = scene.add.graphics({ fillStyle: { color: 0x000000 } });
		graphics.fillRectShape(rect);
		this.elements.add(graphics);
		
		//Draw the elements on top of the box.
		
		//A sprite to represent the score/coins, and a starting number of 0.
		this.elements.create(10, 10, "playerSprite").anims.play('coin-spin');
		let scoreboard = scene.add.text(20, 4, '000', { fontSize: '16px', fill: '#fff' });
		scoreboard.name = "scoreboard";
		this.elements.add(scoreboard);
		
		//A sprite to represent lives, and a starting number of 0.
		this.elements.create(60, 7, "playerSprite").anims.play('player-idle');
		let liveboard = scene.add.text(70, 4, '00', { fontSize: '16px', fill: '#fff' });
		liveboard.name = "liveboard";
		this.elements.add(liveboard);
		
		//A sprite to represent keys, and a starting number of 0.
		this.elements.create(105, 11, "playerSprite", 28);
		let keyboard = scene.add.text(115, 4, '0', { fontSize: '16px', fill: '#fff' });
		keyboard.name = "keyboard";
		this.elements.add(keyboard);
		
		//A message board text object, to hold information from various places.
		let messageboard = scene.add.text(130, 4, '', { fontSize: '16px', fill: '#fff' });
		messageboard.name = "messageboard";
		this.elements.add(messageboard);
		
		//A secondary camera to the main one, focused entirely on the UI, so that the main screen
		//can be zoomed in. 
		scene.cameras.add(0,0,scene.camera.width,21,false,"UI_CAM");
		
		//Important properties for updating things.
		this.score = scene.registry.has("score") ? scene.registry.get("score") : 0;
		this.lives = scene.registry.has("lives") ? scene.registry.get("lives") : 3;
		this.keys = scene.registry.has("keys") ? scene.registry.get("keys") : 0;
		this.displayCount = 0; //how many frames the message will be displayed.
		
		for (let i = 0; i < this.elements.children.entries.length; i++){
			this.elements.children.entries[i].setScrollFactor(0).setDepth(3);
		}
	}
	
	update_score(new_score){
		if (this.score < new_score){
			this.scene.sound.play("coin_gain");
			this.score += 1;
		} else if (this.score > new_score){
			this.score -= 1;
		}
		let parsed_score = ("000" + this.score).substr(-3);
		if (this.score > 999){
			parsed_score = "999";
		}
		this.elements.children.entries.filter(obj => obj.name == "scoreboard")[0].setText(parsed_score);
	}
	
	update_lives(new_lives){
		if (this.lives < new_lives){
			this.scene.sound.play("life_gain");
			this.lives += 1;
		} else if (this.lives > new_lives){
			this.lives -= 1;
		}
		let parsed_lives = ("00" + this.lives).substr(-2);
		if (this.lives > 99){
			parsed_lives = "99";
		}
		this.elements.children.entries.filter(obj => obj.name == "liveboard")[0].setText(parsed_lives);
	}
	
	update_keys(new_keys){
		if (this.keys < new_keys){
			this.scene.sound.play("key_gain");
			this.keys += 1;
		} else if (this.keys > new_keys){
			this.keys -= 1;
		}
		let parsed_keys = this.keys;
		if (this.keys > 9){
			parsed_keys = "9";
		}
		this.elements.children.entries.filter(obj => obj.name == "keyboard")[0].setText(parsed_keys);
	}
	
	setMessage(message){
		this.elements.children.entries.filter(obj => obj.name == "messageboard")[0].setText(message);
		this.displayCount = 25;
	}
	
	updateAll(registry){
		this.update_lives(registry.lives);
		this.update_score(registry.score);
		this.update_keys(registry.keys_held);
		if (this.displayCount > 0){
			this.displayCount -= 1;
		} else {
			this.setMessage("");
		}
	}
}