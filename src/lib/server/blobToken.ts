import { env } from '$env/dynamic/private';

/** Vercel Blob token at runtime (avoids $env/static/private at build time). */
export function getBlobReadWriteToken(): string | undefined {
  return env.BLOB_READ_WRITE_TOKEN;
}
