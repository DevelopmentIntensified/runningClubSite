<script>
	import { enhance } from '$app/forms';

	let formData = {
		name: '',
		email: '',
		message: ''
	};

	let submitted = false;

	function handleSubmit() {
		// Here you would typically send the form data to your server
		// For now, we'll just simulate a successful submission
		submitted = true;
	}
</script>

<svelte:head>
	<title>Contact Us - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<h1 class="mb-8 text-center text-4xl font-bold">Contact Us</h1>

	{#if submitted}
		<div
			class="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
			role="alert"
		>
			<strong class="font-bold">Thank you!</strong>
			<span class="block sm:inline"> Your message has been sent. We'll get back to you soon.</span>
		</div>
	{:else}
		<form on:submit|preventDefault={handleSubmit} use:enhance class="mx-auto max-w-lg">
			<div class="mb-4">
				<label for="name" class="mb-2 block text-sm font-bold text-gray-700">Name</label>
				<input
					type="text"
					id="name"
					bind:value={formData.name}
					required
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				/>
			</div>
			<div class="mb-4">
				<label for="email" class="mb-2 block text-sm font-bold text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					required
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				/>
			</div>
			<div class="mb-6">
				<label for="message" class="mb-2 block text-sm font-bold text-gray-700">Message</label>
				<textarea
					id="message"
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
