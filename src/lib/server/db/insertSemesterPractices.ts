import { db } from '../db';
import { events } from '../db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

interface EventData {
  title: string;
  start: string;
  end: string;
  location: string;
  type: string;
  description?: string;
}

const TRACK_LINK = 'https://maps.app.goo.gl/Xbpr98R1q6hUt1G97';
const DST_FALL_END = new Date('2026-11-01'); // DST ends Nov 1, 2026
const DST_SPRING_START = new Date('2027-03-14'); // DST starts Mar 14, 2027

function formatDate(date: Date, hours: number, minutes: number): string {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  const offset = -d.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const absOffset = Math.abs(offset);
  const offsetHours = Math.floor(absOffset / 60);
  const offsetMinutes = absOffset % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00${sign}${pad(offsetHours)}:${pad(offsetMinutes)}`;
}

function isAfterDSTEnd(date: Date): boolean {
  return date >= DST_FALL_END && date < DST_SPRING_START;
}

async function insertEventIfNotExists(eventData: EventData) {
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
    console.log(`Inserted: ${eventData.title} on ${eventData.start}`);
  } else {
    console.log(`Exists: ${eventData.title} on ${eventData.start}`);
  }
}

function createPractice(date: Date, day: 'tuesday' | 'thursday' | 'saturday'): EventData {
  const isAfterDST = isAfterDSTEnd(date);
  const year = date.getFullYear();

  switch (day) {
    case 'tuesday':
      return {
        title: 'Tuesday Practice',
        start: formatDate(date, 19, 0),
        end: formatDate(date, 21, 0),
        location: 'Up on the Track',
        type: 'Practice',
        description: `Our Regular Practice out on the track at 7pm under the lights. We will have dinner at North Campus afterwards. ${TRACK_LINK}`
      };

    case 'thursday': {
      const location = isAfterDST ? 'tbd' : 'Snowflex Parking Lot';
      const description = isAfterDST
        ? 'Might move to 4pm and to check group chat. We will have dinner at the Reber Thomas dining hall afterwards.'
        : 'Thursday trail run at the Snowflex parking lot. We will have dinner at the Reber Thomas dining hall afterwards.';
      return {
        title: 'Thursday Trail Run',
        start: formatDate(date, 17, 15),
        end: formatDate(date, 19, 15),
        location,
        type: 'Practice',
        description
      };
    }

    case 'saturday':
      return {
        title: 'Saturday Long Run',
        start: formatDate(date, 9, 0),
        end: formatDate(date, 11, 0),
        location: 'toBeDetermined',
        type: 'Practice',
        description: 'Saturday long run. We will have lunch at the Reber Thomas dining hall afterwards.'
      };
  }
}

export async function insertSemesterPractices() {
  const semesters = [
    {
      name: 'Fall 2026',
      firstDate: new Date('2026-08-25'),
      lastDate: new Date('2026-12-15'),
      breakStart: new Date('2026-11-23'),
      breakEnd: new Date('2026-11-27')
    },
    {
      name: 'Spring 2027',
      firstDate: new Date('2027-01-19'),
      lastDate: new Date('2027-05-11'),
      breakStart: new Date('2027-03-15'),
      breakEnd: new Date('2027-03-19')
    }
  ];

  for (const semester of semesters) {
    console.log(`\n--- ${semester.name} ---`);

    await insertEventIfNotExists({
      title: semester.name === 'Fall 2026' ? 'Thanksgiving Break' : 'Spring Break',
      start: `${semester.breakStart.toISOString().split('T')[0]} 00:00:00`,
      end: `${semester.breakEnd.toISOString().split('T')[0]} 23:59:00`,
      location: 'N/A',
      type: 'Break',
      description: semester.name === 'Fall 2026' ? 'No practice - Thanksgiving Break' : 'No practice - Spring Break'
    });

    const current = new Date(semester.firstDate);

    while (current <= semester.lastDate) {
      const dayOfWeek = current.getDay();

      if (current >= semester.breakStart && current <= semester.breakEnd) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      const dayBeforeBreak = new Date(semester.breakStart);
      dayBeforeBreak.setDate(dayBeforeBreak.getDate() - 1);
      const dayAfterBreak = new Date(semester.breakEnd);
      dayAfterBreak.setDate(dayAfterBreak.getDate() + 1);

      if (dayOfWeek === 6 && (current.getTime() === dayBeforeBreak.getTime() || current.getTime() === dayAfterBreak.getTime())) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      if (dayOfWeek === 2) {
        await insertEventIfNotExists(createPractice(new Date(current), 'tuesday'));
      } else if (dayOfWeek === 4) {
        await insertEventIfNotExists(createPractice(new Date(current), 'thursday'));
      } else if (dayOfWeek === 6) {
        await insertEventIfNotExists(createPractice(new Date(current), 'saturday'));
      }

      current.setDate(current.getDate() + 1);
  }
  }
}

export async function deleteSemesterPractices() {
  const semesters = [
    {
      name: 'Fall 2026',
      firstDate: new Date('2026-08-25'),
      lastDate: new Date('2026-12-15'),
    },
    {
      name: 'Spring 2027',
      firstDate: new Date('2027-01-19'),
      lastDate: new Date('2027-05-11'),
    }
  ];

  for (const semester of semesters) {
    console.log(`\nDeleting events for ${semester.name}...`);
    const result = await db.delete(events)
      .where(
        and(
          gte(events.start, semester.firstDate.toISOString()),
          lte(events.end, semester.lastDate.toISOString())
        )
      )
      .returning();

    console.log(`Deleted ${result.length} events from ${semester.name}`);
  }
}
