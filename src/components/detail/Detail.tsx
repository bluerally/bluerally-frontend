import { useRouter } from 'next/router';
import {
  useGetPartyDetails,
  usePostCancelParticipate,
  usePostParticipateInParty,
} from '@/hooks/api/party';
import { PARTICIPATE_STATUS } from '@/@types/common';
import { Comments } from './Comments';
import { useCallback, useState } from 'react';
import { Button, Chip, Tabs, formatter } from 'bluerally-design-system';
import { useGetPartyCommentList } from '@/hooks/api/comment';
import { PartyMember } from './PartyMember';
import { ProfileLabel } from '../common';
import { Calendar, Heart, Info, MapPinIcon, Users, Waves } from 'lucide-react';
import { useGetUserMe } from '@/hooks/api/user';
import { useDeleteLike, useGetLikeList, usePostLike } from '@/hooks/api/like';

export const Detail = () => {
  const router = useRouter();

  const { partyId: id } = router.query;

  const partyId = Number(id);

  const { data } = useGetPartyDetails(partyId, !!id);
  const { data: commentListData } = useGetPartyCommentList(partyId, !!id);
  const { data: currentUserData } = useGetUserMe();
  const { data: likeData } = useGetLikeList();

  const { mutate: participateInParty } = usePostParticipateInParty();
  const { mutate: cancel } = usePostCancelParticipate();
  const { mutate: addLike } = usePostLike();
  const { mutate: cancelLike } = useDeleteLike();

  const [selected, setSelected] = useState('comment');

  const commentList = commentListData?.data;
  const partyDetail = data?.data;
  const currentUser = currentUserData?.data;
  const likeList = likeData?.data;

  const pendingParticipants = partyDetail?.pending_participants ?? [];
  const approvedParticipants = partyDetail?.approved_participants ?? [];

  const pendingParticipantsLength =
    partyDetail?.pending_participants?.length ?? 0;
  const approvedParticipantsLength =
    partyDetail?.approved_participants?.length ?? 0;

  const isLikeParty = likeList?.some(({ id }) => id === partyId);

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

  const handleAddLike = () => {
    if (isLikeParty) {
      cancelLike(partyId);
      return;
    }

    addLike(partyId);
  };

  const handleTabChange = useCallback(
    (value: string) => {
      setSelected(value);
    },
    [setSelected],
  );

  const isNotPartyMember = !approvedParticipants.some(
    (participant) => currentUser?.id === participant?.user_id,
  );

  const isPendingParticipants = pendingParticipants.some(
    (participant) => currentUser?.id === participant?.user_id,
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0 p-5">
        <div className="pb-2">
          <Chip variant="outlined">{partyDetail?.sport_name}</Chip>
        </div>
        <div className="pb-2 text-2xl font-semibold text-g-950">
          {partyDetail?.title}
        </div>
        <ProfileLabel
          profile={partyDetail?.organizer_profile}
          description={
            <>{formatter.dateTime(partyDetail?.posted_date ?? '')}</>
          }
        />
      </div>
      <hr />
      <p className="px-4 py-5 text-lg text-g-950">{partyDetail?.body}</p>
      <hr />
      <div className="p-5">
        <div className="flex items-center gap-1 text-g-500 pb-1.5">
          <Waves size={14} />
          <div className="flex items-center space-x-11 text-basic-2">
            <span>스포츠</span>
            <span>{partyDetail?.sport_name}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-g-500  pb-1.5">
          <Calendar size={14} />
          <div className="flex items-center space-x-11 text-basic-2">
            <span>모임일</span>
            <span>
              {partyDetail?.gather_date} {partyDetail?.gather_time}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-g-500  pb-1.5">
          <Users size={14} />
          <div className="flex items-center space-x-11 text-basic-2">
            <span>인원수</span>
            <span>{partyDetail?.participants_info}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-g-500">
          <Calendar size={14} />

          <div className="flex items-center space-x-5 text-basic-2">
            <span>신청마감일</span>
            <span className="text-b-500">
              {formatter.dateTime(partyDetail?.due_date ?? '')}
            </span>
          </div>
        </div>
      </div>

      {/* 주소 */}
      <div className="flex items-center gap-1 px-5 py-3 bg-g-50 text-basic-2">
        <MapPinIcon size={14} className="text-g-400" />
        <span className="text-g-600">{partyDetail?.place_name}</span>
      </div>

      {/* 추가정보 */}
      {!isNotPartyMember && (
        <div className="px-5 py-3 bg-g-100 text-basic-2">
          <div className="flex items-center gap-1">
            <Info size={14} className="text-g-500" />
            <span className="font-medium text-g-500">추가정보</span>
          </div>
          <div className="text-md text-g-950">{partyDetail?.notice}</div>
        </div>
      )}

      <div className="flex-grow overflow-y-auto">
        <Tabs
          tabPanelStyle={{
            width: '100%',
          }}
          onTabChange={handleTabChange}
          selected={selected}
          items={[
            {
              label: `댓글 ${commentList?.length ?? 0}`,
              value: 'comment',
              content: (
                <Comments
                  organizerId={partyDetail?.organizer_profile.user_id}
                  partyId={partyId}
                  commentList={commentList ?? []}
                />
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
      </div>

      {/* footer */}
      {!partyDetail?.is_user_organizer && (
        // {partyDetail?.is_user_organizer && (
        <>
          <hr />
          <div className="flex items-center gap-2.5 p-5 justify-between">
            {isLikeParty ? (
              <div
                className="cursor-pointer text-error-600"
                onClick={handleAddLike}
              >
                <Heart size={32} className="fill-current" />
              </div>
            ) : (
              <Heart
                size={32}
                className="cursor-pointer text-g-400"
                onClick={handleAddLike}
              />
            )}

            {!partyDetail?.is_active && (
              <Button width="279px" size="lg" disabled>
                마감
              </Button>
            )}
            {partyDetail?.is_active && isNotPartyMember && (
              <Button width="279px" size="lg" onClick={handleParticipate}>
                신청하기
              </Button>
            )}
            {partyDetail?.is_active && isPendingParticipants && (
              <Button
                width="279px"
                size="lg"
                color="error"
                onClick={handleCancelParticipate}
              >
                신청취소
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
