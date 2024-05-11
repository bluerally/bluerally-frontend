import { Profile } from '../common/Profile';
import { Button } from 'bluerally-design-system';
import { components } from '@/@types/backend';
import { usePostStatusChangeParticipate } from '@/hooks/api/party';
import { PARTICIPATE_STATUS } from '@/@types/common';

interface Props {
  partyId: number;
  partyList: (Partial<components['schemas']['ParticipantProfile']> & {
    approved: boolean;
  })[];
}

export const PartyMember = ({ partyId, partyList }: Props) => {
  const { mutate: statusChange } = usePostStatusChangeParticipate();

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
      {partyList?.map(({ user_id, approved }) => {
        return (
          <div key={user_id} className="flex justify-between">
            <Profile userId={user_id} size="xs" />
            {!approved && (
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRejectParticipation(user_id)}
                >
                  거절
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleConfirmParticipation(user_id)}
                >
                  승인
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
