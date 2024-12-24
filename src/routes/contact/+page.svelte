<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types'

	let { data, form }: { data: PageData, form: ActionData } = $props();

	let formData = {
		name: '',
		email: '',
		message: ''
	};

</script>

<svelte:head>
	<title>Contact Us - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<h1 class="mb-8 text-center text-4xl font-bold">Contact Us</h1>

	{#if form?.success}
		<div
			class="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
			role="alert"
		>
			<strong class="font-bold">Thank you!</strong>
			<span class="block sm:inline"> Your message has been sent. We'll get back to you soon.</span>
		</div>
	{:else}
		<form method="post" use:enhance class="mx-auto max-w-lg">
			<div class="mb-4">
				<label for="name" class="mb-2 block text-sm font-bold text-gray-700">Name</label>
				<input
					type="text"
					id="name"
					bind:value={formData.name}
					name="name"
					required
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				/>
			</div>
			<div class="mb-4">
				<label for="email" class="mb-2 block text-sm font-bold text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={formData.email}
					required
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				/>
			</div>
			<div class="mb-6">
				<label for="message" class="mb-2 block text-sm font-bold text-gray-700">Message</label>
				<textarea
					id="message"
					name="message"
					bind:value={formData.message}
					required
					rows="5"
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				></textarea>
			</div>
			<div class="flex items-center justify-between">
				<button
					type="submit"
					class="focus:shadow-outline rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
				>
					Send Message
				</button>
			</div>
		</form>
	{/if}
</div>
