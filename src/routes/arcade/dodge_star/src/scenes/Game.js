import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
	constructor() {
		super();
		this.player;
		this.platforms;
		this.stars;
		this.cursors;
		this.score;
		this.scoreText;
		this.velocityX = 300;
		this.halfWidth;
		this.pointer;
		this.bgm;
	}

	preload() {
		this.load.audio('bgm', 'assets/bgm.mp3');
		this.load.image('background', 'assets/blue_grass.png');
		this.load.image('grassLeft', 'assets/grassLeft.png');
		this.load.image('grassMid', 'assets/grassMid.png');
		this.load.image('grassRight', 'assets/grassRight.png');
		this.load.image('star', 'assets/star.png');
		this.load.spritesheet('player', 'assets/spritesheet_players.png', {
			frameWidth: 128,
			frameHeight: 256
		});
	}

	create() {
		this.bgm = this.sound.add('bgm');
		this.bgm.play();
		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');
		this.platforms = this.physics.add.staticGroup();
		// 왼쪽 타일 추가
		this.platforms
			.create(32, 768 - 32, 'grassLeft')
			.setScale(0.5)
			.refreshBody();
		// 중간 타일들 추가
		for (let i = 1; i < 16 - 1; i++) {
			this.platforms
				.create(32 + i * 64, 768 - 32, 'grassMid')
				.setScale(0.5)
				.refreshBody();
		}
		// 오른쪽 타일 추가
		this.platforms
			.create(1024 - 32, 768 - 32, 'grassRight')
			.setScale(0.5)
			.refreshBody();

		this.player = this.physics.add
			.sprite(this.cameras.main.centerX, 768 - 128, 'player')
			.setScale(0.5)
			.setSize(100, 150)
			.setOffset(14, 106);
		this.player.setCollideWorldBounds(true);
		this.physics.add.collider(this.player, this.platforms);

		this.stars = this.physics.add.group();
		const startCreateEvent = this.time.addEvent({
			delay: 100,
			callback: createStar,
			callbackScope: this,
			loop: true
		});

		function createStar() {
			// 랜덤한 x 좌표를 계산합니다.
			let x = Phaser.Math.Between(0, 1024);
			// 별을 생성하고 물리 엔진을 활성화합니다.
			let star = this.stars.create(x, 0, 'star').setScale(0.5).setSize(40, 50);
		}
		this.physics.add.collider(this.player, this.stars, hitStar, null, this);
		function hitStar() {
			this.physics.pause();
			startCreateEvent.paused = true;
			this.player.setTint(0xff0000);
			this.player.anims.play('turn');
			this.bgm.pause();
			// 게임 오버 메시지 표시
			console.log('게임 오버');
			const gameOverText = this.add.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY - 25,
				'Game Over',
				{ fontSize: '48px', fill: '#f00' }
			);
			gameOverText.setOrigin(0.5, 0.5);

			const finalScoreText = this.add.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY + 15,
				`Score: ${this.score}`,
				{ fontSize: '24px', fill: '#000' }
			);
			finalScoreText.setOrigin(0.5, 0.5);

			// 다시하기 버튼 생성
			const restartButton = this.add.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY + 75,
				'Restart',
				{ fontSize: '32px', fill: '#80be1f' }
			);
			restartButton.setOrigin(0.5, 0.5);
			restartButton.setInteractive({ useHandCursor: true });
			restartButton.on('pointerdown', () => {
				this.scene.restart();
			}); // 버튼 클릭 시 현재 씬 재시작
		}

		this.physics.add.collider(this.stars, this.platforms, destroyStar, null, this);
		function destroyStar(star, platform) {
			star.destroy();
			this.score += 1;
			this.scoreText.setText(`${this.score}`);
		}

		// 애니메이션
		this.anims.create({
			key: 'walk',
			frames: [
				{ key: 'player', frame: 12 },
				{ key: 'player', frame: 20 }
			],
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'player', frame: 5 }],
			frameRate: 20
		});

		this.score = 0;
		this.scoreText = this.add
			.text(0, 0, '0', {
				fontSize: '48px',
				color: '#000'
			})
			.setDepth(1);

		this.cursors = this.input.keyboard.createCursorKeys();

		// 포인터 이벤트를 처리합니다.
		this.halfWidth = this.sys.game.config.width / 2;
		this.input.on('pointerdown', (_pointer) => {
			this.pointer = _pointer;
			if (this.pointer.x < this.halfWidth) {
				this.player.anims.play('walk', true);
				this.player.setFlipX(true);
			} else {
				this.player.anims.play('walk', true);
				this.player.setFlipX(false);
			}
		});
		// 포인터가 화면에서 떨어질 때의 이벤트를 처리합니다.
		this.input.on('pointerup', () => {
			this.pointer = null;
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		});
	}

	update() {
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-this.velocityX);
			this.player.anims.play('walk', true);
			this.player.setFlipX(true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(this.velocityX);
			this.player.anims.play('walk', true);
			this.player.setFlipX(false);
		} else if (this.pointer && this.pointer.isDown) {
			// 포인터가 화면에 닿아 있는 경우, 포인터 입력을 처리합니다.
			if (this.pointer.x < this.halfWidth) {
				this.player.setVelocityX(-this.velocityX);
			} else {
				this.player.setVelocityX(this.velocityX);
			}
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}
	}
}
