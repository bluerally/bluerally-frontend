import { Tabs } from 'bluerally-design-system';
import { useCallback, useState } from 'react';
import { List } from '@/components/main/List';
import {
  useGetPartyMeOrganized,
  useGetPartyMeParticipated,
  useGetUserMe,
} from '@/hooks/api/user';
import { Profile } from '@/components/common/Profile';
import { Header } from '@/components/layouts/Header';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigate';
import { useAuth } from '@/hooks/useAuth';
import { BottomMenu } from '../layouts/BottomMenu';

export const MyProfileComponent = () => {
  const { pushToRoute } = useNavigate();
  const { isLoggedIn } = useAuth();
  const { data } = useGetUserMe(isLoggedIn);

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
      <Header
        left={<ChevronLeft size={24} onClick={() => pushToRoute('/')} />}
        center={<>마이페이지</>}
      />
      <div className="flex flex-col h-screen">
        <div className="flex-shrink-0 p-5">
          <Profile userId={currentUser?.id} isMyProfile={true} />
        </div>
        <div className="flex-shrink-0">
          <Tabs
            onTabChange={handleTabChange}
            selected={selected}
            items={[
              {
                label: `참여한 모임`,
                value: 'participationParty',
                content: null, // content를 여기서 비워둠
              },
              {
                label: `주최한 모임`,
                value: 'selfOrganizationParty',
                content: null, // content를 여기서 비워둠
              },
            ]}
          />
        </div>
        <div className="flex-grow overflow-y-auto bg-g-1">
          {selected === 'participationParty' ? (
            <List
              data={partyMeParticipatedData?.data}
              noDataMessage="참여한 모임이 없어요"
            />
          ) : (
            <List
              data={partyMeOrganizationData?.data}
              noDataMessage="주최한 모임이 없어요"
            />
          )}
        </div>
      </div>
      <BottomMenu />
    </>
  );
};
