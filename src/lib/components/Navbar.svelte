<script lang="ts">
  import { page } from '$app/stores';
  import logoUrl from '$lib/assets/images/logos/logo.png';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let isAdmin: boolean;
  export let isLoggedIn: boolean;

  console.warn('DEBUGPRINT[2]: Navbar.svelte:7: isAdmin=', isAdmin);

  let isOpen = false;
  let openDropdown: string | null = null;
  let navElement: HTMLElement;

  const categories = [
    {
      label: 'About',
      items: () => [
        { href: '/about', label: 'About' },
        { href: '/stats', label: 'Where We\'re From' }
      ]
    },
    {
      label: 'Practice',
      items: () => [
        { href: '/schedule', label: 'Schedule' },
        { href: '/locations', label: 'Locations' }
      ]
    },
    {
      label: 'Team',
      items: () => [
        { href: '/records', label: 'Records' },
        { href: '/alumni', label: 'Alumni' }
      ]
    },
    {
      label: 'Get Involved',
      items: () => [
        { href: '/trainingplan', label: 'Training Plan' },
        { href: '/groupme', label: 'GroupMe' },
        { href: '/season-photos', label: 'Season Photos' }
      ]
    },
    {
      label: 'News & Contact',
      items: () => [
        { href: '/news', label: 'News' },
        { href: '/contact1', label: 'Contact' }
      ]
    }
  ];

  const adminCategory = {
    label: 'Admin',
    items: () => [
      { href: '/admin', label: 'Dashboard' },
      { href: '/admin/users', label: 'Users' },
      { href: '/admin/leaders', label: 'Leaders' },
      { href: '/admin/alumni', label: 'Alumni' },
      { href: '/admin/news', label: 'News' },
      { href: '/admin/events', label: 'Events' },
      { href: '/admin/locations', label: 'Locations' },
      { href: '/admin/records', label: 'Records' },
      { href: '/admin/season-photos', label: 'Season Photos' },
      { href: '/admin/slideshow', label: 'Slideshow' },
      { href: '/admin/page-images', label: 'Page Images' },
      { href: '/admin/forms', label: 'Forms' },
      { href: '/admin/alumni-newsletter', label: 'Alumni Newsletter' }
    ]
  };

  const mobileNavItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/stats', label: 'Where We\'re From' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/locations', label: 'Locations' },
    { href: '/records', label: 'Records' },
    { href: '/alumni', label: 'Alumni' },
    { href: '/trainingplan', label: 'Training Plan' },
    { href: '/groupme', label: 'GroupMe' },
    { href: '/season-photos', label: 'Season Photos' },
    { href: '/news', label: 'News' },
    { href: '/contact1', label: 'Contact' }
  ];

  const mobileAdminItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/leaders', label: 'Leaders' },
    { href: '/admin/alumni', label: 'Alumni' },
    { href: '/admin/news', label: 'News' },
    { href: '/admin/events', label: 'Events' },
    { href: '/admin/locations', label: 'Locations' },
    { href: '/admin/records', label: 'Records' },
    { href: '/admin/season-photos', label: 'Season Photos' },
    { href: '/admin/slideshow', label: 'Slideshow' },
    { href: '/admin/page-images', label: 'Page Images' },
    { href: '/admin/forms', label: 'Forms' },
    { href: '/admin/alumni-newsletter', label: 'Alumni Newsletter' }
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
    openDropdown = null;
  }

  function toggleDropdown(label: string) {
    openDropdown = openDropdown === label ? null : label;
  }

  function isActive(path: string): boolean {
    return $page.url.pathname === path;
  }

  function isCategoryActive(cat: typeof categories[0]): boolean {
    return cat.items().some(item => isActive(item.href));
  }

  function handleClickOutside(e: MouseEvent) {
    if (navElement && !navElement.contains(e.target as Node)) {
      openDropdown = null;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<nav class="bg-primary-600 text-white" bind:this={navElement}>
  <div class="max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0">
          <img class="h-16 w-16" src={logoUrl} alt="Liberty Running Club" />
        </a>
        <div class="hidden lg:block">
          <div class="ml-10 flex items-baseline space-x-1">
            {#each categories as category}
              <div class="relative">
                <button
                  on:click={() => toggleDropdown(category.label)}
                  class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700 flex items-center gap-1 {isCategoryActive(category) ? 'bg-primary-700' : ''}"
                >
                  {category.label}
                  <svg class="w-4 h-4 transition-transform" class:rotate-180={openDropdown === category.label} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {#if openDropdown === category.label}
                  <div
                    class="absolute z-50 mt-1 w-60 rounded-lg bg-white py-2 shadow-xl border border-gray-100"
                  >
                    {#each category.items() as item}
                      <a
                        href={item.href}
                        class="block px-5 py-3 text-base text-gray-700 hover:bg-primary-50 {isActive(item.href) ? 'bg-primary-50 text-primary-700 font-semibold' : ''}"
                        on:click={() => openDropdown = null}
                      >
                        {item.label}
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}

            {#if isAdmin}
              <div class="relative">
                <button
                  on:click={() => toggleDropdown(adminCategory.label)}
                  class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700 flex items-center gap-1 bg-primary-500"
                >
                  {adminCategory.label}
                  <svg class="w-4 h-4 transition-transform" class:rotate-180={openDropdown === adminCategory.label} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {#if openDropdown === adminCategory.label}
                  <div
                    class="absolute z-50 mt-1 w-60 rounded-lg bg-white py-2 shadow-xl border border-gray-100 right-0"
                  >
                    {#each adminCategory.items() as item}
                      <a
                        href={item.href}
                        class="block px-5 py-3 text-base text-gray-700 hover:bg-primary-50 {isActive(item.href) ? 'bg-primary-50 text-primary-700 font-semibold' : ''}"
                        on:click={() => openDropdown = null}
                      >
                        {item.label}
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div class="hidden lg:block">
        <div class="ml-4 flex items-center lg:ml-6">
          {#if isLoggedIn}
            <a
              href="/settings"
              class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700"
            >
              Settings
            </a>
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700">Logout</button
              >
            </form>
          {:else}
            <a
              href={'/login'}
              class="rounded bg-primary-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-primary-700"
            >
              Sign Up/Login
            </a>
          {/if}
        </div>
      </div>
      <div class="lg:hidden">
        <button
          on:click={toggleMenu}
          class="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <span class="sr-only">Open main menu</span>
          {#if isOpen}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  {#if isOpen}
    <div transition:slide={{ duration: 300 }} class="lg:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 lg:px-3">
        {#each mobileNavItems as item}
          <a
            href={item.href}
            on:click={closeMenu}
            class="block rounded-md px-3 py-2 text-center text-base font-medium hover:bg-primary-700 {$page
              .url.pathname === item.href
              ? 'bg-primary-700'
              : ''}"
          >
            {item.label}
          </a>
        {/each}
        {#if isAdmin}
          {#each mobileAdminItems as item}
            <a
              href={item.href}
              on:click={closeMenu}
              class="block rounded-md px-3 py-2 text-center text-base font-medium hover:bg-primary-700 {$page
                .url.pathname === item.href
                ? 'bg-primary-700'
                : ''}"
            >
              {item.label}
            </a>
          {/each}
        {/if}
        {#if isLoggedIn}
          <a
            href="/settings"
            on:click={closeMenu}
            class="block rounded-md px-3 py-2 text-center text-base font-medium hover:bg-primary-700"
          >
            Settings
          </a>
          <form action="/api/logout" method="POST" class="block">
            <button
              type="submit"
              on:click={closeMenu}
              class="w-full rounded-md px-3 py-2 text-center text-base font-medium hover:bg-primary-700"
              >Logout</button
            >
          </form>
        {:else}
          <a
            href={'/login'}
            on:click={closeMenu}
            class="block rounded-md bg-primary-600 px-3 py-2 text-center text-base font-medium hover:bg-primary-700 {$page
              .url.pathname === '/login'
              ? 'bg-primary-700'
              : ''}"
          >
            Sign Up/Login
          </a>
        {/if}
      </div>
    </div>
  {/if}
</nav>
