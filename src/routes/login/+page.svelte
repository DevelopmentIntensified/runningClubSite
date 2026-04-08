<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let email = '';
  let error = '';
  let emailSent = false;
  let code = '';
  let waiting = false;
  let privacyAccepted = false;
  let redirectUrl = '/groupme';

  async function handleCodeCheck() {
    waiting = true;
    const res = await fetch('/login/email/code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirectUrl })
    });

    if (res.status === 500) {
      const json = await res.json();
      error = json.error;
    } else {
      await goto(redirectUrl);
      location.reload();
    }
    waiting = false;
  }

  async function handleSubmit() {
    if (!emailSent && !privacyAccepted) {
      error = 'Please accept the Privacy Policy to continue.';
      return;
    }
    waiting = true;
    error = '';
    const res = await fetch('/login/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        privacyAccepted: emailSent || privacyAccepted
      })
    });
    const json = await res.json();
    if (json.error) {
      error = json.error;
    } else {
      emailSent = true;
    }
    waiting = false;
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
      error = params.get('error') as string;
    }
    if (params.has('redirectUrl')) {
      redirectUrl = params.get('redirectUrl') as string;
      document.cookie = `redirectUrl=${encodeURIComponent(redirectUrl)}; path=/; max-age=300`;
    } else {
      const match = document.cookie.match(/redirectUrl=([^;]+)/);
      if (match) {
        redirectUrl = decodeURIComponent(match[1]);
      }
    }
  });
</script>

<svelte:head>
  <title>Login/Signup - Liberty Running Club</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900">
        {emailSent ? 'Check Your Email' : 'Sign in to your account'}
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        {#if !emailSent}
          Please use your Liberty email for verification. By signing in, your email may be used for club newsletters and
          updates. We send email through Resend; see our
          <a href="/privacy" class="font-medium text-primary-600 underline hover:text-primary-800">Privacy Policy</a>
          (including Resend’s policy).
        {:else}
          We've sent a code to your email. Please enter it below. If you don't see it, check your spam folder and mark it
          as not spam.
        {/if}
      </p>
    </div>

    {#if error}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    {/if}

    <form class="mt-8 space-y-6" on:submit|preventDefault={emailSent ? handleCodeCheck : handleSubmit}>
      {#if emailSent}
        <div>
          <label for="code" class="block text-sm font-medium text-gray-700">Verification Code</label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
            </div>
            <input
              id="code"
              name="code"
              type="text"
              required
              class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              placeholder="Enter verification code"
              bind:value={code}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={waiting}
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-primary-500 group-hover:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            Verify Code
          </button>
        </div>
        <div class="text-center">
          <button
            type="button"
            disabled={waiting}
            on:click={handleSubmit}
            class="text-sm text-primary-600 hover:text-primary-500"
          >
            Resend verification email
          </button>
        </div>
      {:else}
        <div>
          <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              placeholder="your.name@liberty.edu"
              bind:value={email}
            />
          </div>
        </div>
        <div class="flex items-start gap-3">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            bind:checked={privacyAccepted}
            required
            class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label for="privacy" class="text-sm text-gray-700">
            I agree to the
            <a href="/privacy" class="font-medium text-primary-600 underline hover:text-primary-800">Privacy Policy</a>
            and understand how my data is used, including club emails sent via Resend.
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={waiting}
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-primary-500 group-hover:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            Sign in
          </button>
        </div>
      {/if}
    </form>
  </div>
</div>
