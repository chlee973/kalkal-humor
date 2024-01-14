<script>
	import { page } from '$app/stores';
</script>

<div class="error-box">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>

<style>
	.error-box {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
