<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let email = '';
	let error = '';
	let emailSent = false;
	let code = '';

	async function handleCodeCheck() {
		const res = await fetch('/login/email/code', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code
			})
		});
		const json = await res.json();
		if (json.error) {
			error = json.error;
		}
	}

	async function handleSubmit(event: Event) {
		const res = await fetch('/login/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email
			})
		});
		const json = await res.json();
		if (json.error) {
			error = json.error;
		} else {
			emailSent = true;
		}
	}

	onMount(() => {
		let params = new URLSearchParams(window.location.search);
		let hasError = params.has('error');

		if (hasError) {
			error = params.get('error') as string;
		}
	});
</script>

<svelte:head>
	<title>Login - Liberty Running Club</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md">
		<div>
			{#if !emailSent}
				<h2 class="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
				<h4 class="mt-2 text-center">
					Please use your Liberty Email so that we can verify that you are affiliated with Liberty
					University.
				</h4>
			{:else}
				<h4 class="mt-2 text-center">
					Please input the code sent to your email or click the link sent to your email.
				</h4>
			{/if}
			<div class="h-6 w-full space-x-2 text-center text-red-400">
				{#if error !== ''}
					{error}
				{/if}
			</div>
		</div>
		<form class="mt-3" on:submit|preventDefault={handleSubmit}>
			<input type="hidden" name="remember" value="true" />

			{#if error}
				<div class="text-sm text-red-500">{error}</div>
			{/if}

			<div class="rounded-md shadow-sm">
				{#if emailSent}
					<button
						class="mb-5 ring-offset-background focus-visible:ring-ring text-primary-foreground inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						on:click={handleSubmit}>Resend Email</button
					>
					<input
						id="code-address"
						name="code"
						type="code"
						required
						class="relative block w-full appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
						placeholder="code"
						bind:value={code}
					/>
					<button
						class="ring-offset-background focus-visible:ring-ring text-primary-foreground inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-3"
						on:click={handleCodeCheck}>Verify</button
					>
				{:else}
					<label for="email-address" class="sr-only"
						>Email address. Please use your Email Email so that we can verify that you are
						affiliated with Liberty University.</label
					>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
						placeholder="Email address"
						bind:value={email}
					/>
					<button
						type="submit"
						class="relative mt-2 flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
					>
						Sign in
					</button>
				{/if}
			</div>
		</form>
	</div>
</div>
