<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let email = '';
  let error = '';
  let emailSent = false;
  let code = '';
  let waiting = false

  async function handleCodeCheck() {
    waiting = true
    const res = await fetch('/login/email/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code
      })
    });

    console.log(res);
    if (res.status === 500) {
      const json = await res.json();
      error = json.error;
      waiting = false
    } else {
      await goto('/groupme');
    }
  }

  async function handleSubmit(event: Event) {
    waiting = true
    const res = await fetch('/login/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });
    const json = await res.json();
    if (json.error) {
      waiting = false
      error = json.error;
    } else {
      emailSent = true;
      waiting = false
    }
  }

  onMount(() => {
    let params = new URLSearchParams(window.location.search);
    let hasError = params.has('error');

    if (hasError) {
      error = params.get('error') as string;
    }
  });
</script>

<svelte:head>
  <title>Login - Liberty Running Club</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md">
    <div>
      {#if !emailSent}
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <h4 class="mt-2 text-center">
          Please use your Liberty Email so that we can verify that you are affiliated with Liberty
          University.
        </h4>
      {:else}
        <h4 class="mt-2 text-center">
          Please input the code sent to your email or click the link sent to your email.
        </h4>
      {/if}
      <div class="h-6 w-full space-x-2 text-center text-red-400">
        {#if error !== ''}
          {error}
        {/if}
      </div>
    </div>
    <form class="mt-3" on:submit|preventDefault={handleSubmit}>
      <input type="hidden" name="remember" value="true" />

      <div class="rounded-md shadow-sm">
        {#if emailSent}
          <button
            disabled={waiting}
            class="ring-offset-background focus-visible:ring-ring mb-5 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            on:click={handleSubmit}>Resend Email</button
          >
        <h4 class="mt-2 text-center">
            If you don't see it in your inbox check in the junk folder.
        </h4>
          <input
            id="code-address"
            name="code"
            type="code"
            required
            class="relative block w-full appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="code"
            bind:value={code}
          />
          <button
            disabled={waiting}
            class="ring-offset-background focus-visible:ring-ring mt-3 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            on:click={handleCodeCheck}>Verify</button
          >
        {:else}
          <label for="email-address" class="sr-onlyabout"
            >Please use your Liberty Email so that we can verify that you are
            affiliated with Liberty University.</label
          >
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="relative block w-full appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="Email address"
            bind:value={email}
          />
          <button
            disabled={waiting}
            type="submit"
            class="relative mt-2 flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        {/if}
      </div>
    </form>
  </div>
</div>
