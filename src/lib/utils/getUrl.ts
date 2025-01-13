import { dev } from '$app/environment';

export function getUrl() {
  if (dev) {
    return 'http://localhost:5173/';
  } else if (process.env.ENV === 'test') {
    return 'https://running-club-site-git-test-developmentintensifieds-projects.vercel.app/';
  } else {
    return 'https://running-club-site-developmentintensifieds-projects.vercel.app/';
  }
}
