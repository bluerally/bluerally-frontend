import { operations } from '@/@types/backend';

export type GetNotificationListResponse =
  operations['get_user_notifications_api_user_notifications_get']['responses']['200']['content']['application/json'];

export type PostNotificationListRequestBody =
  operations['read_user_notifications_api_user_notifications_read_post']['requestBody']['content']['application/json'];
