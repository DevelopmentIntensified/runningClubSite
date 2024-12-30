<script lang="ts">
  import GroupmeIcon from '$lib/components/GroupmeIcon.svelte';
</script>

<svelte:head>
  <title>Join Our GroupMe - Liberty Running Club</title>
</svelte:head>

<div
  class="min-h-screen bg-gradient-to-b from-primary-100 to-primary-200 px-4 py-12 sm:px-6 lg:px-8"
>
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Join Our GroupMe</h2>
      </div>
      <div class="p-6 sm:p-8">
        <p class="mb-8 text-center text-xl text-gray-700">
          Stay updated on events and join the social shenanigans!
        </p>
        <div class="flex flex-col items-center">
          <a
            href="https://groupme.com/join_group/86746915/q0pqDpY8"
            target="_blank"
            rel="noopener noreferrer"
            class="mb-8 inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white transition duration-150 ease-in-out hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Join GroupMe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <div class="h-48 w-48 sm:h-64 sm:w-64">
            <GroupmeIcon class="h-full w-full text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
