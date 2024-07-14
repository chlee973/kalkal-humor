<script>
	import { slide } from 'svelte/transition';

	let isActive = false;

	const toggleNavBar = () => {
		isActive = !isActive;
	};
	const closeNavBar = () => {
		isActive = false;
	};
</script>

<nav class="navbar">
	<div class="navbar__logo">
		<a href="/">공대생 깔깔유머</a>
	</div>
	{#key isActive}
		<ul class="navbar__menu" class:active={isActive} transition:slide={{ duration: 300 }}>
			<li><a href="/humor" on:click={closeNavBar}>유머 게시판</a></li>
			<li><a href="/quote" on:click={closeNavBar}>명언 게시판</a></li>
			<li><a href="/arcade" on:click={closeNavBar}>오락실</a></li>
		</ul>
	{/key}
	<button class="navbar__toggleBtn" aria-label="toggle menu" on:click={toggleNavBar}
		><i class="fas fa-hamburger"></i></button
	>
</nav>

<style>
	a {
		text-decoration: none;
		color: white;
	}
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #244f26;
		padding: 8px 12px;
	}
	.navbar__logo {
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		color: white;
	}
	.navbar__menu {
		display: flex;
		list-style: none;
		padding-left: 0;
	}
	.navbar__menu li {
		padding: 8px 12px;
	}
	.navbar__toggleBtn {
		display: none;
		position: absolute;
		top: 12px;
		right: 12px;
		font-size: 1.5rem;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		color: white;
		cursor: pointer;
	}
	@media screen and (max-width: 768px) {
		.navbar {
			flex-direction: column;
			align-items: flex-start;
		}
		.navbar__menu {
			flex-direction: column;
			align-items: center;
			width: 100%;
			display: none;
		}
		.navbar__menu.active {
			display: flex;
		}
		.navbar__menu li {
			width: 100%;
			text-align: center;
		}
		.navbar__toggleBtn {
			display: block;
		}
	}
</style>
