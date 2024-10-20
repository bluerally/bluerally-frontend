import { useGetUserMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ProfileLabel } from './ProfileLabel';

export interface Props {
  open: boolean;
  onClose: () => void;
}

export const SideNavigation = ({ open, onClose }: Props) => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const { data } = useGetUserMe(isLoggedIn);

  const user = data?.data;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const currentUser = {
    user_id: Number(user?.id),
    profile_picture: String(user?.profile_image),
    name: String(user?.name),
  };

  const handleClickLogout = () => {
    logout();
    onClose();
  };

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <>
      {open && (
        <div
          className="inset-0 z-40 bg-black bg-opacity-50 "
          onClick={onClose}
        />
      )}
      <div
        className={`top-0 w-[294px] right-0 h-full bg-white shadow-lg z-50 transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="flex flex-col">
          <div className="px-4 py-[16.5px] border-b border-g-100 hover:bg-gray-100">
            <ProfileLabel user={currentUser} />
          </div>
          <div
            onClick={() => router.push(`/profile`)}
            className="px-4 py-[16.5px] border-b border-g-100 hover:bg-gray-100 cursor-pointer"
          >
            마이페이지
          </div>
          <div
            onClick={() => router.push(`/like`)}
            className="px-4 py-[16.5px] border-b border-g-100 hover:bg-gray-100 cursor-pointer"
          >
            관심 목록
          </div>
          <div className="px-4 py-[16.5px] border-b border-g-100 hover:bg-gray-100 cursor-pointer">
            피드백하기
          </div>
          <div
            onClick={handleClickLogout}
            className="px-4 py-[16.5px] hover:bg-gray-100 cursor-pointer"
          >
            로그아웃
          </div>
        </div>
      </div>
    </>
  );
};
