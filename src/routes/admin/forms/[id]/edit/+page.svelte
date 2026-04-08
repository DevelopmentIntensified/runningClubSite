<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let form: any;
  export let data: PageData;
  const { form: formData } = data;
</script>

<svelte:head>
  <title>Edit Form - Liberty Running Club Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Edit Form</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form
          action="?/updateForm"
          method="POST"
          use:enhance
          class="space-y-6"
        >
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >{formData.description || ''}</textarea>
          </div>

          <div>
            <label for="externalUrl" class="block text-sm font-medium text-gray-700">External URL</label>
            <input
              type="url"
              id="externalUrl"
              name="externalUrl"
              value={formData.externalUrl}
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="embed"
              name="embed"
              checked={formData.embed}
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label for="embed" class="ml-2 block text-sm text-gray-900">Embed form on page</label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label for="active" class="ml-2 block text-sm text-gray-900">Active</label>
          </div>

          {#if form?.message}
            <div class="text-sm text-red-500">{form.message}</div>
          {/if}

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Update Form
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>