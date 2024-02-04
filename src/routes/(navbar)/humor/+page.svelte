<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import locale_ko from 'dayjs/locale/ko';
	dayjs.extend(relativeTime);
	dayjs.locale('ko');
	export let data;
</script>

<div class="write-btn-container">
	<a class="write-btn" href="/humor/create"><i class="fa-solid fa-pencil"></i> 글쓰기</a>
</div>
<table class="desktop-table">
	<thead>
		<tr>
			<th>제목</th>
			<th>작성자</th>
			<th>추천 수 </th>
			<th>날짜</th>
		</tr>
	</thead>
	<tbody>
		{#each data.posts as post}
			<tr>
				<td class="title-cell">
					<a href="/humor/detail/{post.id}">
						<span class="title">
							{post.title}
						</span>
						{#if post.image}
							<span><i class="fa-regular fa-image"></i></span>
						{/if}
						<span class="comment_count">[{post.comment_count}]</span>
					</a>
				</td>
				<td class="nickname-cell">
					<span>{post.nickname}</span>
				</td>
				<td class="upvote_count-cell">
					<span>{post.upvote_count}</span>
				</td>
				<td class="created_at-cell">
					<span>{dayjs(post.created_at).fromNow()}</span>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<ul class="mobile-list">
	{#each data.posts as post}
		<li>
			<a href="/humor/detail/{post.id}">
				<div class="list-header">
					<div class="title">{post.title}</div>
					{#if post.image}
						<div><i class="fa-regular fa-image"></i></div>
					{/if}
					<div class="comment_count">[{post.comment_count}]</div>
				</div>
				<div class="list-meta">
					<div class="list-meta-left">
						<span><i class="fa-regular fa-thumbs-up"></i> {post.upvote_count}</span>
						<span><i class="fa-regular fa-clock"></i> {dayjs(post.created_at).fromNow()}</span>
					</div>
					<div class="list-meta-right">
						<span>{post.nickname}</span>
					</div>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.write-btn-container {
		display: flex;
		justify-content: flex-end;
	}
	.write-btn-container .write-btn {
		font-size: 0.8rem;
		margin-bottom: 8px;
		padding: 8px 12px;
		background-color: #244f26;
		border-radius: 8px;
		color: white;
		cursor: pointer;
	}
	table {
		width: 100%;
		table-layout: fixed;
		line-height: 2.5;
		border-collapse: collapse;
	}
	tr {
		display: table-row;
		border-top: 1px solid #ededed;
		border-bottom: 1px solid #ededed;
	}
	a {
		color: black;
		text-decoration: none;
	}
	.title-cell a {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.title-cell .title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.title-cell .comment_count {
		color: #244f26;
	}
	th:nth-child(n + 2),
	td:nth-child(n + 2) {
		text-align: center;
		width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	th:first-child,
	td:first-child {
		width: auto;
	}

	ul.mobile-list {
		display: none;
		list-style-type: none;
		padding: 0;
	}
	ul.mobile-list li:first-child {
		border-top: 1px solid #ededed;
	}
	ul.mobile-list li {
		border-bottom: 1px solid #ededed;
	}
	ul.mobile-list li a {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 8px 0;
	}
	ul.mobile-list .list-header {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	ul.mobile-list .list-header .title {
		max-width: 80%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	ul.mobile-list .list-header .comment_count {
		color: #244f26;
	}
	ul.mobile-list .list-meta {
		display: flex;
		justify-content: space-between;
	}

	ul.mobile-list .list-meta .list-meta-left {
		display: flex;
		gap: 12px;
		font-size: 0.9rem;
	}
	ul.mobile-list .list-meta .list-meta-right {
		font-size: 0.9rem;
	}
	@media screen and (max-width: 768px) {
		table.desktop-table {
			display: none;
		}
		ul.mobile-list {
			display: block;
		}
	}
</style>
