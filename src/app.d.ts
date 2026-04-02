// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@auth/sveltekit" />

declare module '$env/static/private' {
  export const RESENDAPIKEY: string;
  export const EMAILSECRET: string;
  export const BLOB_READ_WRITE_TOKEN: string;
  export const CLUBEMAIL: string;
}

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: import('lucia').User | null;
      session: import('lucia').Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
