import Phaser from 'phaser';
/**
 * @typedef {typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> }} ExtendedDeviceOrientationEvent
 */

export default class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu');
		this.startButton = /** @type{HTMLButtonElement}*/ (document.getElementById('start-button'));
	}

	create() {
		const width = this.scale.width;
		const height = this.scale.height;
		this.background = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0);
		this.add
			.text(this.scale.width / 2, this.scale.height / 2 - 100, 'JAEYONG JUMP', {
				fontFamily: 'Jua',
				fontSize: '60px',
				color: 'black'
			})
			.setOrigin(0.5);
		this.startButton.style.display = 'block';
		this.startButton.addEventListener('click', this.requestDeviceOrientationPermission.bind(this));
	}
	requestDeviceOrientationPermission() {
		/** @type {ExtendedDeviceOrientationEvent} */
		const DOE = DeviceOrientationEvent;

		if (typeof DOE.requestPermission === 'function') {
			DOE.requestPermission()
				.then((permissionState) => {
					const deviceOrientationGranted = permissionState === 'granted';
					this.scene.start('Game', { deviceOrientationGranted });
					this.startButton.style.display = 'none';
				})
				.catch(console.error);
		} else {
			// 브라우저가 권한 요청을 지원하지 않으면 바로 게임 씬으로 이동
			this.startButton.style.display = 'none';
			this.scene.start('Game', { deviceOrientationGranted: true });
		}
	}
}
