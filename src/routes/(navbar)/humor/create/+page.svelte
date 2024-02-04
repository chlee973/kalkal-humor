<form method="POST" enctype="multipart/form-data" class="humor-form">
	<div class="input-group">
		<input type="text" class="input-left" name="nickname" placeholder="닉네임" required />
		<input type="password" class="input-right" name="password" placeholder="비밀번호" required />
	</div>
	<div class="title">
		<label for="title" class="form-label">게시글 제목</label>
		<input name="title" type="text" required />
	</div>
	<div class="image">
		<label for="image" class="form-label">이미지</label>
		<input name="image" type="file" accept="image/*" />
	</div>
	<div class="content">
		<label for="content" class="form-label">내용</label>
		<textarea name="content" rows="5" required />
	</div>
	<div class="submit-button-container">
		<button type="submit">등록</button>
	</div>
</form>

<style>
	.humor-form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.input-group {
		display: flex;
	}
	.input-group .input-left,
	.input-group .input-right {
		min-width: 100px;
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 0;
	}
	.input-group .input-left {
		border-right: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.input-group .input-right {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	textarea,
	input[type='text'],
	input[type='password'] {
		box-sizing: border-box;
		width: 100%;
		font-size: 1rem;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-family: 'Noto Sans Korean', sans-serif;
	}
	.form-label {
		display: block;
		margin-bottom: 3px;
	}
	.submit-button-container {
		display: flex;
		justify-content: flex-end;
	}
	.submit-button-container button {
		font-size: 0.8rem;
		padding: 8px 12px;
		background-color: #244f26;
		border-radius: 8px;
		color: white;
		cursor: pointer;
		box-shadow: none;
		border: none;
	}
</style>
