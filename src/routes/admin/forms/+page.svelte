<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Forms - Liberty Running Club Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Forms</h1>
        <p class="mt-2 text-sm text-gray-700">
          Manage external forms (Google Forms, etc.) that require login to access.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <a
          href="/admin/forms/new"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Form
        </a>
      </div>
    </div>

    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">URL</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                {#each data.forms as form}
                  <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {form.title}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {form.description || '-'}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <a href={form.externalUrl} target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-900">
                        View
                      </a>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      {#if form.active}
                        <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                      {:else}
                        <span class="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">Inactive</span>
                      {/if}
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="/forms" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-900 mr-4 inline-flex items-center gap-1">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Go to Form
                      </a>
                      <a href="/admin/forms/{form.id}/edit" class="text-primary-600 hover:text-primary-900 mr-4">Edit</a>
                      <form method="POST" action="?/deleteForm" use:enhance class="inline">
                        <input type="hidden" name="id" value={form.id} />
                        <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                      </form>
                    </td>
                  </tr>
                {/each}
                {#if data.forms.length === 0}
                  <tr>
                    <td colspan="5" class="py-8 text-center text-sm text-gray-500">
                      No forms yet. <a href="/admin/forms/new" class="text-primary-600 hover:text-primary-900">Create one</a>
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>