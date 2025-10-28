<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  let searchTerm = '';

  let { users } = data;

  let page = 1;
  let pageSize = 25;

  $: filteredUsers = users
    .filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((page - 1) * pageSize, page * pageSize)
    .sort((a, b) => a.email.localeCompare(b.email));
</script>

<svelte:head>
  <title>Manage users - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Manage users</h2>
      </div>
      <div class="p-6 sm:p-8">
        <div class="mb-6">
          <input
            type="text"
            name="search"
            id="search"
            bind:value={searchTerm}
            placeholder="Search by email"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >email</th
                >
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium uppercase text-center tracking-wider text-gray-500"
                  >isAdmin</th
                >
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >Actions</th
                >
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              {#each filteredUsers as user (user.id)}
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                    >{user.email}</td
                  >
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-center {user.isAdmin ? 'text-green-500' : 'text-grey-500'}">
                    {user.isAdmin ? 'Yes' : 'No'}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <a
                      href="/admin/users/{user.id}/edit"
                      class="mr-4 text-primary-600 hover:text-primary-900">Edit</a
                    >
                    <form action="?/deleteuser" method="POST" use:enhance class="inline">
                      <input type="hidden" name="id" value={user.id} />
                      <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                    </form>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          {#if page > 1}
            <button
              class="mr-4 rounded-md px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-900"
              on:click={() => {
                page--;
              }}>Previous Page</button
            >
          {/if}
          {#if page * pageSize < users.length}
             <!-- content here -->
          <button
            class="rounded-md px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-900 float-right after:float-none"
            on:click={() => {
              page++;
            }}>Next Page</button
          >
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
