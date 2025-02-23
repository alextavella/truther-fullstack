import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    typecheck: {
      tsconfig: 'tsconfig.json',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        '**/infra/**/*.repository.ts',
        '**/modules/**/*.usecase.ts',
      ],
      threshold: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})