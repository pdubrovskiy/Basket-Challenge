/**
 * Test setup file to handle Vitest configuration
 * This helps with TypeScript support for expect and other testing utilities
 */

// Explicitly declare that we're using Vitest types
/// <reference types="vitest" />

// Force TypeScript to recognize the globals
declare global {
  // eslint-disable-next-line no-var
  var expect: typeof import("vitest").expect;
}
