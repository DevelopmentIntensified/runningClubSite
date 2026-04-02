<script lang="ts">
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
  
  const adminLinks = [
    { href: '/admin/users', label: 'Users', icon: 'users' },
    { href: '/admin/news', label: 'News', icon: 'newspaper' },
    { href: '/admin/alumni', label: 'Alumni', icon: 'graduation' },
    { href: '/admin/leaders', label: 'Leaders', icon: 'user' },
    { href: '/admin/events', label: 'Events', icon: 'calendar' },
    { href: '/admin/records', label: 'Records', icon: 'trophy' },
    { href: '/admin/slideshow', label: 'Slideshow', icon: 'image' },
    { href: '/admin/locations', label: 'Locations', icon: 'map' },
    { href: '/admin/page-images', label: 'Page Images', icon: 'image' },
    { href: '/admin/season-photos', label: 'Season Photos', icon: 'camera' },
  ];

  function isActive(href: string) {
    return $page.url.pathname.startsWith(href);
  }
</script>

<div class="min-h-screen bg-slate-50">
  <header class="bg-gradient-to-r from-secondary to-primary shadow-lg">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
        <a 
          href="/" 
          class="text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          Back to Site
        </a>
      </div>
    </div>
  </header>

  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <nav class="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {#each adminLinks as link}
        <a
          href={link.href}
          class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-primary-500 hover:shadow-md {isActive(link.href) ? 'ring-2 ring-primary-500 border-primary-500 bg-primary-50' : ''}"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 transition-colors group-hover:bg-primary-100 {isActive(link.href) ? 'bg-primary-100' : ''}">
            {#if link.icon === 'users'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            {:else if link.icon === 'newspaper'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            {:else if link.icon === 'graduation'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            {:else if link.icon === 'user'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            {:else if link.icon === 'calendar'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            {:else if link.icon === 'trophy'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                  <polygon points="39 33 25 33 25 61 32 55 39 61 39 33"></polygon>
                  <path d="M39,33H25v9.92a5,5,0,0,1,2.41,1.17A8.12,8.12,0,0,0,32,46a8.12,8.12,0,0,0,4.59-1.91A4.91,4.91,0,0,1,39,42.92Z" fill="currentColor"></path>
                  <polygon points="35 33 35 57.57 32 55 29 57.57 29 33 35 33"></polygon>
                  <path d="M29,45.12a5.73,5.73,0,0,0,6,0V33H29Z" fill="currentColor"></path>
                  <path d="M50.55,23.5c0-2.11,1.57-4.44,1-6.34S48.2,14.24,47,12.6s-1.3-4.48-3-5.69-4.35-.42-6.32-1S34.11,3,32,3s-3.83,2.24-5.73,2.86-4.68-.14-6.32,1-1.75,4-3,5.69-3.85,2.59-4.49,4.56.95,4.23.95,6.34-1.57,4.44-.95,6.34S15.8,32.76,17,34.4s1.3,4.48,3,5.69,4.35.42,6.32,1S29.89,44,32,44s3.83-2.24,5.73-2.86,4.68.14,6.32-1,1.75-4,3-5.69,3.85-2.59,4.49-4.56S50.55,25.61,50.55,23.5Z" fill="currentColor"></path>
                  <circle cx="32" cy="23.5" r="14.5" fill="currentColor"></circle>
                  <path d="M33.37,16l1.52,2.63a1.54,1.54,0,0,0,1.06.76L39,20a1.53,1.53,0,0,1,.85,2.56l-2.1,2.22a1.5,1.5,0,0,0-.4,1.22l.36,3a1.57,1.57,0,0,1-2.22,1.58l-2.81-1.27a1.6,1.6,0,0,0-1.32,0l-2.81,1.27A1.57,1.57,0,0,1,26.31,29l.36-3a1.5,1.5,0,0,0-.4-1.22l-2.1-2.22A1.53,1.53,0,0,1,25,20l3-.59a1.54,1.54,0,0,0,1.06-.76L30.63,16A1.59,1.59,0,0,1,33.37,16Z" fill="currentColor"></path>
                </g>
              </svg>
            {:else if link.icon === 'image'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            {:else if link.icon === 'map'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            {:else if link.icon === 'camera'}
              <svg class="h-5 w-5 text-slate-600 group-hover:text-primary-600 {isActive(link.href) ? 'text-primary-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            {/if}
          </div>
          <span class="text-sm font-medium text-slate-700 group-hover:text-primary-700 {isActive(link.href) ? 'text-primary-700' : ''}">{link.label}</span>
        </a>
      {/each}
    </nav>

    <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {@render children()}
    </div>
  </div>
</div>