import { Button, Chip } from 'bluerally-design-system';
import { Avatar } from './Avatar';
import { useGetUserById, useGetUserMe } from '@/hooks/api/user';
import { useNavigate } from '@/hooks/useNavigate';

interface Props {
  userId: number;
}

export const Profile = ({ userId }: Props) => {
  const { data: userData } = useGetUserById(userId);
  const { data: userMe } = useGetUserMe();
  const { pushToRoute } = useNavigate();

  const user = userData?.data;

  const isMyProfile = userMe?.data.id === user?.id;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-16">
          <Avatar image={user?.profile_image} />
        </div>
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <div className="font-normal max-h-64 text-md">
            {user?.introduction}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {/* <Chip variant="filled" color="gray">
          #프리다이빙
        </Chip>
        <Chip variant="filled" color="gray">
          #프리다이빙
        </Chip> */}
        {user?.interested_sports.map(({ id, name }) => {
          return (
            <Chip key={id} variant="filled" color="gray">
              #{name}
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
