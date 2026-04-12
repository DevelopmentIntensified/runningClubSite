<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');

  let filteredLinks = $derived.by(() => {
    if (!searchTerm) return data.links;
    const term = searchTerm.toLowerCase();
    return data.links.filter((link: typeof data.links[0]) => 
      link.title.toLowerCase().includes(term) ||
      link.season.toLowerCase().includes(term)
    );
  });
</script>

<svelte:head>
  <title>Season Photos - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="relative mb-8 h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80">
    <img
      src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=400&fit=crop"
      alt="Season Photos"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60">
      <div class="px-4 text-center">
        <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Season Photos</h1>
        <p class="mt-2 text-sm text-white/90 sm:text-base">Relive the memories from each season</p>
      </div>
    </div>
  </div>

  <div class="mb-8 max-w-md mx-auto">
    <div class="relative">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search by title or season..."
        class="w-full rounded-full border border-slate-200 bg-white px-5 py-3 pl-12 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      />
      <svg class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>

  {#if filteredLinks.length}
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each filteredLinks as link}
        <a
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="aspect-[4/3] overflow-hidden bg-slate-100">
            {#if link.imageUrl}
              <img
                src={link.imageUrl}
                alt={link.title}
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            {:else}
              <img
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=450&fit=crop"
                alt={link.title}
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            {/if}
          </div>
          <div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="mt-2 text-sm font-medium text-white">View Gallery</span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-lg font-semibold text-white">{link.title}</h3>
            <p class="text-sm text-white/80">{link.season}</p>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <svg class="mx-auto h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="mt-4 text-lg font-medium text-slate-600">No photos found</p>
      <p class="mt-1 text-sm text-slate-500">Try a different search term</p>
    </div>
  {/if}
</div> 