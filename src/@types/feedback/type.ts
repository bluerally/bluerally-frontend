import { operations } from '../backend';

export type PostFeedbackRequestBody =
  operations['post_feedback_api_feedback_post']['requestBody']['content']['application/json'];

export type PostFeedbackResponse =
  operations['post_feedback_api_feedback_post']['responses']['201']['content']['application/json'];
