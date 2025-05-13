<script lang="ts">
  import { enhance } from '$app/forms';

  let error = '';
  let imagePreview: string | null = null;

  function handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      imagePreview = URL.createObjectURL(file);
    }
  }
</script>

<svelte:head>
  <title>Add New News Item - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Add New News Item</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/createNews" method="POST" enctype="multipart/form-data" use:enhance class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              rows="6"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Image (Accepts png, gif, jpeg, jpg)</label>
            {#if imagePreview}
              <img src={imagePreview} alt="Preview" class="mt-2 h-48 w-full object-cover rounded" />
            {/if}
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              id="image"
              name="image"
              on:change={handleImageChange}
              required
              class="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-50 file:text-primary-700
                hover:file:bg-primary-100"
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
              Add News Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
