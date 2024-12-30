import { db } from '.';
import { locations } from './schema';

const locationData = [
  {
    name: 'Bellevue Rd',
    description: 'A hilly gravel road about 6 miles long. We often do long runs here.',
    link: 'https://maps.app.goo.gl/YhWtYGSafFVZsDYP8'
  },
  {
    name: 'Liberty Mountain Trail System',
    description:
      "A network of trails on Liberty University's campus, offering various terrains and distances.",
    link: 'https://maps.app.goo.gl/V73pK3Lwgn7kvdxW9'
  },
  {
    name: 'Blackwater Creek Trail - Depot Grille Lot Entrance',
    description:
      'One of the entrances to the trail that we use. A paved, flat trail along the James River, perfect for long runs and recovery jogs.',
    link: 'https://maps.app.goo.gl/AkiaJJPZRMheYgbx6'
  },
  {
    name: 'Blackwater Creek Trail - Greek Orthodox Entrance',
    description:
      'One of the entrances to the trail that we use. A paved, flat trail along the James River, perfect for long runs and recovery jogs.',
    link: 'https://maps.app.goo.gl/Qy7f54SJzjafCdYT8'
  },
  {
    name: 'Blackwater Creek Trail - Linkhorne Middle School Enterance',
    description:
      'One of the entrances to the trail that we use. A paved, flat trail along the James River, perfect for long runs and recovery jogs.',
    link: 'https://maps.app.goo.gl/1xuxjqnErSvivxhAA'
  },
  {
    name: 'Peaks View Park',
    description:
      'A large park with a mix of paved paths and trails, great for interval training and tempo runs.',
    link: 'https://maps.app.goo.gl/Qy7f54SJzjafCdYT8'
  },
  {
    name: 'Piney River',
    description:
      'A 7 mile flat gravel trail great for long runs and easy runs, but a bit of a drive from campus.',
    link: 'https://maps.app.goo.gl/VFNS2QvVGtygf6tn8'
  },
  {
    name: 'Poplar Forest',
    description: 'A historical park that has several trails running through it.',
    link: 'https://maps.app.goo.gl/XqzQKKkrj6cxkP7Z8'
  },
  {
    name: 'Elkton Farm Road',
    description:
      'A lightly traveled road that is half pavement and half gravel. About 3.5 miles out.',
    link: 'https://maps.app.goo.gl/RpaXx1yAjGzMYAom9'
  },
  {
    name: 'New london Tech Trails',
    description:
      'A large group of trails with roling hills. About 6 miles total distance along with a disc golf course.',
    link: 'https://maps.app.goo.gl/UcTeavK5Rtnp9YZc6'
  },
  {
    name: 'Liberty Outdoor Track',
    description: 'Where we do most of our workouts and meet regularly on Tuesday nights.',
    link: 'https://maps.app.goo.gl/Xbpr98R1q6hUt1G97'
  }
];

export async function insertLocations() {
  try {
    const result = await db.insert(locations).values(locationData);
    console.log('Events inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting events:', error);
  }
}
