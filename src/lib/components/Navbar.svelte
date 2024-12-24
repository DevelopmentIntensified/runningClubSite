<script lang="ts">
	import { page } from '$app/stores';
	import logoUrl from '$lib/assets/images/logos/logo.png';
	  import { slide } from 'svelte/transition';

	const data = $page.data;
	const isAdmin = data.isAdmin;

	let isOpen = false;

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/schedule', label: 'Schedule' },
		{ href: '/locations', label: 'Locations' },
		// { href: '/alumni', label: 'Alumni' },
		{ href: '/records', label: 'Records' },
		{ href: '/contact', label: 'Contact' }
		// { href: '/news', label: 'News' }
	];

	const adminItems = [{ href: '/admin/news', label: 'Manage News' }];
	console.log(logoUrl);
 function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }
</script>

<nav class="bg-primary-600 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0">
          <img class="h-16 w-16" src={logoUrl} alt="Liberty Running Club" />
        </a>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            {#each navItems as item}
              <a
                href={item.href}
                class="px-2 py-2 rounded-md text-sm font-medium hover:bg-primary-700 {$page.url.pathname === item.href ? 'bg-primary-700' : ''}"
              >
                {item.label}
              </a>
            {/each}
            {#if isAdmin}
              {#each adminItems as item}
                <a
                  href={item.href}
                  class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 {$page.url.pathname === item.href ? 'bg-primary-700' : ''}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
                  </svg>
                  {item.label}
                </a>
              {/each}
            {/if}
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <div class="ml-4 flex items-center md:ml-6">
          {#if $page.data.user}
            <form action="/api/logout" method="POST">
              <button type="submit" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">Logout</button>
            </form>
          {:else}
            <!-- <a href="/login" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">Login</a> -->
            <!-- <a href="/register" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">Register</a> -->
          {/if}
        </div>
      </div>
      <div class="md:hidden">
        <button on:click={toggleMenu} class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span class="sr-only">Open main menu</span>
          {#if isOpen}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  {#if isOpen}
    <div transition:slide="{{ duration: 300 }}" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#each navItems as item}
          <a
            href={item.href}
            on:click={closeMenu}
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700 {$page.url.pathname === item.href ? 'bg-primary-700' : ''}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
            </svg>
            {item.label}
          </a>
        {/each}
        {#if isAdmin}
          {#each adminItems as item}
            <a
              href={item.href}
              on:click={closeMenu}
              class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700 {$page.url.pathname === item.href ? 'bg-primary-700' : ''}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
              </svg>
              {item.label}
            </a>
          {/each}
        {/if}
        {#if $page.data.user}
          <form action="/api/logout" method="POST" class="block">
            <button type="submit" on:click={closeMenu} class="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Logout</button>
          </form>
        {:else}
          <!-- <a href="/login" on:click={closeMenu} class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Login</a> -->
          <!-- <a href="/register" on:click={closeMenu} class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Register</a> -->
        {/if}
      </div>
    </div>
  {/if}
</nav>


