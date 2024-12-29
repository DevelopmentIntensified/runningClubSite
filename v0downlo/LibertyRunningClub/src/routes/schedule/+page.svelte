<script>
  import { onMount } from 'svelte';

  let calendarEl;

  onMount(() => {
    // We'll use FullCalendar library to display the ICS file
    import('fullcalendar').then(({ Calendar }) => {
      import('@fullcalendar/icalendar').then(({ default: iCalendarPlugin }) => {
        new Calendar(calendarEl, {
          plugins: [iCalendarPlugin],
          initialView: 'dayGridMonth',
          events: {
            url: '/path-to-your-ics-file.ics',
            format: 'ics'
          },
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth'
          }
        }).render();
      });
    });
  });
</script>

<svelte:head>
  <title>Schedule - Liberty Running Club</title>
  <link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.css' rel='stylesheet' />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Club Schedule</h1>
  <div bind:this={calendarEl} class="bg-white p-4 rounded-lg shadow"></div>
</div>

