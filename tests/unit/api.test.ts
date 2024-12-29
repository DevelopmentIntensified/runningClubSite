import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST as loginHandler } from '../../inactive/api/login/+server';
import { POST as registerHandler } from '../../inactive/api/register/+server';
import { auth } from '$lib/server/lucia';
import { db } from '$lib/db';

vi.mock('$lib/server/lucia', () => ({
  auth: {
    useKey: vi.fn(),
    createUser: vi.fn(),
    createSession: vi.fn()
  }
}));

vi.mock('$lib/db', () => ({
  db: {
    query: {
      users: {
        findFirst: vi.fn()
      }
    },
    insert: vi.fn().mockReturnValue({ values: vi.fn() })
  }
}));

describe('API Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('Login API', () => {
    it('should return 400 if email or password is missing', async () => {
      const request = new Request('http://localhost/api/login', {
        method: 'POST',
        body: new URLSearchParams({ email: 'test@example.com' }).toString()
      });

      const response = await loginHandler({ request, locals: {} } as any);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ message: 'Invalid email or password' });
    });

    it('should return 400 if login fails', async () => {
      vi.mocked(auth.useKey).mockRejectedValue(new Error('Invalid credentials'));

      const request = new Request('http://localhost/api/login', {
        method: 'POST',
        body: new URLSearchParams({ email: 'test@example.com', password: 'password' }).toString()
      });

      const response = await loginHandler({
        request,
        locals: { auth: { setSession: vi.fn() } }
      } as any);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ message: 'Invalid email or password' });
    });

    it('should return 200 if login succeeds', async () => {
      vi.mocked(auth.useKey).mockResolvedValue({ userId: '123' } as any);
      vi.mocked(db.query.users.findFirst).mockResolvedValue({ id: '123', isAdmin: false } as any);
      vi.mocked(auth.createSession).mockResolvedValue({} as any);

      const request = new Request('http://localhost/api/login', {
        method: 'POST',
        body: new URLSearchParams({ email: 'test@example.com', password: 'password' }).toString()
      });

      const response = await loginHandler({
        request,
        locals: { auth: { setSession: vi.fn() } }
      } as any);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ message: 'Login successful' });
    });
  });

  describe('Register API', () => {
    it('should return 400 if email or password is missing', async () => {
      const request = new Request('http://localhost/api/register', {
        method: 'POST',
        body: new URLSearchParams({ email: 'test@example.com' }).toString()
      });

      const response = await registerHandler({ request, locals: {} } as any);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ message: 'Invalid email or password' });
    });

    it('should return 400 if registration fails', async () => {
      vi.mocked(auth.createUser).mockRejectedValue(new Error('Email already in use'));

      const request = new Request('http://localhost/api/register', {
        method: 'POST',
        body: new URLSearchParams({ email: 'test@example.com', password: 'password' }).toString()
      });

      const response = await registerHandler({
        request,
        locals: { auth: { setSession: vi.fn() } }
      } as any);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ message: 'Email already in use' });
    });

    it('should return 200 if registration succeeds', async () => {
      vi.mocked(auth.createUser).mockResolvedValue({ userId: '123' } as any);
      vi.mocked(auth.createSession).mockResolvedValue({} as any);

      const request = new Request('http://localhost/api/register', {
        method: 'POST',
        body: new URLSearchParams({ email: 'test@example.com', password: 'password' }).toString()
      });

      const response = await registerHandler({
        request,
        locals: { auth: { setSession: vi.fn() } }
      } as any);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ message: 'User created successfully' });
    });
  });
});
