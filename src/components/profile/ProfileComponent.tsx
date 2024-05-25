import { Tabs } from 'bluerally-design-system';
import { useCallback, useState } from 'react';
import { List } from '../main/List';
import {
  useGetPartyMeOrganized,
  useGetPartyMeParticipated,
} from '@/hooks/api/user';
import { Profile } from '../common/Profile';
import { useRouter } from 'next/router';
import { ChevronLeft } from 'lucide-react';
import { Header } from '../layouts/Header';

interface Props {}

export const ProfileComponent = ({}: Props) => {
  const router = useRouter();

  const { userId: id } = router.query;

  const userId = Number(id);

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
      <Header
        left={
          <div className="cursor-pointer">
            <ChevronLeft size={24} />
          </div>
        }
        center={<>마이페이지</>}
      />
      <Profile userId={userId} />
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
