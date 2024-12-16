<script>
	import Navbar from '$lib/components/Navbar.svelte';

	import '../app.css';
</script>

<div class="flex min-h-screen flex-col">
	<Navbar/>
	<main class="flex-grow">
		<slot />
	</main>
</div>

<style>
	/* Add your styles here */
</style>

<footer class="bg-gray-100 text-center py-4 mt-12">
  <p>&copy; {new Date().getFullYear()} Liberty Running Club. All rights reserved.</p>
</footer>
