import { operations } from '@/@types/backend';

// 파티리스트
export type GetPartyListQuery =
  operations['get_party_list_api_party_list_get']['parameters']['query'];
export type GetPartyListResponse =
  operations['get_party_list_api_party_list_get']['responses']['200']['content']['application/json']['data'];

// 파티상세
export type GetPartyDetailParams =
  operations['get_party_details_api_party_details__party_id__get']['parameters']['path']['party_id'];
export type GetPartyDetailResponse =
  operations['get_party_details_api_party_details__party_id__get']['responses']['200']['content']['application/json']['data'];

export interface PartyListFilterType {
  sport: number | string;
  isActive: boolean;
  searchKeyword: string;
  minDate?: string;
  maxDate: string;
}
