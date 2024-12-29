<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';

  export let isAdmin = false;

  let isOpen = false;

  const navItems = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/schedule', label: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/locations', label: 'Locations', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { href: '/records', label: 'Records', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/alumni', label: 'Alumni', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: '/leaders', label: 'Leaders', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { href: '/news', label: 'News', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { href: '/contact', label: 'Contact', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  const adminItems = [
    { href: '/admin/events', label: 'Manage Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/admin/locations', label: 'Manage Locations', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { href: '/admin/records', label: 'Manage Records', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/admin/alumni', label: 'Manage Alumni', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: '/admin/leaders', label: 'Manage Leaders', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { href: '/admin/news', label: 'Manage News', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  ];

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
          <img class="h-8 w-8" src="/logo.png" alt="Liberty Running Club" />
        </a>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            {#each navItems as item}
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
            <a href="/login" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">Login</a>
            <a href="/register" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">Register</a>
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
          <a href="/login" on:click={closeMenu} class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Login</a>
          <a href="/register" on:click={closeMenu} class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Register</a>
        {/if}
      </div>
    </div>
  {/if}
</nav>

