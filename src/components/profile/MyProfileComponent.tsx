import { Profile } from '@/components/common/Profile';
import { Header } from '@/components/layouts/Header';
import { useGetUserMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/router';
import { BottomMenu } from '../layouts/BottomMenu';

export const MyProfileComponent = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { data } = useGetUserMe(isLoggedIn);

  const currentUser = data?.data;

  return (
    <>
      <Header
        center={<>마이페이지</>}
        right={<Settings size={24} onClick={() => router.push('/setting')} />}
      />
      <div className="flex flex-col h-screen p-5">
        <div className="flex-shrink-0">
          <Profile userId={currentUser?.id} isMyProfile={true} />
        </div>
        <div className="flex w-full gap-5 bg-g-50  rounded-[16px] px-10 py-5 mt-6">
          <div
            className="flex flex-col items-center w-1/3 cursor-pointer"
            onClick={() => router.push('/profile/organized-party')}
          >
            <span className="text-4xl font-bold text-g-900">0</span>
            <span className="font-medium text-md text-g-500">내 모임</span>
          </div>
          <div
            className="flex flex-col items-center w-1/3 cursor-pointer"
            onClick={() => router.push('/profile/participation-party')}
          >
            <span className="text-4xl font-bold text-g-900">3</span>
            <span className="font-medium text-md text-g-500">참여한 모임</span>
          </div>
          <div
            className="flex flex-col items-center w-1/3 cursor-pointer"
            onClick={() => router.push('/like')}
          >
            <span className="text-4xl font-bold text-g-900">3</span>
            <span className="font-medium text-md text-g-500">찜한 모임</span>
          </div>
        </div>
      </div>
      <BottomMenu />
    </>
  );
};
