<script>
	import { page } from '$app/stores';
	import TopNavBar from '$lib/components/TopNavBar.svelte';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
		integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
	<link rel="stylesheet" href="/global.css" />
</svelte:head>
<header>
	<TopNavBar />
</header>
<div class="container">
	<div class="error-box">
		<h1>{$page.status}: {$page.error?.message}</h1>
	</div>
</div>
<footer>
	<div class="copyright">
		<p>Copyright &copy; 2024 공대생 깔깔유머</p>
	</div>
</footer>

<style>
	footer .copyright {
		text-align: center;
	}
	.container {
		margin: 0 auto;
		max-width: 1320px;
		padding: 0 2rem;
	}
	@media (max-width: 1199px) {
		.container {
			max-width: 1140px;
			padding: 0 1rem; /* 중간 단계에서는 좌우 여백을 작게 조절해주세요 */
		}
	}

	@media (max-width: 991px) {
		.container {
			max-width: 960px;
		}
	}
	@media (max-width: 767px) {
		.container {
			max-width: 100%; /* 모바일에서는 최대 너비를 100%로 지정해주세요 */
			padding: 12px;
		}
	}
	.error-box {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
