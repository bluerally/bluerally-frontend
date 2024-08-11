import { operations } from '@/@types/backend';

/**  */
export type GetRedirectionUrlParam =
  operations['get_social_login_redirect_url_api_user_auth_redirect_url__platform__get']['parameters']['path'];

export type GetRedirectionUrlResponse =
  operations['get_social_login_redirect_url_api_user_auth_redirect_url__platform__get']['responses']['200']['content']['application/json'];

export type GetAuthPlatform =
  operations['social_auth_callback_api_user_auth__platform__get']['parameters']['path']['platform'];

export type PostAuthToken =
  operations['login_access_token_api_user_auth_token_post']['requestBody']['content']['application/json'];

export type PostAuthRefreshToken =
  operations['access_token_refresh_api_user_auth_token_refresh_post']['requestBody']['content']['application/json']['refresh_token'];

export type PostLogout =
  operations['logout_api_user_auth_logout_post']['responses']['200']['content']['application/json'];
