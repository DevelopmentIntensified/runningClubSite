<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import ImageUpload from '$lib/components/ImageUpload.svelte';

  export let data: PageData;

  let { leader } = data;
  let error = '';
</script>

<svelte:head>
  <title>Edit Leader - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Edit Leader</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/updateLeader" method="POST" enctype="multipart/form-data" use:enhance class="space-y-6">
          <input type="hidden" name="id" value={leader.id} />
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={leader.name}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="position" class="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={leader.position}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="order" class="block text-sm font-medium text-gray-700">Order Number</label>
            <input
              id="order"
              name="order"
              value={leader.order}
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
              >{leader.bio || ''}</textarea
            >
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={leader.active}
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label for="active" class="ml-2 block text-sm text-gray-900">Active</label>
          </div>
          <div>
            <input type="hidden" name="currentImageUrl" value={leader.imageUrl} />
            <ImageUpload name="imageUrl" label="Image (Accepts png, gif, jpeg, jpg)" value={leader.imageUrl} />
          </div>
          {#if error}
            <div class="text-sm text-red-500">{error}</div>
          {/if}
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Update Leader
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
