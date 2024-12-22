import { GetCommentListResponse } from '@/@types/comment/type';
import {
  useDeletePartyComment,
  usePostPartyComment,
  useUpdatePartyComment,
} from '@/hooks/api/comment';
import { useGetUserMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';
import {
  Badge,
  Button,
  TextInput,
  useNotification,
} from 'bluerally-design-system';
import dayjs from 'dayjs';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { GetPartyDetailResponse } from '@/@types/party/type';
import { useSnackbar } from 'bluerally-design-system';
import { ProfileLabel } from '../common/ProfileLabel';

type Props = {
  partyDetail?: GetPartyDetailResponse;
  partyId: number;
  commentList: GetCommentListResponse;
};

export const Comments = ({ partyDetail, partyId, commentList }: Props) => {
  const { isLoggedIn } = useAuth();
  const { mutate: postComment } = usePostPartyComment();
  const { mutate: deleteComment } = useDeletePartyComment();
  const { mutate: updateComment } = useUpdatePartyComment();
  const { data } = useGetUserMe(isLoggedIn);

  const [comment, setComment] = useState('');
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);

  const notification = useNotification();
  const snackbar = useSnackbar();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = data?.data;

  const isPartyMember = partyDetail?.approved_participants?.some(
    (participant) => currentUser?.id === participant?.user_id,
  );

  const addComment = ({ content }: { content: string }) => {
    if (!content.trim()) {
      snackbar.warning({ content: `댓글을 입력해주세요` });
      return;
    }

    postComment({
      partyId,
      content,
    });

    setComment('');
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

  const handleEditSubmit = ({ content }: { content: string }) => {
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

  const iconClick = (id: number) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
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
              <div className="flex items-center">
                <ProfileLabel
                  user={{
                    user_id: commenter_profile.user_id,
                    profile_picture: commenter_profile.profile_picture,
                    name: commenter_profile.name,
                  }}
                  size="xs"
                />
                {partyDetail?.organizer_profile.user_id ===
                  commenter_profile.user_id && (
                  <Badge variant="primary-outline">파티장</Badge>
                )}
                {partyDetail?.organizer_profile.user_id !==
                  commenter_profile.user_id &&
                  partyDetail?.approved_participants?.some(
                    (participant) =>
                      commenter_profile.user_id === participant?.user_id,
                  ) && <Badge variant="gray-outline">파티원</Badge>}
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
              <div className="absolute right-[20px] text-md mt-6 border rounded-xl  w-[100px] bg-g-0 text-g-950 z-50">
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
                <span className="font-light text-sm-2 text-g-400">
                  {dayjs(posted_date).format('YYYY.MM.DD HH:MM')}
                </span>
              </>
            )}
          </div>
        ),
      )}

      {!!commentList.length && <hr />}
      {isLoggedIn && (
        <div className="flex items-center px-5 pt-5">
          <ProfileLabel
            user={{
              user_id: currentUser?.id ?? 0,
              profile_picture: currentUser?.profile_image ?? '',
              name: currentUser?.name ?? '',
            }}
            size="xs"
          />
          {partyDetail?.is_user_organizer && (
            <Badge variant="primary-outline">파티장</Badge>
          )}
          {!partyDetail?.is_user_organizer && isPartyMember && (
            <Badge variant="gray-outline">파티원</Badge>
          )}
        </div>
      )}
      <form
        className={`px-5 pt-3 ${
          partyDetail?.is_user_organizer ? 'pb-16' : 'pb-32'
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          addComment({ content: comment });
        }}
      >
        <TextInput
          name="content"
          placeholder={
            isLoggedIn
              ? '댓글을 작성해주세요'
              : `로그인 후 댓글을 작성할 수 있습니다`
          }
          disabled={!isLoggedIn}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {isLoggedIn && (
          <div className="flex justify-end mt-2">
            <Button
              variant="primary-outline"
              type="submit"
              className="text-g-400"
            >
              등록
            </Button>
          </div>
        )}
      </form>
    </>
  );
};
