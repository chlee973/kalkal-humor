<header>
	<nav>
		<div class="logo">
			<h1><a href="/">공대생 깔깔유머</a></h1>
		</div>
		<ul>
			<li><a href="/humor">유머 게시판</a></li>
			<li><a href="/quote">명언 게시판</a></li>
			<li><a href="/arcade">오락실</a></li>
		</ul>
	</nav>
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
	nav {
		display: flex;
		justify-content: space-between;
		background-color: cornflowerblue;
	}
	nav ul {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style-type: none;
		padding: 1rem 2rem;
		margin: 0;
	}

	nav ul li {
		margin: 0 0.5rem;
	}
	.logo {
		padding: 0 1rem;
	}
	a {
		text-decoration: none;
		color: white;
	}
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
