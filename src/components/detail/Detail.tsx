import { useRouter } from 'next/router';
import {
  useGetPartyDetails,
  usePostCancelParticipate,
  usePostParticipateInParty,
  usePostStatusChangeParticipate,
} from '@/hooks/api/party';
import {
  useDeletePartyComment,
  useGetPartyCommentList,
  usePostPartyComment,
  useUpdatePartyComment,
} from '@/hooks/api/comment';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import {
  PostCommentListRequestBody,
  PostCommentListResponse,
} from '@/@types/comment/type';
import { useState } from 'react';
import { PARTICIPATE_STATUS } from '@/@types/common';

export const Detail = () => {
  const router = useRouter();

  const { partyId: id } = router.query;

  const partyId = Number(id);

  const { data } = useGetPartyDetails(partyId);
  const { data: commentListData } = useGetPartyCommentList(partyId);
  const { mutate: postComment } = usePostPartyComment();
  const { mutate: deleteComment } = useDeletePartyComment();
  const { mutate: updateComment } = useUpdatePartyComment();
  const { mutate: participateInParty } = usePostParticipateInParty();
  const { mutate: cancel } = usePostCancelParticipate();
  const { mutate: statusChange } = usePostStatusChangeParticipate();

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>('');

  const { control, handleSubmit, reset } =
    useForm<PostCommentListRequestBody>();

  const partyDetailData = data?.data;
  const partyCommentList = commentListData?.data;

  const addComment: SubmitHandler<{ content: string }> = ({ content }) => {
    postComment({
      partyId,
      content,
    });
  };

  const handleError: SubmitErrorHandler<PostCommentListResponse> = (error) => {
    console.log(error);
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const handleEditSubmit: SubmitHandler<{ content: string }> = ({
    content,
  }) => {
    if (editingCommentId !== null) {
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

  const handleParticipate = () => {
    if (window.confirm('파티에 참여하시겠습니까?')) {
      participateInParty(partyId);
    }
  };

  const handleCancelParticipate = () => {
    if (window.confirm('파티 신청을 취소하시겠습니까?')) {
      cancel({
        partyId,
        status: PARTICIPATE_STATUS.CANCELLED,
      });
    }
  };

  const handleConfirmParticipation = (participationId?: number) => {
    if (!participationId) {
      return;
    }

    if (
      window.confirm(
        '파티 신청을 수락하시겠습니까? 수락하면 해당 신청자가 파티원이 됩니다.',
      )
    ) {
      statusChange({
        partyId,
        participationId,
        status: PARTICIPATE_STATUS.APPROVED,
      });
    }
  };

  const handleRejectParticipation = (participationId?: number) => {
    if (!participationId) {
      return;
    }

    if (window.confirm('파티 신청을 거절하시겠습니까?')) {
      statusChange({
        partyId,
        participationId,
        status: PARTICIPATE_STATUS.REJECTED,
      });
    }
  };

  return (
    <>
      {/* 컴포넌트로 빼기 */}
      <div>
        <span>{partyDetailData?.sport_name}</span>
        <span>{partyDetailData?.title}</span>
      </div>
      <p>
        날짜:
        {partyDetailData?.gather_date}
      </p>
      <p>
        장소:
        {partyDetailData?.sport_name}
      </p>
      <p>
        인원:
        {partyDetailData?.participants_info}
      </p>
      <p>
        마감:
        {partyDetailData?.due_date}
      </p>
      <p>
        금액:
        {partyDetailData?.price}
      </p>
      <hr />
      <p>{partyDetailData?.body}</p>
      <hr />
      {/* 컴포넌트로 빼기 */}
      {/* 작성자 */}
      <div>{partyDetailData?.organizer_profile?.name}</div>

      {/* 신청자 */}
      {partyDetailData?.is_user_organizer && (
        <>
          <h3>신청자</h3>
          {partyDetailData?.pending_participants?.map((participant) => (
            <>
              <div key={participant?.user_id}>{participant?.name}</div>
              <button
                onClick={() =>
                  handleConfirmParticipation(participant?.participation_id)
                }
              >
                수락
              </button>
              <hr />
              <button
                onClick={() =>
                  handleRejectParticipation(participant?.participation_id)
                }
              >
                거절
              </button>
            </>
          ))}
        </>
      )}

      {/* 파티원 */}
      <h3>파티원</h3>
      {partyDetailData?.approved_participants?.map((participant) => (
        <div key={participant?.user_id}>{participant?.name}</div>
      ))}

      <br />
      <br />
      <hr />
      <br />
      <br />
      {/* 참여 */}

      <button onClick={handleParticipate}>참여</button>

      <span>-----------</span>
      <button onClick={handleCancelParticipate}>참여 취소</button>

      <br />
      <br />
      <hr />
      <br />
      <br />
      {/* 댓글 */}
      <h2>코멘트</h2>
      <h3>댓글 ({partyCommentList?.length})개</h3>
      {partyCommentList?.map(
        ({ id, commenter_profile, posted_date, content, is_writer }) => (
          <div key={id}>
            <span>댓글 쓴 사람: {commenter_profile.name}</span>
            <span>{posted_date}</span>

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
                {is_writer && (
                  <>
                    <span onClick={() => handleDelete(id)}>삭제</span>
                    <span onClick={() => handleEdit(id, content)}>수정</span>
                  </>
                )}
              </>
            )}
          </div>
        ),
      )}

      <h3>댓글 작성</h3>

      <form onSubmit={handleSubmit(addComment, handleError)}>
        <FormTextInput
          control={control}
          name="content"
          placeholder="댓글을 작성하세요."
        />
        <button type="submit">작성</button>
      </form>
    </>
  );
};
