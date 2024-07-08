import { operations } from '@/@types/backend';

// 찜리스트
export type GetLikeListResponse =
  operations['get_liked_parties_api_user_party_like_get']['responses']['200']['content']['application/json'];

export type PostLikeParams =
  operations['add_liked_party_api_party_like__party_id__post']['parameters']['path'];

export type DeleteLikeParams =
  operations['cancel_liked_party_api_party_like__party_id__delete']['parameters']['path'];
