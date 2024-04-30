import { Button } from 'bluerally-design-system';
import { Avatar } from './Avatar';

interface Props {
  profile?: {
    id: number;
    name: string;
    profilePicture: string;
    status: 'NEW' | 'MEMBER' | 'OWNER';
  };
  description?: React.ReactNode;
  extraButton?: React.ReactNode;
}

export const ProfileLabel = ({ profile, description, extraButton }: Props) => {
  return (
    <div className="flex">
      <Avatar image={profile?.profilePicture} size="xs" />
      <div className="flex flex-col">
        <div className="flex">
          <span className="font-medium text-g-950 text-md">
            아이디입니다
            {/* {profile.name} */}
          </span>
          <span className="font-medium text-b-500 text-basic">
            주최자
            {/* {profile.status} */}
          </span>
        </div>
        <span className="font-normal text-g-400 text-basic">
          프로필한 줄 타이틀
          {/* {description} */}
        </span>
      </div>

      <div>
        <Button variant="outlined" color="error">
          거절
        </Button>
        <Button variant="outlined" color="sky">
          승인
        </Button>

        {/* {extraButton} */}
      </div>
    </div>
  );
};
