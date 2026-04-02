<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Edit Slideshow Image - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Edit Slideshow Image</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form method="POST" use:enhance class="space-y-6" enctype="multipart/form-data">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={data.image.title}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
            <div class="mt-1 flex items-center space-x-4">
              <img
                src={data.image.imageUrl}
                alt={data.image.title}
                class="h-32 w-48 object-cover rounded"
              />
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                class="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100"
              />
            </div>
            <p class="mt-1 text-sm text-gray-500">Leave empty to keep the current image</p>
          </div>

          <div>
            <input
              type="hidden"
              id="imageUrl"
              name="imageUrl"
              value={data.image.imageUrl}
              class="sr-only"
            />
            <label for="order" class="block text-sm font-medium text-gray-700">Display Order</label>
            <input
              type="number"
              name="order"
              id="order"
              required
              min="1"
              value={data.image.order}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div class="flex justify-end space-x-4">
            <a
              href="/admin/slideshow"
              class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Cancel
            </a>
            <button
              type="submit"
              class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div> 
