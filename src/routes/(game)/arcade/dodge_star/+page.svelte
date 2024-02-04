<script>
	import { onDestroy, onMount } from 'svelte';
	import { baseUrl } from '$lib/config';
	import { browser } from '$app/environment';

	/** @type {Phaser.Game} */
	let gameInstance;

	let Phaser;
	let Game;
	onMount(async () => {
		Phaser = (await import('phaser')).default;
		Game = (await import('./src/scenes/Game')).default;

		const config = {
			type: Phaser.AUTO,
			backgroundColor: '#dddddd',
			scale: {
				parent: 'phaser-game',
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 1024,
				height: 768
			},
			loader: {
				baseURL: `${baseUrl}/arcade_assets/dodge_star`
			},
			physics: {
				default: 'arcade',
				arcade: {
					debug: false,
					gravity: { y: 1500 }
				}
			},
			scene: [Game]
		};
		gameInstance = new Phaser.Game(config);
	});
	onDestroy(() => {
		if (browser && gameInstance) {
			gameInstance.destroy(true);
		}
	});
</script>

<div id="phaser-game"></div>

<style>
	#phaser-game {
		width: 100%;
		height: 100%;
	}
</style>
