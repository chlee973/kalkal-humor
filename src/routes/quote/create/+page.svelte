<script>
	import ToggleButton from '$lib/components/ToggleButton.svelte';
	import QuoteViewer from '../QuoteViewer.svelte';

	/** @type {string} */
	let title = '';
	/** @type {string} */
	let nickname = '';
	/** @type {string} */
	let password = '';
	/** @type {string} */
	let content = '';
	/** @type {string} */
	let speaker = '';
	/** @type {boolean} */
	let checked = false;
</script>

<div class="toggle-button-container">
	<div class="toggle-button-label">명언 뷰어 미리보기</div>
	<ToggleButton bind:checked />
</div>
{#if checked}
	<QuoteViewer {content} {speaker} />
{:else}
	<form method="POST" class="quote-form">
		<div class="input-group">
			<input
				type="text"
				class="input-left"
				name="nickname"
				placeholder="닉네임"
				bind:value={nickname}
				required
			/>
			<input
				type="password"
				class="input-right"
				name="password"
				placeholder="비밀번호"
				bind:value={password}
				required
			/>
		</div>
		<div class="title">
			<label for="title" class="form-label">게시글 제목</label>
			<input name="title" type="text" bind:value={title} required />
			<div class="form-text">명언이 주는 감동에 걸맞은 멋진 제목을 지어보자</div>
		</div>
		<div class="content">
			<label for="content" class="form-label">내용</label>
			<textarea name="content" rows="5" bind:value={content} required />
		</div>
		<div class="speaker">
			<label for="title" class="form-label">명언을 말한 사람</label>
			<input name="speaker" type="text" bind:value={speaker} required />
		</div>
		<div class="submit-button-container">
			<button type="submit">등록</button>
		</div>
	</form>
{/if}

<style>
	.toggle-button-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-bottom: 8px;
		gap: 12px;
	}
	.toggle-button-label {
		font-size: 0.9rem;
	}
	.quote-form {
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
	input,
	textarea {
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
	.form-text {
		font-size: 0.9rem;
	}
	.title input[type='text'] {
		box-sizing: border-box;
		width: 100%;
	}
	.content textarea {
		box-sizing: border-box;
		width: 100%;
		line-height: 1.5;
	}
	.speaker input[type='text'] {
		box-sizing: border-box;
		width: 100%;
	}
	button {
		font-size: 0.8rem;
		padding: 8px 12px;
		background-color: #244f26;
		border-radius: 8px;
		color: white;
		cursor: pointer;
		box-shadow: none;
		border: none;
	}
	button:focus,
	button:active {
		outline: none;
		box-shadow: none;
	}
	.submit-button-container {
		display: flex;
		justify-content: flex-end;
	}
</style>
