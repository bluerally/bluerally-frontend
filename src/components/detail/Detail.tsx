import { useRouter } from 'next/router';
import {
  useGetPartyDetails,
  usePostCancelParticipate,
  usePostParticipateInParty,
  usePostStatusChangeParticipate,
} from '@/hooks/api/party';
import { PARTICIPATE_STATUS } from '@/@types/common';
import { Comments } from './Comments';
import { useCallback, useState } from 'react';
import { Tabs } from 'bluerally-design-system';
import { useGetPartyCommentList } from '@/hooks/api/comment';
import { PartyMember } from './PartyMember';

export const Detail = () => {
  const router = useRouter();

  const { partyId: id } = router.query;

  const partyId = Number(id);

  const { data } = useGetPartyDetails(partyId);
  const { data: commentListData } = useGetPartyCommentList(partyId);

  const { mutate: participateInParty } = usePostParticipateInParty();
  const { mutate: cancel } = usePostCancelParticipate();
  const { mutate: statusChange } = usePostStatusChangeParticipate();

  const [selected, setSelected] = useState('comment');

  const commentList = commentListData?.data;
  const partyDetail = data?.data;

  const pendingParticipants = partyDetail?.pending_participants ?? [];
  const approvedParticipants = partyDetail?.approved_participants ?? [];

  const pendingParticipantsLength =
    partyDetail?.pending_participants?.length ?? 0;
  const approvedParticipantsLength =
    partyDetail?.approved_participants?.length ?? 0;

  console.log([...pendingParticipants, ...approvedParticipants]);

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

  const handleTabChange = useCallback(
    (value: string) => {
      setSelected(value);
    },
    [setSelected],
  );

  return (
    <div className="p-5">
      {/* 컴포넌트로 빼기 */}
      {/* <Chip variant="outlined">{partyDetailData?.sport_name}</Chip>
      <span>{partyDetailData?.title}</span>
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
      <hr /> */}
      {/* 컴포넌트로 빼기 */}
      {/* 작성자 */}
      {/* <div>{partyDetailData?.organizer_profile?.name}</div> */}

      {/* 신청자 */}
      {/* {partyDetailData?.is_user_organizer && (
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
      )} */}

      {/* 파티원 */}
      {/* <h3>파티원</h3>
      {partyDetailData?.approved_participants?.map((participant) => (
        <div key={participant?.user_id}>{participant?.name}</div>
      ))} */}

      <br />
      <br />
      <hr />
      <br />
      <br />
      {/* 참여 */}

      {/* <button onClick={handleParticipate}>참여</button>

      <span>-----------</span>
      <button onClick={handleCancelParticipate}>참여 취소</button> */}

      <br />
      <br />
      <hr />
      <br />
      <br />

      {/* 댓글, 파티원 */}
      <Tabs
        onTabChange={handleTabChange}
        selected={selected}
        items={[
          {
            label: `댓글 ${commentList?.length ?? 0}`,
            value: 'comment',
            content: (
              <Comments partyId={partyId} commentList={commentList ?? []} />
            ),
          },
          {
            // label: '',
            label: `${partyDetail?.is_user_organizer ? '멤버관리' : '파티원'}
            ${pendingParticipantsLength + approvedParticipantsLength}
            `,
            value: 'party',
            content: (
              <PartyMember
                partyList={[...pendingParticipants, ...approvedParticipants]}
              />
            ),
          },
        ]}
      />

      {/* footer */}
    </div>
  );
};
