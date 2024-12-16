<script>
	import GroupmeIcon from '$lib/components/GroupmeIcon.svelte';
	import InstagramIcon from '$lib/components/InstagramIcon.svelte';

  const leaders = [
    {
      name: "Cole Schwartz",
      image: "/images/john-doe.jpg",
      position: "Club President",
      description: "John is a senior majoring in Exercise Science. He's been running competitively for 8 years and loves to encourage others in their faith and running journey."
    },
    {
      name: "Kyle Moore",
      image: "/images/jane-smith.jpg",
      position: "Vice President",
      description: "Jane is a junior studying Biology. She specializes in long-distance running and has completed three marathons. She's passionate about combining faith and athletics."
    },
    {
      name: "Leah kelley",
      image: "/images/mike-johnson.jpg",
      position: "Treasurer",
      description: "Mike is a sophomore in Business Administration. He manages the club's finances and organizes fundraising events. He's also an avid trail runner."
    },
    {
      name: "Collin Rose",
      image: "/images/sarah-williams.jpg",
      position: "Social Media Manager",
      description: "Sarah is a junior in Communications. She handles the club's correspondence and social media. She's a middle-distance specialist and loves organizing team-building activities."
    },
    {
      name: "Jesse Harrell",
      image: "/images/david-lee.jpg",
      position: "Club Chaplain",
      description: "David is a senior in Biblical Studies. He leads the club's devotionals and prayer meetings. He believes in the power of running as a form of worship."
    },
    {
      name: "Jadyn Talley",
      image: "/images/david-lee.jpg",
      position: "Team Mom/Female Captain",
      description: "David is a senior in Biblical Studies. He leads the club's devotionals and prayer meetings. He believes in the power of running as a form of worship."
    },
    {
      name: "Skylar Waechter",
      image: "/images/david-lee.jpg",
      position: "Advisory Board Member",
      description: "David is a senior in Biblical Studies. He leads the club's devotionals and prayer meetings. He believes in the power of running as a form of worship."
    },
    {
      name: "Matthew Petke",
      image: "/images/david-lee.jpg",
      position: "Head of Logistics",
      description: "David is a senior in Biblical Studies. He leads the club's devotionals and prayer meetings. He believes in the power of running as a form of worship."
    },
    {
      name: "George Crowder",
      image: "/images/emily-chen.jpg",
      position: "NIRCA Coordinator",
      description: "Emily is a sophomore in Event Management. She organizes the club's races and social events. She's a sprinter who loves bringing people together through running."
    }
  ];
</script>

<svelte:head>
  <title>About Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">About Liberty Running Club</h1>

  <div class="grid md:grid-cols-2 gap-12 mb-12">
    <div>
      <img src="/images/team-photo.jpg" alt="Liberty Running Club Team" class="rounded-lg shadow-lg w-full h-auto" />
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
      <p class="mb-4">
        Liberty Running Club is dedicated to fostering a community of runners who seek to glorify God through their passion for running. We believe that every stride we take is an opportunity to honor our Creator and inspire others.
      </p>
      <h2 class="text-2xl font-semibold mb-4">What We Do</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Weekly group runs for all levels</li>
        <li>Monthly devotional and prayer meetings</li>
        <li>Participation in local and regional races through NIRCA</li>
        <li>Community outreach through running-related service projects</li>
      </ul>
      <h2 class="text-2xl font-semibold mb-4">Join Us</h2>
      <p class="mb-4">
        Whether you're a seasoned runner or just starting out, we welcome you to join our community. Together, we can encourage one another, improve our physical health, and grow in our faith.
      </p>
      <div class="flex space-x-4">
        <a href="https://instagram.com/libertyrunningclub" target="_blank" rel="noopener noreferrer" class="text-gray-800 hover:text-primary-600 transition duration-300">
					<InstagramIcon class="w-6 h-6" />
        </a>
        <a href="https://groupme.com/join_group/12345678/abcdefgh" target="_blank" rel="noopener noreferrer" class="text-gray-800 hover:text-primary-600 transition duration-300">
					<GroupmeIcon class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>

  <h2 class="text-3xl font-semibold mb-6 text-center">Our Leadership Team</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each leaders as leader}
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={leader.image} alt={leader.name} class="w-full h-64 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{leader.name}</h3>
          <p class="text-primary-600 mb-2">{leader.position}</p>
          <p class="text-gray-700">{leader.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
