import { dev } from '$app/environment';

export function getUrl() {
  if (dev) {
    return 'http://localhost:5173/';
  } else {
    const env = process.env.ENV;
    if (env === 'test') {
      return 'https://test.libertyrunningclub.com/';
    }
    return 'https://libertyrunningclub.com/';
  }
}
