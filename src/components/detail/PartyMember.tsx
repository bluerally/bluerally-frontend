import { PARTICIPATE_STATUS } from '@/@types/common';
import { GetPartyDetailResponse } from '@/@types/party/type';
import { usePostStatusChangeParticipate } from '@/hooks/api/party';
import { Button, useNotification } from 'bluerally-design-system';
import { Profile } from '../common/Profile';

type Props = {
  partyDetail?: GetPartyDetailResponse;
};

export const PartyMember = ({ partyDetail }: Props) => {
  const { mutate: statusChange } = usePostStatusChangeParticipate();
  const notification = useNotification();

  const partyId = partyDetail?.id ?? 0;

  const partyList = [
    ...(partyDetail?.pending_participants?.map((participant) => ({
      ...participant,
      approved: false,
    })) || []),
    ...(partyDetail?.approved_participants?.map((participant) => ({
      ...participant,
      approved: true,
    })) || []),
  ];

  const handleConfirmParticipation = (participationId?: number) => {
    if (!participationId) {
      return;
    }

    notification.alert({
      type: 'confirm',
      title: '파티 신청 수락',
      content:
        '파티 신청을 수락하시겠습니까? 수락하면 해당 신청자가 파티원이 됩니다.',
      confirmButtonText: '수락',
      cancelButtonText: '거절',
      onConfirm: () =>
        statusChange({
          partyId,
          participationId,
          status: PARTICIPATE_STATUS.APPROVED,
        }),
    });
  };

  const handleRejectParticipation = (participationId?: number) => {
    if (!participationId) {
      return;
    }

    notification.alert({
      type: 'error',
      title: '파티 신청 거절',
      content: '파티 신청을 거절하시겠습니까?',
      confirmButtonText: '수락',
      cancelButtonText: '거절',
      onConfirm: () =>
        statusChange({
          partyId,
          participationId,
          status: PARTICIPATE_STATUS.REJECTED,
        }),
    });
  };

  return (
    <>
      {partyList?.map(({ user_id, participation_id, approved }) => {
        return (
          <>
            <div key={user_id} className="flex justify-between px-5 py-4">
              <Profile userId={user_id} size="xs" />
              {partyDetail?.is_user_organizer && !approved && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="red-outline"
                    onClick={() => handleRejectParticipation(participation_id)}
                  >
                    거절
                  </Button>
                  <Button
                    size="sm"
                    variant="primary-outline"
                    onClick={() => handleConfirmParticipation(participation_id)}
                  >
                    승인
                  </Button>
                </div>
              )}
            </div>
            <hr />
          </>
        );
      })}
    </>
  );
};
