<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import locale_ko from 'dayjs/locale/ko';
	dayjs.extend(relativeTime);
	dayjs.locale('ko');
	/** @type {string} */
	export let title;
	/** @type {string} */
	export let nickname;
	/** @type {Date} */
	export let created_at;
</script>

<h2>{title}</h2>
<div class="post-meta-box">
	<div class="left">
		<div class="post-nickname">{nickname}</div>
		<div class="post-created-at">
			<i class="fa-regular fa-clock"></i>
			{dayjs(created_at).fromNow()}
		</div>
	</div>
	<div class="right">
		<button class="more-btn"><i class="fa-solid fa-ellipsis"></i></button>
	</div>
</div>

<style>
	.post-meta-box {
		display: flex;
		justify-content: space-between;
		border: 1px solid lightgray;
		border-top: 2px solid lightgray;
		padding: 8px 12px;
	}
	.post-meta-box .left {
		display: flex;
		align-items: baseline;
		gap: 16px;
	}
	.post-meta-box .post-nickname {
		font-weight: 500;
	}
	.post-meta-box .post-created-at {
		font-size: 0.8rem;
	}
	.post-meta-box .more-btn {
		font-size: 1.5rem;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		cursor: pointer;
		color: black;
	}
</style>
