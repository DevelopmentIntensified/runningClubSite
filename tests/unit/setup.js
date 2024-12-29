import { vi } from 'vitest';

// Mock SvelteKit's $app modules
vi.mock('$app/stores', () => ({
  getStores: vi.fn(() => ({
    page: {
      subscribe: vi.fn()
    }
  })),
  page: {
    subscribe: vi.fn()
  }
}));

vi.mock('$app/navigation', () => ({
  goto: vi.fn()
}));

// Add any other global mocks or setup here
