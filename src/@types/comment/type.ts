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
export type UpdateCommentRequestPath =
  operations['change_party_comment_api_party__party_id__comment__comment_id__put']['parameters']['path'];

export type UpdateCommentRequestBody =
  operations['change_party_comment_api_party__party_id__comment__comment_id__put']['requestBody']['content']['application/json'];

export type UpdateCommentRequest = {
  partyId: UpdateCommentRequestPath['party_id'];
  commentId: UpdateCommentRequestPath['comment_id'];
  content: UpdateCommentRequestBody['content'];
};

// 댓글 삭제
export type DeleteCommentRequestPath =
  operations['delete_party_comment_api_party__party_id__comment__comment_id__delete']['parameters']['path'];

export type DeleteCommentRequest = {
  partyId: DeleteCommentRequestPath['party_id'];
  commentId: DeleteCommentRequestPath['comment_id'];
};
