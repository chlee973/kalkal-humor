import Phaser from 'phaser';
export default class Buds extends Phaser.GameObjects.Sprite {
	/**
	 *
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {string} texture
	 */
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setScale(0.2);
	}
}
