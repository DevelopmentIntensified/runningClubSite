<script lang="ts">
  const alumni = [
    {
      name: "Sarah Johnson",
      image: "/images/sarah-johnson.jpg",
      graduationYear: 2022,
      major: "Exercise Science",
      achievements: "3-time All-American, School record holder in 5000m",
      currentOccupation: "Professional Runner for Nike"
    },
    {
      name: "Michael Lee",
      image: "/images/michael-lee.jpg",
      graduationYear: 2021,
      major: "Business Administration",
      achievements: "Team captain, 4-year letterman",
      currentOccupation: "Marketing Manager at RunnerSpace"
    },
    {
      name: "Emily Chen",
      image: "/images/emily-chen.jpg",
      graduationYear: 2020,
      major: "Psychology",
      achievements: "Conference champion in 1500m, Academic All-American",
      currentOccupation: "Sports Psychologist"
    },
    {
      name: "David Martinez",
      image: "/images/david-martinez.jpg",
      graduationYear: 2019,
      major: "Computer Science",
      achievements: "School record holder in 800m, 4x400m relay team member",
      currentOccupation: "Software Engineer at Garmin"
    },
    {
      name: "Rachel Thompson",
      image: "/images/rachel-thompson.jpg",
      graduationYear: 2018,
      major: "Nursing",
      achievements: "3-time conference champion in Cross Country",
      currentOccupation: "Registered Nurse, Marathon Coach"
    },
    {
      name: "Jason Kim",
      image: "/images/jason-kim.jpg",
      graduationYear: 2017,
      major: "Kinesiology",
      achievements: "2-time national qualifier in 10,000m",
      currentOccupation: "Physical Therapist, specializing in runners"
    }
  ];
</script>

<svelte:head>
  <title>Alumni - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Liberty Running Club Alumni</h1>

  <p class="text-center text-lg mb-12 max-w-3xl mx-auto">
    Our alumni have gone on to achieve great things both on and off the track. 
    They continue to inspire current members and embody the values of faith, 
    perseverance, and excellence that define the Liberty Running Club.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each alumni as alum}
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={alum.image} alt={alum.name} class="w-full h-64 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{alum.name}</h3>
          <p class="text-primary-600 mb-2">Class of {alum.graduationYear}</p>
          <p class="text-gray-700 mb-2"><strong>Major:</strong> {alum.major}</p>
          <p class="text-gray-700 mb-2"><strong>Achievements:</strong> {alum.achievements}</p>
          <p class="text-gray-700"><strong>Current:</strong> {alum.currentOccupation}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-12 text-center">
    <p class="mb-4">Are you an alumnus of Liberty Running Club? We'd love to hear from you!</p>
    <a href="/contact" class="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-300">
      Get in Touch
    </a>
  </div>
</div>


