import { operations } from '@/@types/backend';

// 댓글리스트
export type GetCommentListRequestPath =
  operations['get_party_comments_api_party__party_id__comment_get']['parameters']['path']['party_id'];
export type GetCommentListResponse =
  operations['get_party_comments_api_party__party_id__comment_get']['responses']['200']['content']['application/json'];

// 댓글 작성
export type PostCommentListRequestPath =
  operations['post_party_comment_api_party__party_id__comment_post']['parameters']['path']['party_id'];
export type PostCommentListRequestBody =
  operations['post_party_comment_api_party__party_id__comment_post']['requestBody']['content']['application/json'];

export type PostCommentRequest = {
  partyId: PostCommentListRequestPath;
  content: PostCommentListRequestBody['content'];
};
export type PostCommentListResponse =
  operations['post_party_comment_api_party__party_id__comment_post']['responses']['201']['content']['application/json'];

// 댓글 수정

// 댓글 삭제
