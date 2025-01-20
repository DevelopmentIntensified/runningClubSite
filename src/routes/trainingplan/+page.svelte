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
        We have incorporated several different skill levels for training, so it is fit for runners
        anywhere from never ran before to very experienced runners. You will see that there is a
        brief overview of the training levels on the introduction tab.
      </p>
      <p class="text-lg">
        The levels are based on your past training volume, not your speed or race times. Here's a
        summary:
      </p>
      <ol class="mb-8 text-lg">
        <li>
          Mid Distance A: Runners who have maintained over 40 miles per week in winter. The plan
          peaks at 60 miles per week.
        </li>
        <li>
          B Runners Runners who have maintained over 30 miles per week in winter. The plan peaks
          under 50 miles per week.
        </li>
        <li>
          C Runners: Runners who have maintained over 15 miles per week in winter. The plan peaks at
          35 miles per week.
        </li>
        <li>
          Beginners: Minimal or no recent running experience starts with 15-minute runs and peaks
          under 25 miles per week.
        </li>
      </ol>
      <p>
        If you still don’t know what plan to choose then feel free to contact us and we will figure
        it out.
      </p>
      <div class="mt-3 w-full text-center">
        <a
          href="https://docs.google.com/spreadsheets/d/132UaIDEnZ_Y_vaK4TEE6W1klebMZjG1k/edit?usp=sharing&ouid=103574296355760746415&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white transition duration-150 ease-in-out hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Go To Training Plan
        </a>
      </div>
    </div>
  </div>
</div>
