import { operations } from '@/@types/backend';

// 파티리스트
export type GetPartyListQuery =
  operations['get_party_list_api_party_list_get']['parameters']['query'];
export type GetPartyListResponse =
  operations['get_party_list_api_party_list_get']['responses']['200']['content']['application/json'];

// 파티상세
export type GetPartyDetailParams =
  operations['get_party_details_api_party_details__party_id__get']['parameters']['path']['party_id'];
export type GetPartyDetailResponse =
  operations['get_party_details_api_party_details__party_id__get']['responses']['200']['content']['application/json'];

// 파티 참여
export type PostParticipateInPartyParams =
  operations['participate_in_party_api_party__party_id__participate_post']['parameters']['path']['party_id'];

// 파티 취소
export type PostPartyStatusChangeParams =
  operations['participant_change_participation_status_api_party_participants__party_id__status_change_post']['parameters']['path']['party_id'];

export type PostPartyStatusChangeRequestBody =
  operations['participant_change_participation_status_api_party_participants__party_id__status_change_post']['requestBody']['content']['application/json']['new_status'];

export type PostPartyStatusChange = {
  partyId: PostPartyStatusChangeParams;
  status: PostPartyStatusChangeRequestBody;
};

export interface PartyListFilterType {
  sport: number | string;
  isActive: boolean;
  searchKeyword: string;
  minDate?: string;
  maxDate: string;
}
