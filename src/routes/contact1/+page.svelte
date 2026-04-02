<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  import trainingImg from '$lib/assets/images/training/Runnersrunnigntothecamera.jpeg';
  let { data, form }: { data: PageData; form: ActionData } = $props();

  let formData = {
    name: '',
    email: '',
    message: ''
  };

  let submitted = false;
  let honeypot = '';
</script>

<svelte:head>
  <title>Contact Us - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="relative h-48 sm:h-64 md:h-80">
    <img
      src={trainingImg}
      alt="Runners training"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60"
    >
      <div class="px-4 text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Contact Us</h2>
        <p class="mt-2 text-sm text-white/90 sm:text-base">We'd love to hear from you.</p>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-8">
    <div class="mx-auto max-w-2xl">
      {#if form?.success || submitted}
        <div class="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
          <div
            class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
          >
            <svg
              class="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-green-900">Message Sent!</h3>
          <p class="mt-2 text-green-700">Thank you for reaching out. We'll get back to you soon.</p>
        </div>
      {:else}
        <div class="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div class="bg-primary-600 px-6 py-4">
            <h3 class="text-xl font-semibold text-white">Send us a Message</h3>
            <p class="mt-1 text-sm text-primary-100">
              Fill out the form below and we'll respond ASAP.
            </p>
          </div>

          <form
            method="post"
            use:enhance={() => {
              return async ({ update }) => {
                await update();
                submitted = true;
              };
            }}
            class="space-y-6 p-6"
          >
            <input
              type="text"
              name="honeypot"
              bind:value={honeypot}
              class="hidden"
              tabindex="-1"
              autocomplete="off"
            />

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="name"
                  bind:value={formData.name}
                  name="name"
                  required
                  class="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  bind:value={formData.email}
                  required
                  class="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
              <div class="mt-1">
                <textarea
                  id="message"
                  name="message"
                  bind:value={formData.message}
                  required
                  rows="5"
                  class="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="Your message..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              class="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </div>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Prefer email? Reach us at <a
              href="mailto:libertyrunningclub@libertyrunningclub.com"
              class="text-primary-600 hover:text-primary-800"
              >libertyrunningclub@libertyrunningclub.com</a
            >
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
