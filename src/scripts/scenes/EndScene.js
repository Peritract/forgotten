export default class EndScene extends Phaser.Scene {
	create(info){
		
		this.cameras.main.setViewport(0,0,this.cameras.main.width, this.cameras.main.height + 21)
		
		this.add.text(20,10,"Designed & Developed by Dan Keefe", { fontSize: '16px', fill: '#fff' })
		this.add.text(20,40,"Art by Safwyl", { fontSize: '16px', fill: '#fff' })
		this.add.text(20,70,"Sound by Luke.RUSTLTD & sauer2", { fontSize: '16px', fill: '#fff' })
		this.add.text(20,100,"Made with Phaser 3", { fontSize: '16px', fill: '#fff' })
				
		let title = this.add.text(0,0, (info.victory ? "You have reached the end" : "You have failed, as all must"), { fontSize: '32px', fill: '#fff' })
		title.setPosition(this.cameras.main.width / 2 - title.width / 2, (this.cameras.main.height / 2 - title.height / 2) -30)
		
		let readout = this.add.text(0,0,"You gathered " + this.registry.get("score") + " coins", { fontSize: '16px', fill: '#fff' })
		readout.setPosition(this.cameras.main.width / 2 - readout.width / 2, (this.cameras.main.height / 2 - readout.height / 2) + 20)
		
		let command = this.add.text(0,0,"Press any key", { fontSize: '16px', fill: '#fff' })
		command.setPosition(this.cameras.main.width / 2 - command.width / 2, (this.cameras.main.height / 2 - command.height / 2) + 40)
		
		
		this.input.keyboard.once('keydown', (event) => {
			this.scene.stop('EndScene');
			this.registry.reset();
			this.scene.start('MainScene');
		});
	}
}