<script>
	import TopNavBar from '$lib/components/TopNavBar.svelte';
</script>

<header>
	<TopNavBar />
</header>
<div class="container">
	<slot />
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
		}
	}
</style>
