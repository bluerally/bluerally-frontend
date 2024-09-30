import { useRouter } from 'next/router';
import {
  useGetPartyDetails,
  usePostCancelParticipate,
  usePostParticipateInParty,
} from '@/hooks/api/party';
import { PARTICIPATE_STATUS } from '@/@types/common';
import { Comments } from './Comments';
import { useCallback, useState } from 'react';
import {
  Button,
  Chip,
  Tabs,
  useNotification,
  useSnackbar,
} from 'bluerally-design-system';
import { useGetPartyCommentList } from '@/hooks/api/comment';
import { PartyMember } from './PartyMember';
import { ProfileLabel } from '../common';
import {
  Calendar,
  ChevronLeft,
  Copy,
  Heart,
  Info,
  MapPinIcon,
  Share,
  Users,
  Waves,
} from 'lucide-react';
import { useGetUserMe } from '@/hooks/api/user';
import { useDeleteLike, useGetLikeList, usePostLike } from '@/hooks/api/like';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '../common/Loading';
import dayjs from 'dayjs';
import { Header } from '../layouts/Header';
import { useCopyClipboard } from '@/hooks/useCopyClipboard';
import { Divider } from '../common/Divider';
import { Map } from '../common/Map';

export const Detail = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const notification = useNotification();
  const snackbar = useSnackbar();
  const copyToClipboard = useCopyClipboard();

  const { partyId: id } = router.query;

  const partyId = Number(id);

  const { data, isLoading } = useGetPartyDetails(partyId, !!id);
  const { data: commentListData } = useGetPartyCommentList(partyId, !!id);
  const { data: currentUserData } = useGetUserMe(isLoggedIn);
  const { data: likeData } = useGetLikeList(isLoggedIn);

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

  const isNotPartyMember = !approvedParticipants.some(
    (participant) => currentUser?.id === participant?.user_id,
  );

  const isPendingParticipants = pendingParticipants.some(
    (participant) => currentUser?.id === participant?.user_id,
  );

  const handleParticipate = () => {
    notification.alert({
      type: 'confirm',
      title: '파티 참여',
      content: '파티에 참여하시겠습니까?',
      onConfirm: () =>
        participateInParty(partyId, {
          onSuccess: () => {
            snackbar.info({ content: '파티참여가 신청되었습니다.' });
          },
        }),
    });
  };

  const handleCancelParticipate = () => {
    notification.alert({
      type: 'error',
      title: '파티 신청 취소',
      content: '파티 신청을 취소하시겠습니까?',
      onConfirm: () =>
        cancel(
          {
            partyId,
            status: PARTICIPATE_STATUS.CANCELLED,
          },
          {
            onSuccess: () => {
              snackbar.info({ content: '파티 신청이 취소되었습니다.' });
            },
          },
        ),
    });
  };

  const handleAddLike = () => {
    if (isLikeParty) {
      cancelLike(partyId, {
        onSuccess: () => {
          snackbar.info({ content: '관심목록에서 삭제되었습니다.' });
        },
      });
      return;
    }

    addLike(partyId, {
      onSuccess: () => {
        snackbar.info({ content: '관심목록에 추가되었습니다.' });
      },
    });
  };

  const handleTabChange = useCallback(
    (value: string) => {
      setSelected(value);
    },
    [setSelected],
  );

  const handleCopyAddress = () => {
    if (!partyDetail?.place_name) {
      return;
    }
  };

  const handleCopyLink = async () => {
    const currentPath = `${window.location.origin}${router.asPath}`; // 현재 페이지의 URL
    if (window.navigator.share) {
      try {
        await window.navigator.share({
          title: '내 게시물',
          url: currentPath,
        });
      } catch (error) {
        snackbar.error({ content: error as string });
      }
    } else {
      copyToClipboard({
        value: currentPath,
        alertMessage: '링크가 복사되었습니다.',
        errorMessage: '링크 복사에 실패했습니다.',
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        right={<Share size={24} onClick={handleCopyLink} />}
      />

      <div className="flex-shrink-0 p-5">
        <div className="pb-2">
          <Chip variant="primary-outline">{partyDetail?.sport_name}</Chip>
        </div>
        <div className="text-xl font-semibold leading-8 text-g-900">
          {partyDetail?.title}
        </div>
        <div className="py-5">
          <ProfileLabel
            user={partyDetail?.organizer_profile}
            description={
              <>
                {dayjs(partyDetail?.posted_date ?? '').format(
                  'YYYY.MM.DD HH:mm',
                )}
              </>
            }
            size="md"
          />
        </div>

        <Divider />
        <p className="px-4 py-5 text-lg text-g-950">{partyDetail?.body}</p>
        <Divider />
        <div className="py-5">
          <div className="flex items-center gap-1 text-g-600 pb-1.5">
            <Waves size={14} />
            <div className="flex items-center space-x-11 text-basic-2">
              <span>스포츠</span>
              <span>{partyDetail?.sport_name}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-g-600  pb-1.5">
            <Calendar size={14} />
            <div className="flex items-center space-x-11 text-basic-2">
              <span>모임일</span>
              <span>
                {dayjs(partyDetail?.gather_date).format('YYYY.MM.DD')}{' '}
                {partyDetail?.gather_time}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-g-600  pb-1.5">
            <Users size={14} />
            <div className="flex items-center space-x-11 text-basic-2">
              <span>인원수</span>
              <span>{partyDetail?.participants_info}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-g-600">
            <Calendar size={14} />

            <div className="flex items-center space-x-5 text-basic-2">
              <span>신청마감일</span>
              <span className="text-b-500">
                {dayjs(partyDetail?.due_date ?? '').format('YYYY.MM.DD HH:mm')}
              </span>
            </div>
          </div>
        </div>

        {/* 주소 */}
        <div className="text-basic-2">
          <Map
            latitude={partyDetail?.latitude}
            longitude={partyDetail?.longitude}
          />
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <MapPinIcon size={20} className="text-g-500" />
              <span className="text-g-600">{partyDetail?.place_name}</span>
            </div>
            <Button
              variant="gray-outline"
              size="sm"
              onClick={handleCopyAddress}
            >
              <Copy size={14} className="text-g-600" />
              복사
            </Button>
          </div>
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
      </div>

      <div className="flex-grow overflow-y-auto">
        <Tabs
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
      {isLoggedIn && !partyDetail?.is_user_organizer && (
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
