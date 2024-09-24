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
import { useRef, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormTextInput } from '../form/FormTextInput';
import { EllipsisVerticalIcon } from 'lucide-react';
import { Button, TextInput, useNotification } from 'bluerally-design-system';
import { useGetUserMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';
import router from 'next/router';
import dayjs from 'dayjs';

interface Props {
  organizerId?: number;
  partyId: number;
  commentList: GetCommentListResponse;
}

export const Comments = ({ organizerId, partyId, commentList }: Props) => {
  const { isLoggedIn } = useAuth();
  const { mutate: postComment } = usePostPartyComment();
  const { mutate: deleteComment } = useDeletePartyComment();
  const { mutate: updateComment } = useUpdatePartyComment();
  const { data } = useGetUserMe(isLoggedIn);

  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);

  const notification = useNotification();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = data?.data;

  const { control, handleSubmit, reset } =
    useForm<PostCommentListRequestBody>();

  const addComment: SubmitHandler<{ content: string }> = ({ content }) => {
    postComment({
      partyId,
      content,
    });
    reset();
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const handleDropdownOpenIconClick = (
    commentId: number,
    content: string,
    isEdit: boolean,
  ) => {
    setIsDropdownOpen(null);

    if (isEdit) {
      handleEdit(commentId, content);
      return;
    }

    handleDelete(commentId);
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
    notification.alert({
      type: 'error',
      title: '게시물 삭제',
      content: '댓글을 정말 삭제하시겠습니까?',
      onConfirm: () =>
        deleteComment({
          partyId,
          commentId,
        }),
    });
  };

  const handleError: SubmitErrorHandler<PostCommentListResponse> = (error) => {
    console.log(error);
  };

  const iconClick = (id: number) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
  };

  const handleFocus = () => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  };

  return (
    <>
      {commentList?.map(
        ({ id, commenter_profile, posted_date, content, is_writer }) => (
          <div
            key={id}
            className="relative flex flex-col gap-1 p-5 border-b-1 border-b-500"
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <span className="text-medium text-md">
                  {commenter_profile.name}
                </span>
                <span className="text-basic text-b-500">
                  {organizerId === commenter_profile.user_id ? '주최자' : ''}
                </span>
              </div>
              {is_writer && !editingCommentId && (
                <div
                  className="flex items-center cursor-pointer"
                  ref={dropdownRef}
                >
                  <EllipsisVerticalIcon
                    size={16}
                    className="text-g-500"
                    onClick={() => iconClick(id)}
                  />
                </div>
              )}
            </div>

            {is_writer && isDropdownOpen === id && (
              <div className="absolute right-0 text-md mt-6 border rounded-xl  w-[100px] bg-g-0 text-g-950 z-50">
                <span
                  onClick={() => handleDropdownOpenIconClick(id, content, true)}
                  className="block w-full px-5 py-4 text-left cursor-pointer"
                >
                  수정
                </span>
                <span
                  onClick={() =>
                    handleDropdownOpenIconClick(id, content, false)
                  }
                  className="block w-full px-5 pb-4 text-left cursor-pointer"
                >
                  삭제
                </span>
              </div>
            )}

            {editingCommentId === id ? (
              <>
                <div className="font-normal text-b-950 text-md">
                  <TextInput
                    type="text"
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-1 mt-1">
                  <Button
                    variant="gray-outline"
                    onClick={() => setEditingCommentId(null)}
                    width="64px"
                  >
                    취소
                  </Button>
                  <Button
                    variant="primary-outline"
                    onClick={() =>
                      handleEditSubmit({ content: editedCommentContent })
                    }
                    width="64px"
                  >
                    등록
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="font-normal text-b-950 text-md">{content}</div>
                <span className="font-light text-sm-2 text-g-300">
                  {dayjs(posted_date).format('YYYY.MM.DD HH:MM')}
                </span>
              </>
            )}
          </div>
        ),
      )}

      {!!commentList.length && <hr />}
      <div className="flex items-center justify-between gap-1 px-5 pt-5">
        <div className="flex items-center gap-1">
          <span className="text-medium text-md">{currentUser?.name}</span>
          <span className="text-basic text-b-500">
            {organizerId === currentUser?.id ? '주최자' : ''}
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(addComment, handleError)}
        className="px-5 pt-1.5 pb-10"
      >
        <FormTextInput
          control={control}
          name="content"
          placeholder="댓글을 입력해주세요"
          onFocus={handleFocus}
        />
        <div className="flex justify-end mt-2">
          <Button
            variant="primary-outline"
            type="submit"
            className="text-g-400"
          >
            등록
          </Button>
        </div>
      </form>
    </>
  );
};
