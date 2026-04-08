<script lang="ts">
  import { enhance } from '$app/forms';

  export let form: any;
</script>

<svelte:head>
  <title>Alumni Newsletter Signup - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-md">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Alumni Newsletter Signup</h1>
      <p class="mt-2 text-gray-600">
        Stay connected with the Liberty Running Club alumni community. Get updates on events, reunions, and club news.
      </p>
    </div>

    <div class="mt-8 rounded-lg bg-white p-6 shadow-lg">
      {#if form?.success}
        <div class="text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="mt-4 text-xl font-semibold text-gray-900">You're signed up!</h2>
          <p class="mt-2 text-gray-600">Thank you for joining our alumni newsletter. We'll keep you updated on club events and news.</p>
          <a href="/alumni" class="mt-6 inline-block text-primary-600 hover:text-primary-800">Back to Alumni Page</a>
        </div>
      {:else}
        <form method="POST" use:enhance class="space-y-6">
          {#if form?.message}
            <div class="rounded-md bg-red-50 p-4">
              <p class="text-sm text-red-800">{form.message}</p>
            </div>
          {/if}

          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            />
          </div>

          <div class="flex items-start">
            <input
              type="checkbox"
              id="privacyAccepted"
              name="privacyAccepted"
              class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label for="privacyAccepted" class="ml-2 block text-sm text-gray-700">
              I agree to the <a href="/privacy" class="text-primary-600 hover:text-primary-800 underline">Privacy Policy</a> and understand that my email will be used for club communications.
            </label>
          </div>

          <button
            type="submit"
            class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      {/if}
    </div>
  </div>
</div>