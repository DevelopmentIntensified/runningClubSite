<script lang="ts">
  import { page } from '$app/stores';
  import logoUrl from '$lib/assets/images/logos/logo.png';
  import { slide } from 'svelte/transition';

  export let isAdmin: boolean;
  export let isLoggedIn: boolean;
  export let displayNews: boolean;
  export let displayAlumni: boolean;

  console.warn('DEBUGPRINT[2]: Navbar.svelte:7: isAdmin=', isAdmin);

  let isOpen = false;
  let aboutDropdownOpen = false;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/locations', label: 'Locations' },
    { href: '/records', label: 'Records' },
    { href: '/contact1', label: 'Contact' },
  ];

  const aboutItems = [
    { href: '/about', label: 'Who We Are' },
    { href: '/stats', label: 'Where We\'re From' }
  ];

  const mobileNavItems = [
    ...navItems,
    { href: '/about', label: 'Who We Are' },
    { href: '/stats', label: 'Where We\'re From' },
  ];

  if (displayAlumni) {
    mobileNavItems.push({ href: '/alumni', label: 'Alumni' });
  }

  if (displayNews) {
    mobileNavItems.push({ href: '/news', label: 'News' });
  }

  const desktopExtras = [];
  if (displayAlumni) desktopExtras.push({ href: '/alumni', label: 'Alumni' });
  if (displayNews) desktopExtras.push({ href: '/news', label: 'News' });

  // if (isLoggedIn) {
    desktopExtras.push(
      { href: '/trainingplan', label: 'Training' },
      { href: '/groupme', label: 'Groupme Link' },
      { href: '/season-photos', label: 'Season Photos' }
    );
  // }

  const adminItems = [{ href: '/admin/users', label: 'Admin' }];

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }
</script>

<nav class="bg-primary-600 text-white">
  <div class="max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0">
          <img class="h-16 w-16" src={logoUrl} alt="Liberty Running Club" />
        </a>
        <div class="hidden lg:block">
          <div class="ml-10 flex items-baseline space-x-4">
            {#each navItems as item}
              <a
                href={item.href}
                class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700 {$page.url
                  .pathname === item.href
                  ? 'bg-primary-700'
                  : ''}"
              >
                {item.label}
              </a>
            {/each}

            <div class="relative">
              <button
                on:click={() => aboutDropdownOpen = !aboutDropdownOpen}
                on:mouseenter={() => aboutDropdownOpen = true}
                class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700 flex items-center gap-1 {$page.url
                  .pathname === '/about' || $page.url.pathname === '/stats'
                  ? 'bg-primary-700'
                  : ''}"
              >
                About
                <svg class="w-4 h-4 transition-transform" class:rotate-180={aboutDropdownOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {#if aboutDropdownOpen}
                <div
                  class="absolute z-50 mt-1 w-48 rounded-md bg-white py-1 shadow-lg"
                  on:mouseleave={() => aboutDropdownOpen = false}
                >
                  {#each aboutItems as item}
                    <a
                      href={item.href}
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 {$page.url
                        .pathname === item.href
                        ? 'bg-primary-100 text-primary-700'
                        : ''}"
                      on:click={() => aboutDropdownOpen = false}
                    >
                      {item.label}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>

            {#each desktopExtras as item}
              <a
                href={item.href}
                class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700 {$page.url
                  .pathname === item.href
                  ? 'bg-primary-700'
                  : ''}"
              >
                {item.label}
              </a>
            {/each}
            {#if isAdmin}
              {#each adminItems as item}
                <a
                  href={item.href}
                  class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700 {$page.url
                    .pathname === item.href
                    ? 'bg-primary-700'
                    : ''}"
                >
                  {item.label}
                </a>
              {/each}
            {/if}
          </div>
        </div>
      </div>
      <div class="hidden lg:block">
        <div class="ml-4 flex items-center lg:ml-6">
          {#if isLoggedIn}
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
          {#each adminItems as item}
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
          <!-- <a href="/login" on:click={closeMenu} class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Login</a> -->
          <!-- <a href="/register" on:click={closeMenu} class="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Register</a> -->
        {/if}
      </div>
    </div>
  {/if}
</nav>
