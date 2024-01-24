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
				<td class="title">
					<a href="/humor/detail/{post.id}">
						<span>
							{post.title}
						</span>
						<span class="comment_count"> [{post.comment_count}] </span>
					</a>
				</td>
				<td class="nickname">
					<span>{post.nickname}</span>
				</td>
				<td class="upvote_count">
					<span>{post.upvote_count}</span>
				</td>
				<td class="created_at">
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
		line-height: 2;
		border-collapse: collapse;
	}
	tr {
		display: table-row;
		border-top: 1px solid #ededed;
		border-bottom: 1px solid #ededed;
	}
	td.nickname,
	td.upvote_count,
	td.created_at {
		text-align: center;
	}
	a {
		color: black;
		text-decoration: none;
	}

	a span.comment_count {
		color: #244f26;
	}
</style>
