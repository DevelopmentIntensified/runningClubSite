<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Manage users - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-primary-600 py-6 px-4 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">
          Manage users
        </h2>
      </div>
      <div class="p-6 sm:p-8">
        <div class="mb-6">
          <!-- <a href="/admin/users/new" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"> -->
          <!--   Add New user -->
          <!-- </a> -->
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">isAdmin</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each data.users as user (user.id)}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.isAdmin}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="/admin/users/{user.id}/edit" class="text-primary-600 hover:text-primary-900 mr-4">Edit</a>
                    <form action="?/deleteuser" method="POST" use:enhance class="inline">
                      <input type="hidden" name="id" value={user.id}>
                      <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                    </form>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

