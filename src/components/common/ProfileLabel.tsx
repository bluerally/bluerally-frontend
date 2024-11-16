import { UserSimpleProfile } from '@/@types/user/type';
import { ProfileImage } from './ProfileImage';
import { useState } from 'react';
import { ProfileDialog } from './ProfileDialog';
import { Size } from '@/@types/common';

type Props = {
  user?: UserSimpleProfile;
  userRole?: 'NEW' | 'MEMBER' | 'OWNER';
  description?: React.ReactNode;
  extraButton?: React.ReactNode;
  size?: Size;
};

export const ProfileLabel = ({
  user,
  userRole,
  description,
  extraButton,
  size = 'xs',
}: Props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer">
        <div onClick={() => setIsProfileOpen(true)}>
          <ProfileImage image={user?.profile_picture} size={size} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className="font-medium cursor-pointer text-g-950 text-md-2"
              onClick={() => setIsProfileOpen(true)}
            >
              {user?.name ?? ''}
            </span>

            {/* ToDO chip으로 변경 */}
            <span className="pl-2 font-medium text-b-500 text-basic">
              {userRole}
            </span>
          </div>
          <span className="font-light text-g-400 text-basic">
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
