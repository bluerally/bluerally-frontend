import { Size } from '@/@types/common';
import { useGetUserById } from '@/hooks/api/user';
import { Chip } from 'bluerally-design-system';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { ProfileDialog } from './ProfileDialog';

interface Props {
  userId?: number;
  size?: Size;
  isMyProfile?: boolean;
}

export const Profile = ({ userId, size }: Props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: userData } = useGetUserById(userId, !!userId);

  const user = userData?.data;

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <div className="flex items-baseline justify-center">
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
          <div className="flex gap-2 mt-2">
            {user?.interested_sports.map((sports) => {
              return (
                <Chip key={sports?.id} variant="gray-filled" size="sm">
                  #{sports?.name}
                </Chip>
              );
            })}
          </div>
        </div>
      </div>

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
