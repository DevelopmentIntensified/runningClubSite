<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  let { alumnus } = data;
  let error = '';
</script>

<svelte:head>
  <title>Edit Alumnus - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-primary-600 py-6 px-4 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">
          Edit Alumnus
        </h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/updateAlumnus" method="POST" use:enhance class="space-y-6">
          <input type="hidden" name="id" value={alumnus.id}>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={alumnus.name} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="major" class="block text-sm font-medium text-gray-700">major</label>
            <input type="text" id="major" name="major" required value={alumnus.major}
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="graduationYear" class="block text-sm font-medium text-gray-700">Graduation Year</label>
            <input type="number" id="graduationYear" name="graduationYear" value={alumnus.graduationYear} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="achievements" class="block text-sm font-medium text-gray-700">Achievements</label>
            <textarea id="achievements" name="achievements" rows="3"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">{alumnus.achievements || ''}</textarea>
          </div>
          <div>
            <label for="currentOccupation" class="block text-sm font-medium text-gray-700">Current Occupation</label>
            <input type="text" id="currentOccupation" name="currentOccupation" value={alumnus.currentOccupation || ''}
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" id="imageUrl" name="imageUrl" value={alumnus.imageUrl || ''}
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          {#if error}
            <div class="text-red-500 text-sm">{error}</div>
          {/if}
          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Update Alumnus
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

