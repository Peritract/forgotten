export default class UI{
	//Holder for all the UI elements. 
	constructor(scene){
		this.elements  = scene.add.group();
		
		//Draw an opaque box where the UI elements should appear.
		let rect = new Phaser.Geom.Rectangle(0, 0, 680, 28);
		let graphics = scene.add.graphics({ fillStyle: { color: 0x000000 } });
		graphics.fillRectShape(rect);
		this.elements.add(graphics);
		
		//Draw the elements on top of the box.
		
		//A sprite to represent the score/coins, and a starting number of 0.
		this.elements.create(10, 10, "playerSprite").anims.play('coin-spin');
		let scoreboard = scene.add.text(20, 4, '000', { fontSize: '14px', fill: '#fff' });
		scoreboard.name = "scoreboard";
		this.elements.add(scoreboard);
		
		//A sprite to represent lives, and a starting number of 0.
		this.elements.create(60, 7, "playerSprite").anims.play('player-idle');
		let liveboard = scene.add.text(70, 4, '00', { fontSize: '16px', fill: '#fff' });
		liveboard.name = "liveboard";
		this.elements.add(liveboard);
		
		//Important properties for updating things.
		this.score = 0;
		this.lives = 0;
		
		for (let i = 0; i < this.elements.children.entries.length; i++){
			this.elements.children.entries[i].setScrollFactor(0);
		}
	}
	
	update_score(new_score){
		if (this.score < new_score){
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
	
	updateAll(data){
		this.update_lives(data.lives);
		this.update_score(data.score);
	}
}