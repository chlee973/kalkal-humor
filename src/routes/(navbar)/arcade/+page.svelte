<script>
	import GameCard from './GameCard.svelte';
</script>

<h3 class="page-header"><a href="/arcade">오락실</a></h3>
<div class="grid-container">
	<GameCard
		title="별 피하기"
		content="좌우로 움직여 별을 피해보세요!"
		imgSrc="/arcade_thumbnails/screenshot_dodge_star.png"
		imgAlt="별피하기 스크린샷"
		href="/arcade/dodge_star"
	/>
	<GameCard
		title="재용점프"
		content="역경을 딛고 삼성의 주가를 올려보세요!"
		imgSrc="/arcade_thumbnails/screenshot_jaeyong_jump.png"
		imgAlt="재용점프 스크린샷"
		href="/arcade/jaeyong_jump"
	/>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 20px;
		justify-items: center;
	}
	a {
		text-decoration: none;
		color: #244f26;
	}
</style>
