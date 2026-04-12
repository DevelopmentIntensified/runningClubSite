<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Manage Page Images - Liberty Running Club</title>
</svelte:head>

<div class="space-y-8">
  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-xl font-semibold text-slate-800">Page Images</h2>
        <a
          href="/admin/page-images/new"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Image
        </a>
      </div>
    </div>

    {#if data.images.length === 0}
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="mt-4 text-sm text-slate-500">No page images found</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/50">
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Location</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Alt Text</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each data.images as image (image.id)}
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="whitespace-nowrap px-6 py-4">
                  <img src={image.imageUrl} alt={image.alt} class="h-14 w-20 rounded-lg object-cover shadow-sm" />
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">{image.locationName}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{image.alt}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm">
                  <div class="flex items-center gap-3">
                    <a href="/admin/page-images/{image.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>

  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-xl font-semibold text-slate-800">Season Photo Albums</h2>
        <a
          href="/admin/season-photos/new"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Album
        </a>
      </div>
    </div>

    {#if data.seasonPhotos.length === 0}
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="mt-4 text-sm text-slate-500">No season photos found</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/50">
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Title</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Season</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each data.seasonPhotos as photo (photo.id)}
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="whitespace-nowrap px-6 py-4">
                  {#if photo.imageUrl}
                    <img src={photo.imageUrl} alt={photo.title} class="h-14 w-20 rounded-lg object-cover shadow-sm" />
                  {:else}
                    <div class="h-14 w-20 rounded-lg bg-slate-100 flex items-center justify-center">
                      <svg class="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  {/if}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">{photo.title}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{photo.season}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm">
                  <div class="flex items-center gap-3">
                    <a href="/admin/season-photos/{photo.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>