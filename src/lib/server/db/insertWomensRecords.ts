import { db } from './index';
import { records } from './schema';

const womensRecords = [
  {
    event: "6k",
    name: "Mikayla Carnathan",
    time: "26:51.5",
    year: 2022,
    gender: "female",
    type: "cross_country",
    description: "Hokie Invitational",
    link: "https://www.tfrrs.org/results/xc/19089/Hokie_Invitational"
  },
  {
    event: "100m",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "200m",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "400m",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "800m",
    name: "Abigail Conrod",
    time: "2:47.26",
    year: 2023,
    gender: "female",
    type: "track",
    description: "Cavalier Invitational Spring",
    link: "https://www.tfrrs.org/results/73803/Cavalier_Invitational"
  },
  {
    event: "1500m",
    name: "Abigail Conrod",
    time: "6:11.79",
    year: 2023,
    gender: "female",
    type: "track",
    description: "Cavalier Invitational Spring",
    link: "https://www.tfrrs.org/results/73803/Cavalier_Invitational"
  },
  {
    event: "1600m",
    name: "Kate Horgan",
    time: "7:24.90",
    year: 2022,
    gender: "female",
    type: "track",
    description: "LRC Fall Time Trial",
    link: null
  },
  {
    event: "3200m",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "3000m steeplechase",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "5000m",
    name: "Natalie Rowell",
    time: "20:20.8",
    year: 2022,
    gender: "female",
    type: "track",
    description: "LRC Fall Time Trial",
    link: null
  },
  {
    event: "4 by 100m",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "4 by 400m",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "4 by 800m",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "4 by 400m mixed",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "mixed",
    type: "track",
    description: "No record set",
    link: null
  },
  // Adding additional common women's track events for completeness
  {
    event: "100m H",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "400m H",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "track",
    description: "No record set",
    link: null
  },
  {
    event: "High Jump",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  },
  {
    event: "Pole Vault",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  },
  {
    event: "Long Jump",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  },
  {
    event: "Triple Jump",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  },
  {
    event: "Shot Put",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  },
  {
    event: "Discus",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  },
  {
    event: "Hammer",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  },
  {
    event: "Javelin",
    name: "N/A",
    time: "N/A",
    year: null,
    gender: "female",
    type: "field",
    description: "No record set",
    link: null
  }
];

export async function insertWomensRecords() {
  try {
    const result = await db.insert(records).values(womensRecords);
    console.log('Women\'s records inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting women\'s records:', error);
  }
}

