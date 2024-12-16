<script lang="ts">
	import { enhance } from '$app/forms';

	let title = '';
	let content = '';
	let error = '';
	let success = '';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const response = await fetch('/api/news', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, content })
		});

		const result = await response.json();

		if (response.ok) {
			success = result.message;
			title = '';
			content = '';
			error = '';
		} else {
			error = result.message;
			success = '';
		}
	}
</script>

<svelte:head>
	<title>Add News - Admin - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<h1 class="mb-8 text-center text-4xl font-bold">Add News</h1>

	<form on:submit={handleSubmit} class="mx-auto max-w-lg">
		<div class="mb-4">
			<label for="title" class="mb-2 block text-sm font-bold text-gray-700">Title</label>
			<input
				type="text"
				id="title"
				bind:value={title}
				required
				class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
			/>
		</div>
		<div class="mb-6">
			<label for="content" class="mb-2 block text-sm font-bold text-gray-700">Content</label>
			<textarea
				id="content"
				bind:value={content}
				required
				rows="5"
				class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
			></textarea>
		</div>

		{#if error}
			<div class="mb-4 text-sm text-red-500">{error}</div>
		{/if}

		{#if success}
			<div class="mb-4 text-sm text-green-500">{success}</div>
		{/if}

		<div class="flex items-center justify-between">
			<button
				type="submit"
				class="focus:shadow-outline rounded bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none"
			>
				Add News
			</button>
		</div>
	</form>
</div>
