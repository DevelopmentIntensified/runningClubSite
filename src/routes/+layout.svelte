<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import { fade } from 'svelte/transition';
  import type { LayoutData } from './$types';
  import '../app.css';
  import { onMount } from 'svelte';

  export let data: LayoutData;
  console.warn('DEBUGPRINT[3]: +layout.svelte:6: data=', data);
  $: pathname = data.pathname;

  onMount(async () => {
    const { injectSpeedInsights } = await import('@vercel/speed-insights/sveltekit');
    const { injectAnalytics } = await import('@vercel/analytics/sveltekit');
    injectSpeedInsights();
    injectAnalytics();
  });
</script>

<div class="flex min-h-screen flex-col">
  <Navbar
    isAdmin={!!data.user?.isAdmin}
    isLoggedIn={data.isLoggedIn}
  />
  {#key pathname}
    <main class="flex-grow" in:fade={{ duration: 300, delay: 200 }} out:fade={{ duration: 100 }}>
      <slot />
    </main>
  {/key}
</div>

<footer class="bg-gray-100 py-6 text-center text-sm text-slate-600">
  <p class="mb-2">&copy; {new Date().getFullYear()} Liberty Running Club. All rights reserved.</p>
  <p>
    <a href="/privacy" class="font-medium text-primary-600 hover:text-primary-800">Privacy Policy</a>
  </p>
</footer>

<style>
  /* Add your styles here */
</style>
