<script>
	import QuoteViewer from '../../QuoteViewer.svelte';
	import PostMetaBox from '$lib/components/PostMetaBox.svelte';
	export let data;
</script>

<PostMetaBox
	title={data.post.title}
	nickname={data.post.nickname}
	created_at={data.post.created_at}
/>
<QuoteViewer content={data.post.content} speaker={data.post.speaker} />
