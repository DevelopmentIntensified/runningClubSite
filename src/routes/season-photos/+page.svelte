<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let selectedSeason = data.seasons[0];

  const seasonIcons: Record<string, string> = {
    'Fall': '🍂',
    'Winter': '❄️',
    'Spring': '🌸',
    'Summer': '☀️'
  };

  function getSeasonIcon(season: string): string {
    for (const [key, icon] of Object.entries(seasonIcons)) {
      if (season.includes(key)) return icon;
    }
    return '📷';
  }
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

  <div class="mb-8 flex flex-wrap justify-center gap-3">
    {#each data.seasons as season}
      <button
        onclick={() => selectedSeason = season}
        class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all {selectedSeason === season
          ? 'bg-primary-600 text-white shadow-md'
          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:shadow-sm'}"
      >
        <span>{getSeasonIcon(season)}</span>
        <span>{season}</span>
      </button>
    {/each}
  </div>

    {#if data.linksBySeason[selectedSeason]?.length}
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each data.linksBySeason[selectedSeason] as link}
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
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <svg class="mx-auto h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="mt-4 text-lg font-medium text-slate-600">No photos for this season yet</p>
      <p class="mt-1 text-sm text-slate-500">Check back later for updates!</p>
    </div>
  {/if}
</div> 