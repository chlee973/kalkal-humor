import Phaser from 'phaser';
export default class Preloader extends Phaser.Scene {
	constructor() {
		super('Preloader');
	}

	preload() {
		this.load.image('character', 'assets/character.png');
		this.load.image('background', 'assets/Clouds.png');
		this.load.image('rocket', 'assets/rocket.png');

		this.load.image('buds', 'assets/buds.png');
		//platforms
		this.load.image('laundry', 'assets/laundry.png');
		this.load.image('refri', 'assets/refri.png');
		this.load.image('s1', 'assets/s1.png');
		this.load.image('s2', 'assets/s2.png');
		this.load.image('s21', 'assets/s21.png');
		this.load.image('s22', 'assets/s22.png');
		this.load.image('note7', 'assets/note7.png');
	}
	create() {
		this.scene.start('MainMenu');
	}
}
