// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users) as any;

console.log(dev);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      isAdmin: attributes.isAdmin,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      stateOfOrigin: attributes.stateOfOrigin,
      graduationYear: attributes.graduationYear,
      lastUpdated: attributes.lastUpdated,
      createdAt: attributes.createdAt,
      lastLogin: attributes.lastLogin
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: typeof users.$inferSelect;
  }
}
