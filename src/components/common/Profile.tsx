import { Size } from '@/@types/common';
import { useGetUserById } from '@/hooks/api/user';
import { Chip } from 'bluerally-design-system';
import { useState } from 'react';
import { ProfileImage } from './ProfileImage';
import { ProfileDialog } from './ProfileDialog';

type Props = {
  userId?: number;
  size?: Size;
  isMyProfile?: boolean;
  isShowInterestedSports?: boolean;
};

export const Profile = ({
  userId,
  size,
  isShowInterestedSports = true,
}: Props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: userData } = useGetUserById(userId, !!userId);

  const user = userData?.data;

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <div className="flex items-center justify-center">
          <ProfileImage image={user?.profile_image} size={size} />
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
          {isShowInterestedSports && (
            <div className="flex gap-2 mt-2">
              {user?.interested_sports.map((sports) => {
                return (
                  <Chip key={sports?.id} variant="gray-filled" size="sm">
                    #{sports?.name}
                  </Chip>
                );
              })}
            </div>
          )}
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
