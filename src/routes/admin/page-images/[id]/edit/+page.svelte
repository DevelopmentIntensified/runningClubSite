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
    'Season Photos Hero',
  ];
</script>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Edit Page Image</h1>

    <form
      method="POST"
      enctype="multipart/form-data"
      use:enhance
      class="space-y-6"
    >
      <input type="hidden" name="currentImageUrl" value={data.image.imageUrl} />
      
      <div>
        <label for="locationName" class="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <select
          id="locationName"
          name="locationName"
          value={data.image.locationName}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {#each locations as location}
            <option value={location}>{location}</option>
          {/each}
        </select>
      </div>

      <div>
        <label for="alt" class="block text-sm font-medium text-gray-700 mb-1">
          Alt Text
        </label>
        <input
          type="text"
          id="alt"
          name="alt"
          value={data.image.alt}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <ImageUpload name="image" label="Image" />
      </div>

      <div class="flex justify-end space-x-4">
        <a
          href="/admin/page-images"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </a>
        <button
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Update Image
        </button>
      </div>
    </form>
  </div>
</div> 
