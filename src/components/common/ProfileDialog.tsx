import { X } from 'lucide-react';
import { Header } from '../layouts/Header';
import { Dialog } from './Dialog';
import { Avatar } from './Avatar';
import { GetUserByIdResponse } from '@/@types/user/type';
import { Chip } from 'bluerally-design-system';
import { useGetUserById } from '@/hooks/api/user';
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  userId?: number;
};

export const ProfileDialog = ({ open, onClose, userId }: Props) => {
  const { data: userData, isLoading } = useGetUserById(userId, !!userId);
  const [user, setUser] = useState<GetUserByIdResponse>();

  useEffect(() => {
    setUser(userData?.data);
  }, [userId, userData]);

  if (isLoading) {
    return;
  }

  return (
    <Dialog
      open={open}
      header={<Header center={<>프로필</>} right={<X onClick={onClose} />} />}
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
              <Chip key={sports?.id} variant="gray-filled" size="sm">
                #{sports?.name}
              </Chip>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};
