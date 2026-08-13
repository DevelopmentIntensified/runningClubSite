<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import ImageUpload from '$lib/components/ImageUpload.svelte';

  export let data: PageData;

  const locations = [
    'About',
    'Schedule',
    'Locations',
    'Girls Records',
    'Boys Records',
    'Contact',
    'Training',
    'Season Photos Hero'
  ];
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-8 text-3xl font-bold">Edit Page Image</h1>

    <form method="POST" enctype="multipart/form-data" use:enhance class="space-y-6">
      <input type="hidden" name="currentImageUrl" value={data.image.imageUrl || ''} />

      <div>
        <label for="locationName" class="mb-1 block text-sm font-medium text-gray-700">
          Location
        </label>
        <select
          id="locationName"
          name="locationName"
          value={data.image.locationName}
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        >
          {#each locations as location}
            <option value={location}>{location}</option>
          {/each}
        </select>
      </div>

      <div>
        <label for="alt" class="mb-1 block text-sm font-medium text-gray-700"> Alt Text </label>
        <input
          type="text"
          id="alt"
          name="alt"
          value={data.image.alt}
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <ImageUpload name="image" label="Image" value={data.image.imageUrl} />
      </div>

      <div class="flex justify-end space-x-4">
        <a
          href="/admin/page-images"
          class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Cancel
        </a>
        <button
          type="submit"
          class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md border border-transparent px-4 py-2 text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Update Image
        </button>
      </div>
    </form>
  </div>
</div>
