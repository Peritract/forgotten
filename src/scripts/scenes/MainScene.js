export default class MainScene extends Phaser.Scene {
	create(){
		this.cameras.main.setViewport(0,0,this.cameras.main.width, this.cameras.main.height + 21);
		this.add.text(20,10,"Designed & Developed by Dan Keefe", { fontSize: '16px', fill: '#fff' })
		this.add.text(20,40,"Art by Safwyl", { fontSize: '16px', fill: '#fff' })
		this.add.text(20,70,"Sound by Luke.RUSTLTD & sauer2", { fontSize: '16px', fill: '#fff' })
		this.add.text(20,100,"Made with Phaser 3", { fontSize: '16px', fill: '#fff' })
		this.registry.set("level", 1);
		
		let title = this.add.text(0,0,"FORGOTTEN", { fontSize: '72px', fill: '#fff' })
		title.setPosition(this.cameras.main.width / 2 - title.width / 2, (this.cameras.main.height / 2 - title.height / 2) -30)
		let command = this.add.text(0,0,"Press any key to start", { fontSize: '16px', fill: '#fff' })
		command.setPosition(this.cameras.main.width / 2 - command.width / 2, (this.cameras.main.height / 2 - command.height / 2) + 20)
		this.input.keyboard.once('keydown', (event) => {
			setTimeout(function(){
				this.scene.stop("MainScene");
				this.scene.start('LevelScene');
			}.bind(this), 1000);
		});
	}
}