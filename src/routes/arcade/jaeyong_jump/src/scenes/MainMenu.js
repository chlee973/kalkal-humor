import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu');
		this.startButton = /** @type{HTMLButtonElement}*/ (document.getElementById('start-button'));
	}

	preload() {
		this.load.image('background', 'assets/Clouds.png');
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
		if (typeof DeviceOrientationEvent.requestPermission === 'function') {
			DeviceOrientationEvent.requestPermission()
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
