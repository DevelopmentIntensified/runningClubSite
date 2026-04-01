<script lang="ts">
  import { enhance } from '$app/forms';

  let error = '';
</script>

<svelte:head>
  <title>Add New User - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Add New User</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/createUser" method="POST" use:enhance class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="isAdmin" class="block text-sm font-medium text-gray-700">Admin</label>
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
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
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
