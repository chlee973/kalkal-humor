<script>
	/** @type {boolean} */
	export let checked;
</script>

<label class="toggle">
	<input type="checkbox" bind:checked />
	<span class="toggle-slider"></span>
</label>

<style>
	.toggle {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 34px;
	}

	.toggle-slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .toggle-slider {
		background-color: #244f26;
	}

	input:checked + .toggle-slider:before {
		transform: translateX(26px);
	}
</style>
