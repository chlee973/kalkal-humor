<script>
	/** @type {string} */
	export let content;
	/** @type {string} */
	export let speaker;
</script>

<div class="quote-container">
	<img
		src="https://images.unsplash.com/photo-1588001832198-c15cff59b078?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		class="quote-bg"
		alt="quote-bg"
	/>
	<div class="quote-text-box">
		<div class="quote-icon">
			<i class="fa-solid fa-quote-left"></i>
		</div>
		<div class="quote-content">
			{content}
		</div>
		<div class="quote-speaker">- {speaker} -</div>
	</div>
</div>

<style>
	.quote-container {
		position: relative;
	}
	.quote-container .quote-bg {
		width: 100%;
		filter: brightness(50%);
	}
	.quote-container .quote-text-box {
		position: absolute;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		color: white;
		font-family: 'Nanum Myeongjo', serif;
		font-weight: 400;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: center;
		padding-top: 20%;
		padding-bottom: 20%;
	}
	.quote-container .quote-icon {
		font-size: min(8vw, calc(1320px * 0.08));
	}
	.quote-container .quote-content {
		font-size: min(5vw, calc(1320px * 0.05));
		line-height: 2.5;
		white-space: pre-wrap;
	}
	.quote-container .quote-speaker {
		font-size: min(3vw, calc(1320px * 0.03));
	}
</style>
