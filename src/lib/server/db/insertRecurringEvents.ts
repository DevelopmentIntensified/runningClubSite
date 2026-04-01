import { db } from '../db';
import { events, locations } from '../db/schema';
import { eq, and } from 'drizzle-orm';

function toNYString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000-04:00`;
}

function isDuringSpringBreak(date: Date): boolean {
  const springBreakStart = new Date('2026-03-13T00:00:00-04:00');
  const springBreakEnd = new Date('2026-03-22T23:59:59-04:00');
  return date >= springBreakStart && date <= springBreakEnd;
}

export async function insertRecurringEvents() {
  const now = new Date();
  const startDate = new Date('2026-01-12T00:00:00-05:00'); // Third week of January

  const allLocations = await db.select().from(locations);

  for (let week = 0; week < 22; week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + week * 7);

    // Tuesday night practice (Tuesday = day 2)
    const tuesdayStart = new Date(weekStart.getTime() + (2 * 24 + 19) * 60 * 60 * 1000);
    const tuesdayEnd = new Date(weekStart.getTime() + (2 * 24 + 21) * 60 * 60 * 1000);
    if (tuesdayStart >= now && !isDuringSpringBreak(tuesdayStart)) {
      await insertEventIfNotExists({
        title: 'Tuesday Practice',
        start: toNYString(tuesdayStart),
        end: toNYString(tuesdayEnd),
        location: 'Outdoor Track',
        type: 'Practice',
        description: 'Our Regular Practice out on the track at 7pm under the lights.'
      });
    }

    // Thursday evening practice (Thursday = day 4)
    const thursdayStart = new Date(weekStart.getTime() + (4 * 24 + 17) * 60 * 60 * 1000);
    const thursdayEnd = new Date(weekStart.getTime() + (4 * 24 + 19) * 60 * 60 * 1000);
    if (thursdayStart >= now && !isDuringSpringBreak(thursdayStart)) {
      await insertEventIfNotExists({
        title: 'Easy Run',
        start: toNYString(thursdayStart),
        end: toNYString(thursdayEnd),
        location: 'Snowflex Parking lot',
        type: 'Practice',
        description: ''
      });
    }

    // Saturday morning run (Saturday = day 6)
    if (allLocations.length > 0) {
      const saturdayStart = new Date(weekStart.getTime() + (6 * 24 + 9) * 60 * 60 * 1000);
      const saturdayEnd = new Date(weekStart.getTime() + (6 * 24 + 11) * 60 * 60 * 1000);
      if (saturdayStart >= now && !isDuringSpringBreak(saturdayStart)) {
        const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
        await insertEventIfNotExists({
          title: 'Long Run',
          start: toNYString(saturdayStart),
          end: toNYString(saturdayEnd),
          location: randomLocation.name,
          type: 'Practice',
          description: ''
        });
      }
    }
  }
}

export async function insertEventIfNotExists(eventData: {
  title: string;
  start: string;
  end: string;
  location: string;
  type: string;
  description: string;
}) {
  const existingEvent = await db
    .select()
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
    console.log(`Inserted event: ${eventData.title} on ${eventData.start}`);
  }
}
