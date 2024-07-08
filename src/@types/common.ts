import { operations } from './backend';

export const STATUS = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export enum PARTICIPATE_STATUS {
  PENDING,
  APPROVED,
  REJECTED,
  CANCELLED,
}

export interface Option {
  name: string;
  id: number;
}

export type Status = (typeof STATUS)[keyof typeof STATUS];

export type GetSportsResponse =
  operations['get_sports_list_api_party_sports_get']['responses']['200']['content']['application/json'];

export type Size = 'xs' | 'md' | 'lg';
