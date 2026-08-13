<script lang="ts">
  import { enhance } from '$app/forms';
  import ImageUpload from '$lib/components/ImageUpload.svelte';

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

<div class="container mx-auto px-4 py-8 sm:px-6">
  <div class="mx-auto w-full max-w-2xl">
    <h1 class="mb-8 text-3xl font-bold">Add New Page Image</h1>

    <form method="POST" enctype="multipart/form-data" use:enhance class="space-y-6">
      <div>
        <label for="locationName" class="mb-1 block text-sm font-medium text-gray-700">
          Location
        </label>
        <select
          id="locationName"
          name="locationName"
          required
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select a location</option>
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
          required
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <ImageUpload name="image" label="Image" required={true} />
      </div>

<div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
    <a
      href="/admin/page-images"
      class="flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
    >
      Cancel
    </a>
    <button
      type="submit"
      class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
    >
      Upload Image
    </button>
  </div>
    </form>
  </div>
</div>
