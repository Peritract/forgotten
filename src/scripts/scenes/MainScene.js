export default class MainScene extends Phaser.Scene {
	create(){
		
		this.add.text(10,10,"Designed & Developed by Dan Keefe", { fontSize: '14px', fill: '#fff' })
		this.add.text(10,30,"Art by Safwyl", { fontSize: '14px', fill: '#fff' })
		this.add.text(10,50,"Made with Phaser 3", { fontSize: '14px', fill: '#fff' })
		
		
		this.add.text(135,150,"FORGOTTEN", { fontSize: '72px', fill: '#fff' })
		
		this.input.keyboard.once('keydown', (event) => {
			this.scene.start('LevelScene');
		});
	}
}