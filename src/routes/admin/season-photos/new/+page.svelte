<script lang="ts">
  import { enhance } from '$app/forms';
  import ImageUpload from '$lib/components/ImageUpload.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let error = '';
</script>

<svelte:head>
  <title>Add New Season Photo Album - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Add New Season Photo Album</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/createLink" method="POST" use:enhance class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="season" class="block text-sm font-medium text-gray-700">Season</label>
            <input
              type="text"
              id="season"
              name="season"
              required
              placeholder="e.g., Fall 2024"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="link" class="block text-sm font-medium text-gray-700">Photo Album Link</label>
            <input
              type="url"
              id="link"
              name="link"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <ImageUpload name="image" label="Cover Image (optional)" />
          {#if error}
            <div class="text-sm text-red-500">{error}</div>
          {/if}
          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add Photo Album
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
