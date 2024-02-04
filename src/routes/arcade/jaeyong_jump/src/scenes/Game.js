import Phaser from 'phaser';
import Buds from '../game/Buds';
import Note7 from '../game/Note7';

export default class Game extends Phaser.Scene {
	/** @type {Phaser.Types.Physics.Arcade.ImageWithDynamicBody} */
	// @ts-ignore
	player;
	/** @type {Phaser.GameObjects.TileSprite} */
	// @ts-ignore
	background;
	/** @type {Phaser.Physics.Arcade.StaticGroup} */
	// @ts-ignore
	platforms;
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys | undefined} */
	// @ts-ignore
	cursors;
	/** @type {number} */
	platform_max_y = 0;
	platform_keys = ['laundry', 'refri', 's1', 's2', 's21', 's22'];
	/** @type {number} */
	/** @type {Phaser.Physics.Arcade.StaticGroup} */
	// @ts-ignore
	budsGroup;
	/** @type {Phaser.Physics.Arcade.StaticGroup} */
	// @ts-ignore
	note7Group;
	score = 0;
	/** @type {Phaser.GameObjects.Text} */
	// @ts-ignore
	scoreText;
	constructor() {
		super({
			key: 'Game'
		});
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
		this.cursors = this.input.keyboard?.createCursorKeys();
	}
	/**
	 *
	 * @param {object | undefined} data
	 */
	// @ts-ignore
	create(data) {
		this.score = 0;
		const width = this.scale.width;
		const height = this.scale.height;
		this.background = this.add
			.tileSprite(0, 0, width, height, 'background')
			.setOrigin(0)
			.setScrollFactor(0, 0);

		this.platforms = this.physics.add.staticGroup();

		for (let i = 0; i < 5; ++i) {
			const x = Phaser.Math.Between(width / 2 - 50, width / 2 + 50);
			const y = 250 * i;

			const platform = this.platforms
				.create(x, y, Phaser.Math.RND.pick(this.platform_keys))
				.setOrigin(0);
			platform.scale = 0.25;

			const body = platform.body;
			body.updateFromGameObject();
		}
		this.platform_max_y = 0;
		this.player = this.physics.add
			.image(width / 2, 750, 'character')
			.setOrigin(0.5)
			.setScale(0.1);
		this.player.body.checkCollision.up = false;
		this.player.body.checkCollision.left = false;
		this.player.body.checkCollision.right = false;
		this.player.depth = 10;
		this.physics.add.collider(
			this.platforms,
			this.player,
			// @ts-ignore
			this.onPlatformCollision,
			undefined,
			this
		);
		this.cameras.main.startFollow(this.player);
		this.cameras.main.setDeadzone(this.scale.width * 1.5);
		this.scoreText = this.add
			.text(16, 16, 'SAMSUNG: 0 KRW', {
				fontFamily: 'Jua',
				fontSize: '32px',
				color: 'black'
			})
			.setDepth(10)
			.setScrollFactor(0, 0);

		this.budsGroup = this.physics.add.staticGroup({
			classType: Buds
		});
		// @ts-ignore
		this.physics.add.overlap(this.player, this.budsGroup, this.handCollectBuds, undefined, this);

		this.note7Group = this.physics.add.staticGroup({
			classType: Note7
		});
		// @ts-ignore
		this.physics.add.overlap(this.player, this.note7Group, this.handCollectNote7, undefined, this);

		//클릭(터치) 이벤트 처리
		window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
		this.input.on('pointerdown', (/** @type {Phaser.Input.Pointer} */ _pointer) => {
			this.pointer = _pointer;
			if (this.pointer.x < this.scale.width / 2) {
				this.player.setFlipX(true);
			} else {
				this.player.setFlipX(false);
			}
		});
		// 포인터가 화면에서 떨어질 때의 이벤트를 처리합니다.
		this.input.on('pointerup', () => {
			this.pointer = null;
			this.player.setVelocityX(0);
		});
	}
	/**
	 *
	 * @param {number} time
	 * @param {number} delta
	 */
	// @ts-ignore
	update(time, delta) {
		if (this.player.body.velocity.y > 2000) {
			this.scene.start('GameOver', { score: this.score });
		}
		this.platforms.children.iterate((child) => {
			const platform = /** @type {Phaser.Physics.Arcade.Image} */ (child);

			const scrollY = this.cameras.main.scrollY;
			if (platform.y >= scrollY + this.scale.height + 200) {
				platform.destroy();
				const new_x = Phaser.Math.Between(0, this.scale.width - 200);
				const new_y = this.platform_max_y - Phaser.Math.Between(300, 480);
				const new_platform_key = Phaser.Math.RND.pick(this.platform_keys);
				const new_platform = this.platforms.create(new_x, new_y, new_platform_key).setOrigin(0);
				new_platform.scale = 0.25;

				const body = new_platform.body;
				this.platform_max_y = new_platform.y;
				body.updateFromGameObject();
				this.score += 1000;
				this.scoreText.setText(`SAMSUNG: ${this.score} KRW`);
				if (Math.random() < 0.1 && this.player.body.velocity.y > -1225) {
					this.budsGroup.get(
						Phaser.Math.Between(0, this.scale.width - 200),
						new_y - Phaser.Math.Between(600, 1000),
						'buds'
					);
				}
				if (Math.random() < 0.1 && this.player.body.velocity.y > -1225) {
					this.note7Group.get(
						Phaser.Math.Between(0, this.scale.width - 200),
						new_y - Phaser.Math.Between(600, 1000),
						'note7'
					);
				}
				return false;
			}
			return true;
		});

		if (Math.abs(this.player.body.velocity.x) > 20) {
			this.player.setFlipX(this.player.body.velocity.x < 0);
		}

		const touchingDown = this.player.body.touching.down;
		if (this.cursors) {
			if (this.cursors.left.isDown && !touchingDown) {
				this.player.setVelocityX(-700);
				this.player.setFlipX(true);
			} else if (this.cursors.right.isDown && !touchingDown) {
				this.player.setVelocityX(700);
				this.player.setFlipX(false);
			} else if (this.pointer && this.pointer.isDown) {
				// 포인터가 화면에 닿아 있는 경우, 포인터 입력을 처리합니다.
				if (this.pointer.x < this.scale.width / 2) {
					this.player.setVelocityX(-700);
					this.player.setFlipX(true);
				} else {
					this.player.setVelocityX(700);
					this.player.setFlipX(false);
				}
			} else {
				this.player.setVelocityX(0);
			}
		}

		this.horizontalWrap(this.player);
	}
	/**
	 *
	 * @param {Phaser.Physics.Arcade.Image} sprite
	 */
	horizontalWrap(sprite) {
		const halfWidth = sprite.displayWidth / 2;
		const gameWidth = this.scale.width;
		if (sprite.x < -halfWidth) {
			sprite.x = gameWidth + halfWidth;
		} else if (sprite.x > gameWidth + halfWidth) {
			sprite.x = -halfWidth;
		}
	}
	/**
	 *
	 * @param {Phaser.Types.Physics.Arcade.ImageWithDynamicBody} player
	 * @param {Phaser.Physics.Arcade.Image} platform
	 */
	onPlatformCollision(player, platform) {
		const isOnPlatform = player.body.touching.down;

		if (isOnPlatform) {
			this.player.setVelocityY(-1225);
		}
		if (platform.texture.key === 'laundry' && isOnPlatform) {
			// @ts-ignore
			const tween = this.tweens.add({
				targets: this.cameras.main,
				rotation: 2 * Math.PI,
				duration: 500,
				ease: 'Linear'
			});
		}
	}
	/**
	 *
	 * @param {Phaser.Types.Physics.Arcade.ImageWithDynamicBody} player
	 * @param {Phaser.Physics.Arcade.Image} buds
	 */
	handCollectBuds(player, buds) {
		buds.destroy();
		player.setTexture('rocket');
		player.body.setAllowGravity(false);
		player.setVelocityY(-3500);

		this.time.delayedCall(3000, () => {
			player.setTexture('character');
		});
		this.time.delayedCall(1000, () => {
			player.body.setAllowGravity(true);
		});
	}
	/**
	 *
	 * @param {Phaser.Types.Physics.Arcade.ImageWithDynamicBody} player
	 * @param {Phaser.Physics.Arcade.Image} note7
	 */
	// @ts-ignore
	handCollectNote7(player, note7) {
		note7.destroy();
		this.scene.start('GameOver', { score: this.score });
	}
	/**
	 *
	 * @param {DeviceOrientationEvent} event
	 */
	handleOrientation(event) {
		const x = event.gamma; // x 축 기울기
		if (this.player && x) {
			this.player.setVelocityX(x * 70);
		}
	}
}
