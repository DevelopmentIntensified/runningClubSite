import { dev } from '$app/environment';

export function getUrl() {
  if (dev) {
    return 'http://localhost:5173/';
  } else if (process.env.ENV === 'test') {
    return 'https://test.libertyrunningclub.com/';
  } else {
    return 'https://libertyrunningclub.com/';
  }
}
