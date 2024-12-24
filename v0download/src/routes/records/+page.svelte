<script>
  const crossCountryRecords = {
    male: [
      { distance: '5K', name: 'John Doe', time: '14:32', year: 2022 },
      { distance: '8K', name: 'Mike Smith', time: '24:15', year: 2021 },
      { distance: '10K', name: 'Chris Johnson', time: '30:45', year: 2023 },
    ],
    female: [
      { distance: '5K', name: 'Jane Doe', time: '16:45', year: 2022 },
      { distance: '6K', name: 'Sarah Williams', time: '20:30', year: 2021 },
      { distance: '8K', name: 'Emily Brown', time: '28:20', year: 2023 },
    ]
  };

  const trackRecords = {
    male: [
      { event: '100m', name: 'Tom Speed', time: '10.21', year: 2022 },
      { event: '200m', name: 'Mike Quick', time: '20.54', year: 2021 },
      { event: '400m', name: 'John Fast', time: '45.67', year: 2023 },
      { event: '800m', name: 'Chris Middle', time: '1:48.32', year: 2022 },
      { event: '1500m', name: 'Paul Miler', time: '3:38.45', year: 2021 },
      { event: '5000m', name: 'David Long', time: '13:24.56', year: 2023 },
      { event: '10000m', name: 'Mark Marathon', time: '28:32.45', year: 2022 },
    ],
    female: [
      { event: '100m', name: 'Lisa Bolt', time: '11.24', year: 2022 },
      { event: '200m', name: 'Sarah Dash', time: '22.67', year: 2021 },
      { event: '400m', name: 'Emma Lap', time: '51.23', year: 2023 },
      { event: '800m', name: 'Olivia Half', time: '2:01.45', year: 2022 },
      { event: '1500m', name: 'Sophie Metric', time: '4:02.34', year: 2021 },
      { event: '5000m', name: 'Rachel Distance', time: '15:12.67', year: 2023 },
      { event: '10000m', name: 'Kate Endurance', time: '31:45.89', year: 2022 },
    ]
  };
</script>

<svelte:head>
  <title>Club Records - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Club Records</h1>

  <div class="mb-12">
    <h2 class="text-3xl font-semibold mb-4">Cross Country Records</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-2xl font-semibold mb-2">Male</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Distance</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each crossCountryRecords.male as record}
              <tr>
                <td>{record.distance}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-2">Female</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Distance</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each crossCountryRecords.female as record}
              <tr>
                <td>{record.distance}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div>
    <h2 class="text-3xl font-semibold mb-4">Track Records</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-2xl font-semibold mb-2">Male</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Event</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each trackRecords.male as record}
              <tr>
                <td>{record.event}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-2">Female</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Event</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each trackRecords.female as record}
              <tr>
                <td>{record.event}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

