<script>
	export let data;
</script>

<h1>명언 게시판</h1>
<p>명언을 보여주는 페이지이다.</p>
{#each data.posts as post}
	<div class="post-box"></div>
	<h2>
		{post.title}
	</h2>
	<h2>
		{post.nickname}
	</h2>
	<h2>
		{post.content}
	</h2>
	<h2>
		{post.password}
	</h2>
{/each}

<style>
	.post-box {
		margin: 10px;
		padding: 10px;
		border: 1px solid black;
	}
</style>
