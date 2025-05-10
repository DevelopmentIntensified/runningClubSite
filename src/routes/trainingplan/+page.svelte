<script lang="ts">
  import trainingImg from '$lib/assets/images/training/runnerstapracticeunderlights.png';
</script>

<svelte:head>
  <title>Training Plan - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">Training Plan</h1>

  <div class="overflow-hidden rounded-lg bg-white shadow-xl">
    <div class="relative h-64 sm:h-80 md:h-96">
      <img
        src={trainingImg}
        alt="Runners training"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h2 class="px-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Elevate Your Running Game
        </h2>
      </div>
    </div>

    <div class="p-6 sm:p-8 md:p-10">
      <p class="mb-6 text-lg">
        We’re excited to offer personalized summer training plans tailored to your goals! Whether
        you are:
      </p>
      <ol class="mb-8 text-lg list-inside list-disc">
        <li>A former NCAA athlete who wants to continue competing</li>
        <li>Just Starting to run</li>
        <li>Training for a marathon, half marathon, or any other distance</li>
        <li>
          Gearing up for cross-country (XC) this fall, we have plenty of competitive opportunities
        </li>
        <li>Trying to walk on to the NCAA team</li>
      </ol>
      <p class="mb-6 text-lg">
        Our program is designed for both incoming and current students. Fill out the form below, and
        we’ll reach out to craft a training plan that’s just right for you. Let’s make this summer
        your best yet!
      </p>
      <div class="mt-3 w-full text-center">
        <a
          href="https://forms.gle/B9qgi4gzaJUuzEqs5"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white transition duration-150 ease-in-out hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Form Link
        </a>
      </div>
    </div>
  </div>
</div>
