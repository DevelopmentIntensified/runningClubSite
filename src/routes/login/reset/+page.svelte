<script lang="ts">
  let step: 'email' | 'reset' = 'email';
  let email = '';
  let code = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  let waiting = false;

  async function sendResetCode() {
    if (!email) { error = 'Please enter your email.'; return; }
    waiting = true;
    error = '';
    const res = await fetch('/login/reset/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await res.json();
    if (!json.success) {
      error = json.error;
    } else {
      step = 'reset';
    }
    waiting = false;
  }

  async function resetPassword() {
    if (!code || !password) { error = 'All fields are required.'; return; }
    if (password.length < 8) { error = 'Password must be at least 8 characters.'; return; }
    if (password !== confirmPassword) { error = 'Passwords do not match.'; return; }
    waiting = true;
    error = '';
    const res = await fetch('/login/reset/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, email, password })
    });
    const json = await res.json();
    if (!json.success) {
      error = json.error;
    } else {
      error = '';
      step = 'email';
      window.location.href = '/login';
    }
    waiting = false;
  }
</script>

<svelte:head>
  <title>Reset Password - Liberty Running Club</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900">Reset Password</h2>
    </div>

    {#if error}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    {/if}

    {#if step === 'email'}
      <form class="mt-8 space-y-6" on:submit|preventDefault={sendResetCode}>
        <p class="text-sm text-gray-600">Enter your Liberty email and we'll send you a reset code.</p>
        <div>
          <label for="reset-email" class="block text-sm font-medium text-gray-700">Email address</label>
          <input
            id="reset-email"
            type="email"
            required
            bind:value={email}
            placeholder="your.name@liberty.edu"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={waiting}
          class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Send Reset Code
        </button>
        <div class="text-center">
          <a href="/login" class="text-sm text-primary-600 hover:text-primary-500">Back to login</a>
        </div>
      </form>
    {:else}
      <form class="mt-8 space-y-6" on:submit|preventDefault={resetPassword}>
        <p class="text-sm text-gray-600">A code has been sent to your email. Enter it below with your new password.</p>
        <div>
          <label for="reset-code" class="block text-sm font-medium text-gray-700">Reset Code</label>
          <input
            id="reset-code"
            type="text"
            required
            bind:value={code}
            placeholder="Enter the code from your email"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="new-password"
            type="password"
            required
            minlength={8}
            bind:value={password}
            placeholder="At least 8 characters"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            required
            bind:value={confirmPassword}
            placeholder="Re-enter your new password"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={waiting}
          class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Reset Password
        </button>
        <div class="text-center">
          <button type="button" onclick={() => { step = 'email'; error = ''; }} class="text-sm text-primary-600 hover:text-primary-500">
            Use a different email
          </button>
        </div>
      </form>
    {/if}
  </div>
</div>
