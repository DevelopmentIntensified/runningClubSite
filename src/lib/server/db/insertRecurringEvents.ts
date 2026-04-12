import { db } from '../db';
import { events, locations } from '../db/schema';
import { eq, and } from 'drizzle-orm';

interface EventData {
  title: string;
  start: string;
  end: string;
  location: string;
  type: string;
  description?: string;
}

export async function insertRecurringEvents() {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  for (let week = 0; week < 16; week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + week * 7 - startDate.getDay());

    const offset = new Date().getTimezoneOffset() / 60;
    await insertEventIfNotExists({
      title: 'Tuesday Practice',
      start: new Date(weekStart.getTime() + (2 * 24 + 19) * 60 * 60 * 1000).toLocaleString("sv") + ".000-0" + offset + ":00",
      end: new Date(weekStart.getTime() + (2 * 24 + 21) * 60 * 60 * 1000).toLocaleString("sv") + ".000-0" + offset + ":00",
      location: 'Outdoor Track',
      type: 'Practice',
      description: 'Our Regular Practice out on the track at 7pm under the lights.'
    });
  }
}

export async function insertEventIfNotExists(eventData: EventData) {
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
    await db.insert(events).values(eventData as any);
    console.log(`Inserted event: ${eventData.title} on ${eventData.start}`);
  } else {
    console.log(`Event already exists: ${eventData.title} on ${eventData.start}`);
  }
}

