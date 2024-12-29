<script>
  import Navbar from '$lib/components/Navbar.svelte';
  export let data;
</script>

<div class="flex flex-col min-h-screen">
  <Navbar isAdmin={$page.data.user?.isAdmin} />
  <main class="flex-grow">
    <slot />
  </main>
</div>

<style>
  /* Add your styles here */
</style>

