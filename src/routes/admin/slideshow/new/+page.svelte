<script lang="ts">
  import { enhance } from '$app/forms';
  import ImageUpload from '$lib/components/ImageUpload.svelte';
</script>

<svelte:head>
  <title>Add New Slideshow Image - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Add New Slideshow Image</h2>
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
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <ImageUpload name="imageUrl" label="Image" required={true} />
          </div>

          <div>
            <label for="order" class="block text-sm font-medium text-gray-700">Display Order</label>
            <input
              type="number"
              name="order"
              id="order"
              required
              min="1"
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
              Add Image
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div> 