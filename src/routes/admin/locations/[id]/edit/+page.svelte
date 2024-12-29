<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  let { location } = data;
  let error = '';
</script>

<svelte:head>
  <title>Edit Location - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-primary-600 py-6 px-4 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">
          Edit Location
        </h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/updateLocation" method="POST" use:enhance class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={location.name} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" rows="3" required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">{location.description}</textarea>
          </div>
          <div>
            <label for="link" class="block text-sm font-medium text-gray-700">Map URL</label>
            <input type="url" id="link" name="link" value={location.link} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          {#if error}
            <div class="text-red-500 text-sm">{error}</div>
          {/if}
          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Update Location
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

