<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Manage Slideshow Images - Liberty Running Club</title>
</svelte:head>

<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Slideshow Images</h2>

      <a
        href="/admin/slideshow/new"
        class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Image
      </a>
    </div>
  </div>

  {#if data.slideshowImages.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No slideshow images found</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Preview</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Title</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase hidden md:table-cell"
              >Order</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Actions</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each data.slideshowImages as image (image.id)}
            <tr class="transition-colors hover:bg-slate-50/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  class="h-14 w-20 rounded-lg object-cover shadow-sm"
                />
              </td>
              <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-700"
                >{image.title}</td
              >
              <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600 hidden md:table-cell">{image.order}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <a
                    href="/admin/slideshow/edit/{image.id}"
                    class="text-primary-600 hover:text-primary-800 text-xs font-medium">Edit</a
                  >
                  <span class="text-slate-300">|</span>
                  <form action="?/deleteImage" method="POST" use:enhance class="inline">
                    <input type="hidden" name="id" value={image.id} />
                    <input type="hidden" name="imageUrl" value={image.imageUrl} />
                    <button type="submit" class="text-xs text-red-600 hover:text-red-800"
                      >Delete</button
                    >
                  </form>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
