<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>News - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<h1 class="mb-8 text-center text-4xl font-bold">Latest News</h1>

	<div class="space-y-8">
		{#each data.news as item}
			<div class="overflow-hidden rounded-lg bg-white shadow-md">
				<div class="p-6">
					<h2 class="mb-2 text-2xl font-semibold">{item.title}</h2>
					<p class="mb-4 text-gray-600">{item.content}</p>
					<p class="text-sm text-gray-500">
						Posted on {new Date(item.createdAt).toLocaleDateString()}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
