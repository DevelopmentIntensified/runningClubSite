import { db } from '../db';
import { events, locations } from '../db/schema';
import { sql, eq, and } from 'drizzle-orm';

export async function insertRecurringEvents() {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // Set to beginning of the day

  const allLocations = await db.select().from(locations);

  for (let week = 0; week < 16; week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + week * 7 - startDate.getDay());

    // Tuesday night practice
    await insertEventIfNotExists({
      title: 'Tuesday Practice',
      start: new Date(weekStart.getTime() + (1 * 24 + 19) * 60 * 60 * 1000), // Tuesday 7 PM
      end: new Date(weekStart.getTime() + (1 * 24 + 21) * 60 * 60 * 1000), // Tuesday 9 PM
      location: 'Outdoor Track',
      type: 'Practice',
      description: 'Our Regular Practice out on the track at 7pm under the lights.'
    });

    // Thursday evening practice
    const thursdayLocation = 'Snowflex Parking lot';
    await insertEventIfNotExists({
      title: 'Easy Run',
      start: new Date(weekStart.getTime() + (4 * 24 + 17) * 60 * 60 * 1000), // Thursday 5 PM
      end: new Date(weekStart.getTime() + (4 * 24 + 19) * 60 * 60 * 1000), // Thursday 7 PM
      location: thursdayLocation,
      type: 'Practice',
      description: ""
    });

    // Saturday morning run
    if (allLocations.length > 0) {
      const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
      await insertEventIfNotExists({
        title: 'Long Run',
        start: new Date(weekStart.getTime() + (6 * 24 + 9) * 60 * 60 * 1000), // Saturday 9 AM
        end: new Date(weekStart.getTime() + (6 * 24 + 11) * 60 * 60 * 1000), // Saturday 11 AM
        location: randomLocation.name,
        type: 'Practice'
      });
    }
  }
}

export async function insertEventIfNotExists(eventData) {
  const existingEvent = await db.select()
    .from(events)
    .where(
      and(
        eq(events.title, eventData.title),
        eq(events.start, eventData.start),
        eq(events.location, eventData.location)
      )
    )
    .limit(1);

  if (existingEvent.length === 0) {
    await db.insert(events).values(eventData);
    console.log(`Inserted event: ${eventData.title} on ${eventData.start.toDateString()}`);
  } else {
    console.log(`Event already exists: ${eventData.title} on ${eventData.start.toDateString()}`);
  }
}

