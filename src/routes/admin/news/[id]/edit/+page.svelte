<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  let { newsItem } = data;
  let error = '';
</script>

<svelte:head>
  <title>Edit News Item - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Edit News Item</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/updateNews" method="POST" use:enhance class="space-y-6">
          <input type="hidden" name="id" value={newsItem.id} />
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newsItem.title}
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              rows="6"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              >{newsItem.content}</textarea
            >
          </div>
          <div>
            <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={newsItem.imageUrl}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          {#if error}
            <div class="text-sm text-red-500">{error}</div>
          {/if}
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Update News Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
