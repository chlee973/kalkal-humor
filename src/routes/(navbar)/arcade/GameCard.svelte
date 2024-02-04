<script>
	/** @type {string} */
	export let title;
	/** @type {string} */
	export let content;
	/** @type {string} */
	export let imgSrc;
	/** @type {string} */
	export let imgAlt;
	/** @type {string} */
	export let href;
</script>

<div class="card-container">
	<a {href}>
		<div class="card-img-container">
			<img src={imgSrc} alt={imgAlt} class="card-img" />
		</div>
		<div class="card-text-container">
			<div class="card-title">{title}</div>
			<div class="card-content">{content}</div>
		</div>
	</a>
</div>

<style>
	.card-container {
		width: 300px;
		border-radius: 16px;
		overflow: hidden;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	a {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: black;
	}
	.card-img-container {
		width: 100%;
		aspect-ratio: 4/3;
	}
	.card-text-container {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 8px 12px;
	}
	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.card-title {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
