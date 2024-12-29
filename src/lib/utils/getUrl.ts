import { dev } from '$app/environment';

export function getUrl() {
  if (dev) {
    return 'http://localhost:5173/';
  } else {
    return '';
  }
}
