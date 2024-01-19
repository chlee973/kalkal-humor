<script>
	export let data;
</script>

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
					<span>
						<a href="/quote/detail/{post.id}">
							<span>
								{post.title}
							</span>
							<span class="comment_count"> [{post.comment_count}] </span>
						</a>
					</span>
				</td>
				<td class="nickname">
					<span>{post.nickname}</span>
				</td>
				<td class="upvote_count">
					<span>{post.upvote_count}</span>
				</td>
				<td class="created_at">
					<span>{post.created_at.toISOString().split('T')[0].replaceAll('-', '.')}</span>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
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
		color: cornflowerblue;
	}
</style>
