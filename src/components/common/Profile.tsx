import { Button, Chip } from 'bluerally-design-system';
import { Avatar } from './Avatar';
import { useGetUserById } from '@/hooks/api/user';
import { useNavigate } from '@/hooks/useNavigate';
import { Size } from '@/@types/common';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { Header } from '../layouts/Header';
import { X } from 'lucide-react';

interface Props {
  userId?: number;
  size?: Size;
  isMyProfile?: boolean;
}

export const Profile = ({ userId, size, isMyProfile = false }: Props) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: userData } = useGetUserById(userId, !!userId);
  const { pushToRoute } = useNavigate();

  const user = userData?.data;

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="flex items-center justify-center">
          <Avatar image={user?.profile_image} size={size} />
        </div>
        <div className="flex flex-col">
          <span className="cursor-pointer" onClick={() => setProfileOpen(true)}>
            {user?.name}
          </span>
          <div className="font-normal max-h-64 text-md text-g-400">
            {user?.introduction}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
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
          size="sm"
          variant="gray-outline"
          width="100%"
          onClick={() => pushToRoute(`/profile/modify`)}
        >
          프로필 수정
        </Button>
      )}
      <Dialog
        open={profileOpen}
        header={
          <Header
            center={<>프로필</>}
            right={<X onClick={() => setProfileOpen(false)} />}
          />
        }
      >
        <div>
          <div className="flex gap-2">
            <div className="flex items-start justify-start min-w-[70px]">
              <Avatar image={user?.profile_image} size="md" />
            </div>
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <div className="overflow-y-auto font-normal text-md text-g-400 max-h-52">
                {user?.introduction}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {user?.interested_sports.map((sports) => {
              return (
                <Chip key={sports?.id} variant="gray-filled">
                  #{sports?.name}
                </Chip>
              );
            })}
          </div>
        </div>
      </Dialog>
    </div>
  );
};
