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
<table>
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
	td.nickname-cell,
	td.upvote_count-cell,
	td.created_at-cell {
		text-align: center;
	}
	a {
		color: black;
		text-decoration: none;
	}
	.title-cell a {
		display: flex;
		align-items: baseline;
	}
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.comment_count {
		color: #244f26;
		margin-left: 8px;
	}
	th:nth-child(n + 2),
	td:nth-child(n + 2) {
		width: 75px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	th:first-child,
	td:first-child {
		width: auto;
	}

	@media screen and (max-width: 768px) {
		tr > *:nth-child(n + 2),
		th {
			display: none;
		}
	}
</style>
