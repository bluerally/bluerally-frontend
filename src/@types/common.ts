export const STATUS = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
