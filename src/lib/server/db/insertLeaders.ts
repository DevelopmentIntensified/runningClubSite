import eventCoordinatorImg from '$lib/assets/images/leaders/eventCoordinator.jpeg';
import nircaDirectorImg from '$lib/assets/images/leaders/nircaDirector.jpeg';
import coachImg from '$lib/assets/images/leaders/coach.jpeg';
import presidentImg from '$lib/assets/images/leaders/president.jpeg';
import vicePresidentImg from '$lib/assets/images/leaders/vicePresident.jpeg';
import treasurerImg from '$lib/assets/images/leaders/treasurer.jpeg';
import mediaManagerImg from '$lib/assets/images/leaders/mediaManager.jpeg';
import chaplainImg from '$lib/assets/images/leaders/chaplain.jpeg';
import advisorImg from '$lib/assets/images/leaders/advisor.jpeg';
import headOfLogisticsImg from '$lib/assets/images/leaders/headOfLogistics.jpeg';
import { db } from '.';
import { leaders } from './schema';

const leadersData = [
  {
    name: 'Cole Schwartz',
    imageUrl: presidentImg,
    position: 'Club President',
    bio: ''
  },
  {
    name: 'Kyle Moore',
    imageUrl: vicePresidentImg,
    position: 'Vice President',
    bio: ''
  },
  {
    name: 'Leah kelley',
    imageUrl: treasurerImg,
    position: 'Treasurer',
    bio: ''
  },
  {
    name: 'Collin Rose',
    imageUrl: mediaManagerImg,
    position: 'Social Media Coordinator',
    bio:
      'Collin is a second-year student from Sunny Orlando, Florida, who loves middle and long-distance events, is a running shoe connoisseur, and a master on the Aux.'
  },
  {
    name: 'Joshua Harden',
    imageUrl: coachImg,
    position: 'Coach',
    bio: ''
  },
  {
    name: 'Jesse Harrell',
    imageUrl: chaplainImg,
    position: 'Club Chaplain',
    bio: ''
  },
  {
    name: 'Jadyn Talley',
    imageUrl: eventCoordinatorImg,
    position: 'Team Mom/Female Captain/Event Coordinator',
    bio: ''
  },
  {
    name: 'Skylar Waechter',
    imageUrl: advisorImg,
    position: 'Advisory Board Member',
    bio: ''
  },
  {
    name: 'Matthew Petke',
    imageUrl: headOfLogisticsImg,
    position: 'Head of Logistics',
    bio: ''
  },
  {
    name: 'George Crowder',
    imageUrl: nircaDirectorImg,
    position: 'NIRCA Coordinator',
    bio:
      'George Crowder is a first-year student at Liberty University from Winchester, Virginia. He is pursuing a degree in strength and conditioning with a concentration on coaching. George loves middle-distance events and enjoys mountain biking, rock climbing, caving and hiking.'
  }
];

export async function insertLeaders() {
  for (let index = 0; index < leadersData.length; index++) {
    const leader = leadersData[index];
    leader.order = index;
  }
  try {
    const result = await db.insert(leaders).values(leadersData);
    console.log('Events inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting events:', error);
  }
}
