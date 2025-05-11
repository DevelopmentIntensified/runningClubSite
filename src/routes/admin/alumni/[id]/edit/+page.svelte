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

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Edit Alumnus</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form
          action="?/updateAlumnus"
          method="POST"
          use:enhance
          class="space-y-6"
          enctype="multipart/form-data"
        >
          <input type="hidden" name="id" value={alumnus.id} />
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={alumnus.name}
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="major" class="block text-sm font-medium text-gray-700">Major</label>
            <input
              type="text"
              id="major"
              name="major"
              value={alumnus.major}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="graduationYear" class="block text-sm font-medium text-gray-700"
              >Graduation Year</label
            >
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              value={alumnus.graduationYear}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="achievements" class="block text-sm font-medium text-gray-700"
              >Achievements</label
            >
            <textarea
              id="achievements"
              name="achievements"
              rows="3"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              >{alumnus.achievements || ''}</textarea
            >
          </div>
          <div>
            <label for="currentOccupation" class="block text-sm font-medium text-gray-700"
              >Current Occupation</label
            >
            <input
              type="text"
              id="currentOccupation"
              name="currentOccupation"
              value={alumnus.currentOccupation || ''}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Profile Image</label>
            <div class="mt-1 flex items-center space-x-4">
              <input
                type="hidden"
                id="imageUrl"
                name="imageUrl"
                value={alumnus.imageUrl ? alumnus.imageUrl : ''}
                class="sr-only"
              />
              {#if alumnus.imageUrl}
                <img
                  src={alumnus.imageUrl}
                  alt={alumnus.name}
                  class="h-32 w-32 rounded object-cover"
                />
              {/if}
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                class="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-md file:border-0
                  file:bg-primary-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-primary-700
                  hover:file:bg-primary-100"
              />
            </div>
            <p class="mt-1 text-sm text-gray-500">Leave empty to keep the current image</p>
          </div>
          {#if error}
            <div class="text-sm text-red-500">{error}</div>
          {/if}
          <div class="flex justify-end space-x-4">
            <a
              href="/admin/alumni"
              class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Cancel
            </a>
            <button
              type="submit"
              class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Update Alumnus
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
