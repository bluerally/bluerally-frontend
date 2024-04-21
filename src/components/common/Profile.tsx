import { Button, Chip } from 'bluerally-design-system';
import { Avatar } from './Avatar';

interface Props {}

export const Profile = ({}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-16">
          <Avatar />
        </div>
        <div className="flex flex-col">
          <span>닉네임</span>
          <div className="font-normal max-h-64 text-md">
            자기소개입니다자기소개입니다자기소개입니다
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Chip variant="filled" color="gray">
          #프리다이빙
        </Chip>
        <Chip variant="filled" color="gray">
          #프리다이빙
        </Chip>
      </div>

      {/* 내 프로필일 경우 */}
      <Button size="sm" variant="outlined" color="gray" width="100%">
        프로필 수정
      </Button>
    </div>
  );
};
