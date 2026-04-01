import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

export function getUrl() {
  if (dev) {
    return 'http://localhost:5173/';
  } else if (env.ENV === 'test') {
    return 'https://test.libertyrunningclub.com/';
  } else {
    return 'https://libertyrunningclub.com/';
  }
}
