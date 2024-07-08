import { UserSimpleProfile } from '@/@types/user/type';
import { Avatar } from './Avatar';

interface Props {
  profile?: UserSimpleProfile;
  userRole?: 'NEW' | 'MEMBER' | 'OWNER';
  description?: React.ReactNode;
  extraButton?: React.ReactNode;
}

export const ProfileLabel = ({
  profile,
  userRole,
  description,
  extraButton,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar image={profile?.profile_picture} size="xs" />
      <div className="flex flex-col">
        <div className="flex">
          <span className="font-medium text-g-950 text-md">
            {profile?.name}
          </span>
          <span className="font-medium text-b-500 text-basic">{userRole}</span>
        </div>
        <span className="font-normal text-g-400 text-basic">{description}</span>
      </div>

      <div>{extraButton}</div>
    </div>
  );
};
