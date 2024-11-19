import { PARTICIPATE_STATUS } from '@/@types/common';
import { useGetPartyCommentList } from '@/hooks/api/comment';
import { useDeleteLike, useGetLikeList, usePostLike } from '@/hooks/api/like';
import {
  useDeleteParty,
  useGetPartyDetails,
  usePostCancelParticipate,
  usePostParticipateInParty,
} from '@/hooks/api/party';
import { useGetUserMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';
import { useCopyClipboard } from '@/hooks/useCopyClipboard';
import {
  Button,
  Chip,
  Tabs,
  theme,
  useNotification,
  useSnackbar,
} from 'bluerally-design-system';
import dayjs from 'dayjs';
import {
  Calendar,
  ChevronLeft,
  Copy,
  EllipsisVerticalIcon,
  Heart,
  Info,
  MapPinIcon,
  Pencil,
  Share,
  Trash2,
  Users,
  Waves,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Divider } from '../common/Divider';
import { Loading } from '../common/Loading';
import { Map } from '../common/Map';
import { Header } from '../layouts/Header';
import { Comments } from './Comments';
import { PartyMember } from './PartyMember';
import { ProfileLabel } from '../common/ProfileLabel';

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
  const { mutate: deleteParty } = useDeleteParty();

  const [selected, setSelected] = useState('comment');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            snackbar.success({ content: '파티참여가 신청되었습니다.' });
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
              snackbar.success({ content: '파티 신청이 취소되었습니다.' });
            },
          },
        ),
    });
  };

  const handleAddLike = () => {
    if (isLikeParty) {
      cancelLike(partyId, {
        onSuccess: () => {
          snackbar.success({ content: '관심목록에서 삭제되었습니다.' });
        },
      });
      return;
    }

    addLike(partyId, {
      onSuccess: () => {
        snackbar.success({ content: '관심목록에 추가되었습니다.' });
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
    if (!partyDetail?.place_name.trim() && !partyDetail?.address.trim()) {
      return;
    }

    copyToClipboard({
      value:
        partyDetail?.place_name.trim() === ''
          ? partyDetail?.address
          : partyDetail?.place_name,
      alertMessage: '장소가 복사되었습니다.',
      errorMessage: '장소 복사에 실패했습니다.',
    });
  };
  const handleCopyLink = async () => {
    const currentPath = `${window.location.origin}${router.asPath}`;

    if (window.navigator.share) {
      try {
        await window.navigator.share({
          title: '내 게시물',
          url: currentPath,
        });
      } catch (error) {
        if ((error as any).name === 'AbortError') {
          return;
        }

        snackbar.warning({
          content: error instanceof Error ? error.message : String(error),
        });
      }
    } else {
      copyToClipboard({
        value: currentPath,
        alertMessage: '링크가 복사되었습니다.',
        errorMessage: '링크 복사에 실패했습니다.',
      });
    }
  };

  const handleModify = () => {
    router.push(`/modify-party/${partyId}`);
  };

  const handleDelete = () => {
    notification.alert({
      type: 'confirm',
      title: '파티 삭제',
      content: '파티를 삭제하시겠습니까?',
      onConfirm: () => deleteParty(String(partyId)),
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        right={
          <div className="flex gap-4">
            <Share size={24} onClick={handleCopyLink} strokeWidth={1.5} />
            {partyDetail?.is_user_organizer && (
              <>
                <EllipsisVerticalIcon
                  size={24}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  strokeWidth={1.5}
                />
                {isDropdownOpen && (
                  <div className="absolute right-3 text-md mt-8 border rounded-xl w-[100px] bg-g-0 text-g-950 z-50">
                    <div
                      onClick={handleModify}
                      className="flex items-center w-full gap-2 px-5 py-4 text-left cursor-pointer"
                    >
                      <Pencil size={16} strokeWidth={1.5} />
                      <span>수정</span>
                    </div>
                    <span
                      onClick={handleDelete}
                      className="flex items-center w-full gap-2 px-5 pb-4 text-left cursor-pointer text-error-300"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                      삭제
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        }
      />

      <div className="p-5 ">
        <div className="pb-2">
          <Chip variant="gray-filled" size="sm">
            {partyDetail?.sport_name}
          </Chip>
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
              <span>
                {partyDetail?.current_participants}/
                {partyDetail?.max_participants}명
              </span>
            </div>
          </div>
        </div>

        {/* 주소 */}
        <div className="text-basic-2">
          <Map address={partyDetail?.address ?? ''} />
          <div className="flex items-center justify-between gap-1 mt-2">
            <div className="flex items-center gap-1">
              <MapPinIcon size={20} className="text-g-500" />
              <span className="text-g-600">
                {partyDetail?.place_name.trim() === ''
                  ? partyDetail?.address
                  : partyDetail?.place_name}
              </span>
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
        {(!isNotPartyMember || partyDetail?.is_user_organizer) &&
          partyDetail?.notice && (
            <div className="px-5 py-3 mt-5 bg-g-50 text-basic-2 rounded-2xl">
              <div className="flex items-center gap-1">
                <Info
                  size={16}
                  className="text-g-500"
                  fill={theme.palette.warning}
                  color={theme.palette.white}
                />
                <span className="font-semibold text-g-600">추가정보</span>
              </div>
              <div className="pt-2 text-md text-g-600">
                {partyDetail?.notice}
              </div>
            </div>
          )}
      </div>

      <div className="bg-g-0">
        <Tabs
          onTabChange={handleTabChange}
          selected={selected}
          items={
            isLoggedIn
              ? [
                  {
                    label: `댓글 ${commentList?.length ?? 0}`,
                    value: 'comment',
                    content: (
                      <Comments
                        partyDetail={partyDetail}
                        partyId={partyId}
                        commentList={commentList ?? []}
                      />
                    ),
                  },
                  {
                    label: `${
                      partyDetail?.is_user_organizer ? '멤버관리' : '파티원'
                    }
            ${pendingParticipantsLength + approvedParticipantsLength}
            `,
                    value: 'party',
                    content: <PartyMember partyDetail={partyDetail} />,
                  },
                ]
              : [
                  {
                    label: `댓글 ${commentList?.length ?? 0}`,
                    value: 'comment',
                    content: (
                      <Comments
                        partyDetail={partyDetail}
                        partyId={partyId}
                        commentList={commentList ?? []}
                      />
                    ),
                  },
                ]
          }
        />
      </div>

      {/* footer */}
      {isLoggedIn && !partyDetail?.is_user_organizer && (
        <>
          <hr />
          <div className="flex items-center gap-2.5 p-5 justify-between sticky bottom-0 bg-g-0">
            {isLikeParty ? (
              <div
                className="cursor-pointer text-error-400"
                onClick={handleAddLike}
              >
                <Heart size={32} className="fill-current" strokeWidth={1.5} />
              </div>
            ) : (
              <Heart
                size={32}
                className="cursor-pointer text-g-400"
                onClick={handleAddLike}
                strokeWidth={1.5}
              />
            )}

            {!partyDetail?.is_active && (
              <Button width="100%" size="lg" disabled>
                마감
              </Button>
            )}
            {partyDetail?.is_active &&
              isNotPartyMember &&
              !isPendingParticipants && (
                <Button width="100%" size="lg" onClick={handleParticipate}>
                  신청하기
                </Button>
              )}
            {partyDetail?.is_active &&
              isNotPartyMember &&
              isPendingParticipants && (
                <Button
                  variant="red-outline"
                  width="100%"
                  size="lg"
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
