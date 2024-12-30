<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let error = '';
  export let form;
  export let data: PageData;
</script>

<svelte:head>
  <title>Add New Leader - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Add New Leader</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form
          action="?/createLeader"
          enctype="multipart/form-data"
          method="POST"
          use:enhance
          class="space-y-6"
        >
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="position" class="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="order" class="block text-sm font-medium text-gray-700">Order Number</label>
            <input
              id="order"
              name="order"
              value={data.leadersCount[0].count}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              >
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              alt="leader"
              id="image"
              name="image"
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
              Add Leader
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
