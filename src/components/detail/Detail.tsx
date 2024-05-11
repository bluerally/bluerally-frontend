import { useRouter } from 'next/router';
import {
  useGetPartyDetails,
  usePostCancelParticipate,
  usePostParticipateInParty,
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

  const { data } = useGetPartyDetails(partyId, !!id);
  const { data: commentListData } = useGetPartyCommentList(partyId, !!id);

  const { mutate: participateInParty } = usePostParticipateInParty();
  const { mutate: cancel } = usePostCancelParticipate();

  const [selected, setSelected] = useState('comment');

  const commentList = commentListData?.data;
  const partyDetail = data?.data;

  const pendingParticipants = partyDetail?.pending_participants ?? [];
  const approvedParticipants = partyDetail?.approved_participants ?? [];

  const pendingParticipantsLength =
    partyDetail?.pending_participants?.length ?? 0;
  const approvedParticipantsLength =
    partyDetail?.approved_participants?.length ?? 0;

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

      {/* 참여 */}

      {/* <button onClick={handleParticipate}>참여</button>
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
            label: `${partyDetail?.is_user_organizer ? '멤버관리' : '파티원'}
            ${pendingParticipantsLength + approvedParticipantsLength}
            `,
            value: 'party',
            content: (
              <PartyMember
                partyId={partyId}
                partyList={pendingParticipants
                  .map((participant) => ({
                    ...participant,
                    approved: false,
                  }))
                  .concat(
                    approvedParticipants.map((participant) => ({
                      ...participant,
                      approved: true,
                    })),
                  )}
              />
            ),
          },
        ]}
      />

      {/* footer */}
    </div>
  );
};
