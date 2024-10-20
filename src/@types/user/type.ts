import { components, operations } from '@/@types/backend';

// 내정보 보기
export type GetUserMeResponse =
  operations['get_self_profile_api_user_me_get']['responses']['200']['content']['application/json'];

export type PostUserMeRequestBody =
  operations['update_self_profile_api_user_me_post']['requestBody']['content']['application/json'];

export type PostUserMeProfileImageRequestBody = {
  profile_image?: File;
};
export type PostUserMeProfileImageResponse =
  operations['update_self_profile_image_api_user_me_profile_image_post']['responses']['201']['content']['application/json'];

export type GetUserByIdResponse =
  operations['get_user_profile_api_user_profile__user_id__get']['responses']['200']['content']['application/json'];

export type PostUserMeResponse =
  operations['update_self_profile_api_user_me_post']['responses']['201']['content']['application/json'];

export type getPartyMeOrganizationResponse =
  operations['get_self_organized_party_api_party_me_organized_get']['responses']['200']['content']['application/json'];

export type getPartyMeParticipatedResponse =
  operations['get_participated_party_api_party_me_participated_get']['responses']['200']['content']['application/json'];

export type UserSimpleProfile = components['schemas']['UserSimpleProfile'];
