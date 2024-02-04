<script>
	import { browser } from '$app/environment';
	import { baseUrl } from '$lib/config';
	import { onDestroy, onMount } from 'svelte';
	let clock = '00:00:00';
	let minutes = new Date().getMinutes();
	let facts = '';
	/** @type {number} */
	let timer;
	function digitalClock() {
		const date = new Date();
		const hours = date.getHours();
		minutes = date.getMinutes();
		const seconds = date.getSeconds();
		/** @param {number} num*/
		function zeroPad(num) {
			return num < 10 ? '0' + num : '' + num;
		}
		clock = zeroPad(hours) + ':' + zeroPad(minutes) + ':' + zeroPad(seconds);
		timer = setTimeout(digitalClock, 1000);
	}
	onMount(() => {
		digitalClock();
		fetch(`${baseUrl}/api/numbers?minutes=${minutes}`)
			.then((response) => response.json())
			.then((data) => {
				facts = data.text;
			});
	});
	onDestroy(() => {
		if (timer) {
			clearTimeout(timer);
		}
	});
	$: {
		if (browser) {
			fetch(`${baseUrl}/api/numbers?minutes=${minutes}`)
				.then((response) => response.json())
				.then((data) => {
					facts = data.text;
				});
		}
	}
</script>

<h1>{clock}</h1>
<p>{facts}</p>

<style>
	h1 {
		font-size: 64px;
		text-align: center;
	}
	p {
		text-align: center;
		font-style: italic;
	}
</style>
