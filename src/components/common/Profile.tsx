import { Button, Chip } from 'bluerally-design-system';
import { Avatar } from './Avatar';
import { useGetUserById } from '@/hooks/api/user';
import { Size } from '@/@types/common';
import { useState } from 'react';
import { ProfileDialog } from './ProfileDialog';
import { useRouter } from 'next/router';

interface Props {
  userId?: number;
  size?: Size;
  isMyProfile?: boolean;
}

export const Profile = ({ userId, size, isMyProfile = false }: Props) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: userData } = useGetUserById(userId, !!userId);

  const user = userData?.data;

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="flex items-center justify-center">
          <Avatar image={user?.profile_image} size={size} />
        </div>
        <div className="flex flex-col">
          <span
            className="cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          >
            {user?.name}
          </span>
          <div className="font-normal max-h-64 text-md text-g-400">
            {user?.introduction}
          </div>
        </div>
      </div>
      <div className="flex mt-2">
        {user?.interested_sports.map((sports) => {
          return (
            <Chip key={sports?.id} variant="gray-filled">
              #{sports?.name}
            </Chip>
          );
        })}
      </div>

      {/* 내 프로필일 경우 */}
      {isMyProfile && (
        <Button
          size="md"
          variant="gray-outline"
          width="100%"
          onClick={() => router.push(`/profile/modify`)}
        >
          프로필 수정
        </Button>
      )}
      {isProfileOpen && (
        <ProfileDialog
          open={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          userId={user?.id}
        />
      )}
    </div>
  );
};
