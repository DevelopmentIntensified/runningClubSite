<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import { fade } from 'svelte/transition';

	import '../app.css';
	export let data;
	$: pathname = data.pathname;
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	{#key pathname}
		<main class="flex-grow" in:fade={{ duration: 300, delay: 200 }} out:fade={{ duration: 100 }}>
			<slot />
		</main>
	{/key}
</div>

<footer class="mt-12 bg-gray-100 py-4 text-center">
	<p>&copy; {new Date().getFullYear()} Liberty Running Club. All rights reserved.</p>
</footer>

<style>
	/* Add your styles here */
</style>
