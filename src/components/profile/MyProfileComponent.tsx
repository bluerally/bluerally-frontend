import { Tabs } from 'bluerally-design-system';
import { useCallback, useState } from 'react';
import { List } from '../main/List';
import {
  useGetPartyMeOrganized,
  useGetPartyMeParticipated,
  useGetUserMe,
} from '@/hooks/api/user';
import { Profile } from '../common/Profile';

export const MyProfileComponent = () => {
  const { data } = useGetUserMe();

  const currentUser = data?.data;

  const [selected, setSelected] = useState('participationParty');

  const { data: partyMeOrganizationData } = useGetPartyMeOrganized();
  const { data: partyMeParticipatedData } = useGetPartyMeParticipated();

  const handleTabChange = useCallback(
    (value: string) => {
      setSelected(value);
    },
    [setSelected],
  );

  return (
    <>
      <Profile userId={currentUser?.id} isMyProfile={true} />
      <Tabs
        onTabChange={handleTabChange}
        selected={selected}
        items={[
          {
            label: `참여한 모임`,
            value: 'participationParty',
            content: (
              <List
                data={partyMeParticipatedData?.data}
                noDataMessage="참여한 모임이 없어요"
              />
            ),
          },
          {
            label: `주최한 모임`,
            value: 'selfOrganizationParty',
            content: (
              <List
                data={partyMeOrganizationData?.data}
                noDataMessage="주최한 모임이 없어요"
              />
            ),
          },
        ]}
      />
    </>
  );
};
