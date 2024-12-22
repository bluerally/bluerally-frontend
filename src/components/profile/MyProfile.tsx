import { Profile } from '@/components/common/Profile';
import { Header } from '@/components/layouts/Header';
import { useGetPartyStats } from '@/hooks/api/party';
import { useGetUserMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';
import { Button } from 'buooy-design-system';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/router';

export const MyProfile = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { data } = useGetUserMe(isLoggedIn);

  const currentUser = data?.data;

  const { data: partyStatsData } = useGetPartyStats();

  const partyStats = partyStatsData?.data;

  return (
    <div className="flex flex-col">
      <Header
        center={<>마이페이지</>}
        right={
          <Settings
            strokeWidth={1.5}
            size={24}
            onClick={() => router.push('/setting')}
          />
        }
      />
      <div className="p-5">
        <div
          className="flex flex-col flex-grow"
          style={{
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          <Profile userId={currentUser?.id} isMyProfile={true} size="lg" />
          <div className="pt-6">
            <Button
              size="md"
              variant="gray-outline"
              width="100%"
              onClick={() => router.push(`/profile/modify`)}
            >
              프로필 수정
            </Button>
          </div>
          <div className="flex w-full gap-5 bg-g-50 rounded-[16px] px-12 py-5 mt-4">
            <div
              className="flex flex-col items-center w-1/3 cursor-pointer"
              onClick={() => router.push('/profile/organized-party')}
            >
              <span className="text-4xl font-bold text-g-900">
                {partyStats?.created_count}
              </span>
              <span className="font-medium text-md text-g-500">내 모임</span>
            </div>
            <div
              className="flex flex-col items-center w-1/3 cursor-pointer"
              onClick={() => router.push('/profile/participation-party')}
            >
              <span className="text-4xl font-bold text-g-900">
                {partyStats?.participated_count}
              </span>
              <span className="font-medium text-md text-g-500">
                신청한 모임
              </span>
            </div>
            <div
              className="flex flex-col items-center w-1/3 cursor-pointer"
              onClick={() => router.push('/like')}
            >
              <span className="text-4xl font-bold text-g-900">
                {partyStats?.liked_count}
              </span>
              <span className="font-medium text-md text-g-500">찜한 모임</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
