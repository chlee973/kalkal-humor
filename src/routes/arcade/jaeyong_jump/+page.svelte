<script>
	import { onDestroy, onMount } from 'svelte';
	import { baseUrl } from '$lib/config';
	import { browser } from '$app/environment';

	/** @type {Phaser.Game} */
	let gameInstance;

	let Phaser;
	let MainMenu;
	let Game;
	let GameOver;
	onMount(async () => {
		Phaser = (await import('phaser')).default;
		MainMenu = (await import('./src/scenes/MainMenu')).default;
		Game = (await import('./src/scenes/Game')).default;
		GameOver = (await import('./src/scenes/GameOver')).default;

		const config = {
			type: Phaser.AUTO,
			backgroundColor: '#dddddd',
			scale: {
				parent: 'phaser-game',
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 768,
				height: 1024
			},
			loader: {
				baseURL: `${baseUrl}/arcade_assets/jaeyong_jump`
			},
			physics: {
				default: 'arcade',
				arcade: {
					debug: false,
					gravity: { y: 1500 }
				}
			},
			scene: [MainMenu, Game, GameOver]
		};
		gameInstance = new Phaser.Game(config);
	});
	onDestroy(() => {
		if (browser && gameInstance) {
			gameInstance.destroy(true);
		}
	});
</script>

<div id="game-container">
	<div id="phaser-game"></div>
	<button id="start-button">Start Game</button>
</div>

<style>
	#game-container {
		position: relative;
	}

	#start-button {
		display: none;
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: 'Jua';
		font-size: larger;
		color: black;
	}

	#phaser-game {
		position: relative;
		overflow: hidden;
	}
</style>
