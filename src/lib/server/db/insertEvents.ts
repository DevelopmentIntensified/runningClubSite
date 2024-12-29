import { db } from '.';
import { events } from './schema';

const eventsData = [
  {
    title: 'Finn Pincus Invitational',
    start: new Date('2025-01-17T09:00:00'),
    end: new Date('2025-01-17T17:00:00'),
    location: 'Roanoke College Track',
    type: 'NCAA Indoor Meet',
    description:
      'Annual indoor track meet hosted by Roanoke College, featuring top collegiate athletes from the region.'
  },
  {
    title: 'Arctic 5k',
    start: new Date('2025-02-01T09:00:00'),
    end: new Date('2025-02-01T11:00:00'),
    location: 'Hydaway Outdoor Center',
    type: 'Trail Race',
    description:
      'A challenging winter trail race through the scenic Hydaway Outdoor Center. Bundle up for this frosty 5k!'
  },
  {
    title: 'Liberty Open',
    start: new Date('2025-02-07T09:00:00'),
    end: new Date('2025-02-07T17:00:00'),
    location: 'Liberty Indoor Track',
    type: 'NCAA Indoor Meet',
    description:
      "Liberty University's premier indoor track and field event, showcasing talent from across the country."
  },
  {
    title: 'UVA',
    start: new Date('2025-03-01T09:00:00'),
    end: new Date('2025-03-01T17:00:00'),
    location: 'UVA Track Complex',
    type: 'NIRCA Meet',
    description:
      'National Intercollegiate Running Club Association meet hosted by the University of Virginia. A great opportunity for club runners to compete.'
  },
  {
    title: 'King of The Mountain',
    start: new Date('2025-03-01T09:00:00'),
    end: new Date('2025-03-01T12:00:00'),
    location: 'Hydaway Outdoor Center',
    type: 'Trail Race',
    description:
      'An exhilarating trail race that challenges runners to conquer the mountain trails of Hydaway Outdoor Center.'
  },
  {
    title: 'JMU',
    start: new Date('2025-03-08T09:00:00'),
    end: new Date('2025-03-08T17:00:00'),
    location: 'JMU track Complex',
    type: 'NIRCA Meet',
    description:
      'NIRCA meet hosted by James Madison University, bringing together collegiate running clubs for friendly competition.'
  },
  {
    title: 'VTech',
    start: new Date('2025-03-22T09:00:00'),
    end: new Date('2025-03-22T17:00:00'),
    location: 'Vtech Track Complex',
    type: 'NIRCA Meet',
    description:
      'Virginia Tech hosts this NIRCA meet, offering a chance for club runners to test their skills on a fast track.'
  },
  {
    title: 'Dr. Jack M. Toms Invitational',
    start: new Date('2025-03-28T09:00:00'),
    end: new Date('2025-03-28T17:00:00'),
    location: 'University of Lynchburg Track',
    type: 'NCAA Outdoor Meet',
    description:
      'Annual outdoor track and field invitational honoring Dr. Jack M. Toms, featuring top collegiate athletes from across the region.'
  },
  {
    title: 'NIRCA Track & Field National Championships',
    start: new Date('2025-04-05T09:00:00'),
    end: new Date('2025-04-05T17:00:00'),
    location: 'Sportsbackers Stadium (VCU)',
    type: 'NIRCA Nationals',
    description:
      'The pinnacle of the NIRCA track and field season, bringing together the best club runners from across the nation to compete for national titles.'
  },
  {
    title: 'NIRCA Half Marathon Nationals',
    start: new Date('2025-04-05T08:00:00'),
    end: new Date('2025-04-05T12:00:00'),
    location: 'Unknown',
    type: 'NIRCA Nationals',
    description:
      'National championship half marathon for collegiate running clubs, testing endurance over 13.1 miles of challenging terrain.'
  },
  {
    title: 'Dennis Craddock Coaches Invitational',
    start: new Date('2025-04-11T09:00:00'),
    end: new Date('2025-04-11T17:00:00'),
    location: 'University of Lynchburg Track',
    type: 'NCAA Outdoor Meet',
    description:
      'Prestigious outdoor track meet named in honor of legendary coach Dennis Craddock, featuring top-tier collegiate competition.'
  },
  {
    title: 'Wildcat Twilight',
    start: new Date('2025-04-19T16:00:00'),
    end: new Date('2025-04-19T22:00:00'),
    location: 'Randolph Track',
    type: 'NCAA Outdoor Meet',
    description:
      'Evening track meet hosted by Randolph College, providing a unique atmosphere for athletes to achieve personal bests under the lights.'
  },
  {
    title: 'Hill City Twighlight',
    start: new Date('2025-05-02T16:00:00'),
    end: new Date('2025-05-02T22:00:00'),
    location: 'University of Lynchburg Track',
    type: 'NCAA Outdoor Meet',
    description:
      "Lynchburg's premier twilight meet, offering fast times and high-level competition as the sun sets over the Hill City."
  },
  {
    title: 'Liberty Twilight',
    start: new Date('2025-05-06T16:00:00'),
    end: new Date('2025-05-06T22:00:00'),
    location: 'Liberty Outdoor Track',
    type: 'NCAA Meet',
    description:
      "Liberty University's signature twilight meet, attracting top talent for an evening of high-performance track and field events."
  },
  {
    title: 'Down the Stretch Track Fest',
    start: new Date('2025-05-16T16:00:00'),
    end: new Date('2025-05-16T22:00:00'),
    location: 'George Mason Track',
    type: 'Other',
    description:
      'Season-ending track festival hosted by George Mason University, celebrating the sport with a mix of competitive events and fun activities.'
  },
  {
    title: "Elite Gymnastics Open Gym Night",
    start: new Date(2025, 0, 30, 20, 0), // January 30th, 2025, 8:00 PM
    end: new Date(2025, 0, 30, 22, 0),   // January 30th, 2025, 10:00 PM
    location: "Elite Gymnastics",
    type: "Social Event"
  },
  {
    title: "Frozen on Ice",
    start: new Date(2025, 1, 7, 19, 0),  // February 7th, 2025, 7:00 PM
    end: new Date(2025, 1, 7, 21, 0),    // February 7th, 2025, 9:00 PM
    location: "Student Activities Center",
    type: "Social Event"
  },
  {
    title: "Elite Gymnastics Night",
    start: new Date(2025, 1, 13, 20, 0), // February 13th, 2025, 8:00 PM
    end: new Date(2025, 1, 13, 22, 0),   // February 13th, 2025, 10:00 PM
    location: "Elite Gymnastics",
    type: "Social Event"
  },
  {
    title: "Josiah Queen Concert",
    start: new Date(2025, 1, 21, 19, 0), // February 21st, 2025, 7:00 PM
    end: new Date(2025, 1, 21, 22, 0),   // February 21st, 2025, 10:00 PM
    location: "Concert Hall",
    type: "Social Event"
  },
  {
    title: "Sunrise Hike at Sharp Top",
    start: new Date(2025, 2, 1, 6, 0),   // March 1st, 2025, 6:00 AM
    end: new Date(2025, 2, 1, 9, 0),     // March 1st, 2025, 9:00 AM
    location: "Sharp Top Mountain",
    type: "Social Event"
  },
  {
    title: "Spring Break",
    start: new Date(2025, 2, 9, 0, 0),   // March 9th, 2025, 12:00 AM
    end: new Date(2025, 2, 14, 23, 59),  // March 14th, 2025, 11:59 PM
    location: "Liberty University",
    type: "Social Event"
  },
  {
    title: "Class of Coffeehouse",
    start: new Date(2025, 2, 22, 19, 0), // March 22nd, 2025, 7:00 PM
    end: new Date(2025, 2, 22, 22, 0),   // March 22nd, 2025, 10:00 PM
    location: "Student Center",
    type: "Social Event"
  },
  {
    title: "Tubing at Snowflex",
    start: new Date(2025, 2, 29, 18, 0), // March 29th, 2025, 6:00 PM
    end: new Date(2025, 2, 29, 21, 0),   // March 29th, 2025, 9:00 PM
    location: "Snowflex Centre",
    type: "Social Event"
  },
  {
    title: "Outside Movie Night",
    start: new Date(2025, 3, 11, 20, 0), // April 11th, 2025, 8:00 PM
    end: new Date(2025, 3, 11, 23, 0),   // April 11th, 2025, 11:00 PM
    location: "TBD",
    type: "Social Event"
  },
  {
    title: "Spring Formal",
    start: new Date(2025, 3, 25, 18, 0), // April 25th, 2025, 6:00 PM
    end: new Date(2025, 3, 25, 21, 0),   // April 25th, 2025, 9:00 PM
    location: "TBD",
    type: "Social Event"
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
