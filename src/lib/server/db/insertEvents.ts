import { db } from '.';
import { events } from './schema';
import { DateTime } from 'luxon'
const eventsData = [
 {
    title: 'PowerPoint Night',
    start: '2026-01-23T18:30:00-05:00',
    end: '2026-01-23T20:30:00-05:00',
    location: 'LRC',
    type: 'Social',
    description: 'A fun evening of creative and entertaining PowerPoint presentations by club members.'
  },
  {
    title: "80's Movie Nights",
    start: '2026-01-30T19:00:00-05:00',
    end: '2026-01-31T22:00:00-05:00',
    location: 'LRC',
    type: 'Social',
    description: 'Two-night throwback movie marathon featuring iconic 80s films.'
  },
  {
    title: 'Rock Wall Night',
    start: '2026-02-06T18:30:00-05:00',
    end: '2026-02-06T20:30:00-05:00',
    location: 'LRC',
    type: 'Activity',
    description: 'An adventurous evening of indoor rock climbing with fellow club members.'
  },
  {
    title: 'Super Bowl Party',
    start: '2026-02-08T18:00:00-05:00',
    end: '2026-02-08T22:00:00-05:00',
    location: 'LRC',
    type: 'Social',
    description: 'Watch party for the big game with food, friends, and football.'
  },
  {
    title: 'Galentines',
    start: '2026-02-16T18:00:00-05:00',
    end: '2026-02-16T20:00:00-05:00',
    location: 'LRC',
    type: 'Social',
    description: "A Galentine's Day celebration honoring friendship and community."
  },
  {
    title: 'Morning Hike',
    start: '2026-02-21T08:00:00-05:00',
    end: '2026-02-21T11:00:00-05:00',
    location: 'TBD',
    type: 'Activity',
    description: 'An early morning group hike to enjoy nature and get some fresh air together.'
  },
  {
    title: 'Movie on the Track — LOTR',
    start: '2026-03-06T18:00:00-05:00',
    end: '2026-03-06T21:30:00-05:00',
    location: 'LRC Track',
    type: 'Social',
    description: 'Outdoor screening of The Lord of the Rings on the track. Bring blankets and snacks!'
  },
  {
    title: 'Spring Break',
    start: '2026-03-13T00:00:00-04:00',
    end: '2026-03-22T23:59:00-04:00',
    location: '',
    type: 'Break',
    description: 'Spring break — no scheduled club events. Enjoy the time off!'
  },
  {
    title: 'Regionals & Coffeehouse',
    start: '2026-03-28T11:30:00-04:00',
    end: '2026-03-28T17:00:00-04:00',
    location: 'LRC',
    type: 'Competition',
    description: 'Regional competition followed by a coffeehouse social. Dinner gathering before the event.'
  },
  {
    title: 'Cherry Blossom Race',
    start: '2026-04-11T08:00:00-04:00',
    end: '2026-04-11T12:00:00-04:00',
    location: 'TBD',
    type: 'Race',
    description: 'A scenic spring race celebrating cherry blossom season.'
  },
  {
    title: 'Late Skate',
    start: '2026-04-17T21:00:00-04:00',
    end: '2026-04-17T23:00:00-04:00',
    location: 'TBD',
    type: 'Activity',
    description: 'A late-night skating outing for club members to unwind and have fun.'
  },
  {
    title: 'Celebratory Potluck',
    start: '2026-04-18T18:00:00-04:00',
    end: '2026-04-18T20:00:00-04:00',
    location: 'TBD',
    type: 'Social',
    description: 'End-of-season potluck celebration. Bring a dish to share! Location to be determined.'
  },
  {
    title: 'Formal',
    start: '2026-04-25T18:00:00-04:00',
    end: '2026-04-25T21:00:00-04:00',
    location: 'TBD',
    type: 'Social',
    description: 'The LRC spring formal — a dressed-up evening to close out the semester. Location to be determined.'
  }
];

export async function insertEvents() {
  try {
    const result = await db.insert(events).values(eventsData);
    console.log('Events inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting events:', error);
  }
}