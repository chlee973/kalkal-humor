<script>
	import PostMetaBox from '$lib/components/PostMetaBox.svelte';
	export let data;
</script>

<PostMetaBox
	title={data.post.title}
	nickname={data.post.nickname}
	created_at={data.post.created_at}
/>
<div class="post-container">
	{#if data.post.image}
		<img src={data.post.image} alt={data.post.image.split('/').pop()} />
	{/if}
	<p>{data.post.content}</p>
</div>

<style>
	img {
		width: 50%;
		min-width: 400px;
	}
</style>
