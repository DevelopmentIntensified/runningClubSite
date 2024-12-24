<script>
  import { enhance } from '$app/forms';

  let formData = {
    name: '',
    email: '',
    message: ''
  };

  let submitted = false;

  function handleSubmit() {
    // Here you would typically send the form data to your server
    // For now, we'll just simulate a successful submission
    submitted = true;
  }
</script>

<svelte:head>
  <title>Contact Us - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Contact Us</h1>

  {#if submitted}
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong class="font-bold">Thank you!</strong>
      <span class="block sm:inline"> Your message has been sent. We'll get back to you soon.</span>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} use:enhance class="max-w-lg mx-auto">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input type="text" id="name" bind:value={formData.name} required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" bind:value={formData.email} required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Message</label>
        <textarea id="message" bind:value={formData.message} required rows="5"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send Message
        </button>
      </div>
    </form>
  {/if}
</div>

