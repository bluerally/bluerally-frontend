import { Button, Chip } from 'bluerally-design-system';
import { Avatar } from './Avatar';
import { useGetUserById } from '@/hooks/api/user';
import { useNavigate } from '@/hooks/useNavigate';
import { Size } from '@/@types/common';

interface Props {
  userId?: number;
  size?: Size;
  isMyProfile?: boolean;
}

export const Profile = ({ userId, size, isMyProfile = false }: Props) => {
  const { data: userData } = useGetUserById(userId, !!userId);
  const { pushToRoute } = useNavigate();

  const user = userData?.data;

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="flex items-center justify-center ">
          <Avatar image={user?.profile_image} size={size} />
        </div>
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <div className="font-normal max-h-64 text-md">
            {user?.introduction}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {user?.interested_sports.map((sports) => {
          return (
            <Chip key={sports?.id} variant="filled" color="gray">
              #{sports?.name}
            </Chip>
          );
        })}
      </div>

      {/* 내 프로필일 경우 */}
      {isMyProfile && (
        <Button
          size="sm"
          variant="outlined"
          color="gray"
          width="100%"
          onClick={() => pushToRoute(`/profile/modify`)}
        >
          프로필 수정
        </Button>
      )}
    </div>
  );
};
