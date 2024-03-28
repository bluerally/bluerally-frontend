import {
  GetCommentListResponse,
  PostCommentListRequestBody,
  PostCommentListResponse,
} from '@/@types/comment/type';
import {
  useDeletePartyComment,
  usePostPartyComment,
  useUpdatePartyComment,
} from '@/hooks/api/comment';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormTextInput } from '../form/FormTextInput';
import { EllipsisVerticalIcon, SendHorizontal } from 'lucide-react';
import { Overlay } from 'bluerally-design-system';

interface Props {
  partyId: number;
  commentList: GetCommentListResponse;
}

export const Comment = ({ partyId, commentList }: Props) => {
  const { mutate: postComment } = usePostPartyComment();
  const { mutate: deleteComment } = useDeletePartyComment();
  const { mutate: updateComment } = useUpdatePartyComment();

  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { control, handleSubmit } = useForm<PostCommentListRequestBody>();

  const addComment: SubmitHandler<{ content: string }> = ({ content }) => {
    postComment({
      partyId,
      content,
    });
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const handleEditSubmit: SubmitHandler<{ content: string }> = ({
    content,
  }) => {
    if (!!editingCommentId) {
      updateComment({
        partyId,
        commentId: editingCommentId,
        content,
      });

      setEditingCommentId(null);
      setEditedCommentContent('');
    }
  };

  const handleDelete = (commentId: number) => {
    deleteComment({
      partyId,
      commentId,
    });
  };

  const handleError: SubmitErrorHandler<PostCommentListResponse> = (error) => {
    console.log(error);
  };

  return (
    <>
      {commentList?.map(
        ({ id, commenter_profile, posted_date, content, is_writer }) => (
          <div key={id}>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <span className="text-medium text-md">
                  {commenter_profile.name}
                </span>
                <span className="text-basic text-md text-b-500">주최자</span>
              </div>
              <div className="flex items-center">
                <EllipsisVerticalIcon
                  size={16}
                  className="text-g-500"
                  onClick={() => setEditingCommentId(id)}
                />
              </div>
            </div>

            {is_writer && (
              <>
                <EllipsisVerticalIcon size={16} className="text-g-500" />
                {/* <span onClick={() => handleDelete(id)}>삭제</span>
                <span onClick={() => handleEdit(id, content)}>수정</span> */}
              </>
            )}

            {editingCommentId === id ? (
              <>
                <input
                  type="text"
                  value={editedCommentContent}
                  onChange={(e) => setEditedCommentContent(e.target.value)}
                />
                <button
                  onClick={() =>
                    handleEditSubmit({ content: editedCommentContent })
                  }
                >
                  완료
                </button>
                <button onClick={() => setEditingCommentId(null)}>취소</button>
              </>
            ) : (
              <>
                <span>{content}</span>
              </>
            )}
            <span>{posted_date}</span>
          </div>
        ),
      )}

      {/* TODO: 로그인하지 않았을때 disabled 처리 */}
      <form onSubmit={handleSubmit(addComment, handleError)}>
        <FormTextInput
          control={control}
          name="content"
          placeholder="댓글을 입력해주세요"
        />

        <SendHorizontal size={24} type="submit" className="text-g-400" />
      </form>
    </>
  );
};
