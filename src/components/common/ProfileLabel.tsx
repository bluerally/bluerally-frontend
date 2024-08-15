import { GetUserByIdResponse, UserSimpleProfile } from '@/@types/user/type';
import { Avatar } from './Avatar';
import { useState } from 'react';
import { ProfileDialog } from './ProfileDialog';

interface Props {
  user?: UserSimpleProfile;
  userRole?: 'NEW' | 'MEMBER' | 'OWNER';
  description?: React.ReactNode;
  extraButton?: React.ReactNode;
}

export const ProfileLabel = ({
  user,
  userRole,
  description,
  extraButton,
}: Props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-2">
        <div onClick={() => setIsProfileOpen(true)}>
          <Avatar image={user?.profile_picture} size="xs" />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <span
              className="font-medium text-g-950 text-md"
              onClick={() => setIsProfileOpen(true)}
            >
              {user?.name ?? ''}
            </span>
            <span className="font-medium text-b-500 text-basic">
              {userRole}
            </span>
          </div>
          <span className="font-normal text-g-400 text-basic">
            {description}
          </span>
        </div>

        <div>{extraButton}</div>
      </div>
      {isProfileOpen && (
        <ProfileDialog
          open={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          userId={user?.user_id}
        />
      )}
    </>
  );
};
