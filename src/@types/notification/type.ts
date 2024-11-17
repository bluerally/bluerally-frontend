import { components } from '@/@types/backend';

export type GetNotificationListResponse =
  components['schemas']['NotificationListDto'];

export type PostNotificationListRequestBody =
  components['schemas']['NotificationReadRequest'];

export type GetNotificationsCountResponse =
  components['schemas']['NotificationUnreadCountDto'];
