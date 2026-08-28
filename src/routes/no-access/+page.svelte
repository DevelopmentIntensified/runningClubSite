<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>No Access - Liberty Running Club</title>
</svelte:head>

<div class="flex min-h-[70vh] items-center justify-center px-4 py-16">
  <div class="mx-auto w-full max-w-md text-center">
    <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
      <svg
        class="h-8 w-8 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    </div>
    <h1 class="text-3xl font-bold text-slate-800">No Access</h1>
    <p class="mt-3 text-slate-600">
      You don't have permission to view this page. Your account isn't granted access to this
      feature.
    </p>
    {#if !$page.data?.isLoggedIn}
      <p class="mt-2 text-sm text-slate-500">You may need to sign in to your account.</p>
    {/if}
    <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      {#if !$page.data?.isLoggedIn}
        <a
          href="/login"
          class="bg-primary-600 hover:bg-primary-700 rounded-lg px-5 py-2.5 text-sm font-medium text-white"
        >
          Sign In
        </a>
      {/if}
      <button
        type="button"
        onclick={() => goto('/')}
        class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Go to Home
      </button>
    </div>
  </div>
</div>
