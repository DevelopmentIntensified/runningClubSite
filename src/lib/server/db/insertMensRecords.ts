import { db } from './index';
import { records } from './schema';

const mensRecords = [
  {
    event: '5k',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'cross_country',
    description: 'No record set',
    link: null
  },
  {
    event: '8k',
    name: 'Bryce Isler',
    time: '26:56.19',
    year: 2022,
    gender: 'male',
    type: 'cross_country',
    description: 'Dasking Dukes Invitational',
    link: 'https://www.tfrrs.org/results/xc/19089/Dasking_Dukes_Invitational'
  },
  {
    event: '10k',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'cross_country',
    description: 'No record set',
    link: null
  },
  {
    event: '100m',
    name: 'Josiah Fowler',
    time: '14.55',
    year: 2023,
    gender: 'male',
    type: 'track',
    description: 'Hokie Invite Spring',
    link: 'https://www.tfrrs.org/results/73803/Hokie_Invite'
  },
  {
    event: '110m H',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '200m',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '300m H',
    name: 'Josiah Fowler',
    time: 'DNF',
    year: 2023,
    gender: 'male',
    type: 'track',
    description: 'Hokie Invite Spring',
    link: 'https://www.tfrrs.org/results/73803/Hokie_Invite'
  },
  {
    event: '400m H',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '400m',
    name: 'Josiah Fowler',
    time: '1:05.39',
    year: 2023,
    gender: 'male',
    type: 'track',
    description: 'Hokie Invite Spring',
    link: 'https://www.tfrrs.org/results/73803/Hokie_Invite'
  },
  {
    event: '500m',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set (Indoor)',
    link: null
  },
  {
    event: '800m',
    name: 'Joshua Harden',
    time: '2:10.40',
    year: 2021,
    gender: 'male',
    type: 'track',
    description: 'Dennis Craddock Coaches Classic',
    link: 'https://www.tfrrs.org/results/65891/Dennis_Craddock_Coaches_Classic'
  },
  {
    event: '1000m',
    name: 'Noah Tindale',
    time: '2:31.65',
    year: 2022,
    gender: 'male',
    type: 'track',
    description: 'Liberty Kickoff (Indoor)',
    link: 'https://www.tfrrs.org/results/69641/Liberty_Kickoff'
  },
  {
    event: '1500m',
    name: 'Joshua Harden',
    time: '4:36.25',
    year: 2021,
    gender: 'male',
    type: 'track',
    description: 'Dennis Craddock Coaches Classic',
    link: 'https://www.tfrrs.org/results/65891/Dennis_Craddock_Coaches_Classic'
  },
  {
    event: '1600m',
    name: 'Bryce Isler',
    time: '4:34.95',
    year: 2022,
    gender: 'male',
    type: 'track',
    description: 'LRC Fall Time Trial',
    link: null
  },
  {
    event: '1 Mile',
    name: 'Bryce Isler',
    time: '4:36.03',
    year: 2023,
    gender: 'male',
    type: 'track',
    description: 'Brant Tolsma Invitational (Indoor)',
    link: 'https://www.tfrrs.org/results/73803/Brant_Tolsma_Invitational'
  },
  {
    event: '3000m',
    name: 'Brandon Schimmel',
    time: '8:45.99',
    year: 2023,
    gender: 'male',
    type: 'track',
    description: 'Liberty Open (Indoor)',
    link: 'https://www.tfrrs.org/results/73803/Liberty_Open'
  },
  {
    event: '3200m',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '3000m Steeplechase',
    name: 'Jesse Harrell',
    time: '15:24.69',
    year: 2023,
    gender: 'male',
    type: 'track',
    description: 'Cavalier Invitational Spring',
    link: 'https://www.tfrrs.org/results/73803/Cavalier_Invitational'
  },
  {
    event: '5000m',
    name: 'Brandon Schimmel',
    time: '15:39.80',
    year: 2023,
    gender: 'male',
    type: 'track',
    description: 'Brant Tolsma Invitational (Indoor)',
    link: 'https://www.tfrrs.org/results/73803/Brant_Tolsma_Invitational'
  },
  {
    event: '10000m',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '4 by 100m',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '4 by 400m',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '4 by 800m',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: '4 by 400m mixed',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'mixed',
    type: 'track',
    description: 'No record set',
    link: null
  },
  {
    event: 'High Jump',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  },
  {
    event: 'Pole Vault',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  },
  {
    event: 'Long Jump',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  },
  {
    event: 'Triple Jump',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  },
  {
    event: 'Shot Put',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  },
  {
    event: 'Discus',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  },
  {
    event: 'Hammer',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  },
  {
    event: 'Javelin',
    name: 'N/A',
    time: 'N/A',
    year: null,
    gender: 'male',
    type: 'field',
    description: 'No record set',
    link: null
  }
];

export async function insertMensRecords() {
  try {
    const result = await db.insert(records).values(mensRecords);
    console.log("Men's records inserted successfully:", result);
  } catch (error) {
    console.error("Error inserting men's records:", error);
  }
}
