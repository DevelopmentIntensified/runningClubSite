// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@auth/sveltekit" />
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
