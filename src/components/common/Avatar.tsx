import { Size } from '@/@types/common';

import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

interface Props {
  image?: string;
  size?: Size;
  isModify?: boolean;
}

const STYLES = {
  xs: { imageSize: 32, borderWidth: 1, borderColor: 100 },
  md: { imageSize: 60, borderWidth: 1, borderColor: 300 },
  lg: { imageSize: 100, borderWidth: 2, borderColor: 300 },
};

const AVATAR_TYPE = [
  'Abby',
  'Dusty',
  'Lily',
  'Kiki',
  'Garfield',
  'Callie',
  'Cookie',
  'Sammy',
  'Cali',
  'Angel',
  'Scooter',
  'Peanut',
  'Patches',
  'Mia',
  'Snuggles',
  'Pepper',
  'Mittens',
  'Daisy',
];

const getRandomAvatarType = () => {
  const randomIndex = Math.floor(Math.random() * AVATAR_TYPE.length);
  return AVATAR_TYPE[randomIndex];
};

const avatar = createAvatar(thumbs, {
  seed: encodeURIComponent(getRandomAvatarType()),
});

export const Avatar = ({ image = '', size = 'md' }: Props) => {
  return (
    <img
      src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
        getRandomAvatarType(),
      )}`}
      alt="profile-image"
      width={STYLES[size].imageSize}
      height={STYLES[size].imageSize}
      className={`border-${STYLES[size].borderWidth} rounded-full border-g-${STYLES[size].borderColor}`}
    />
  );
};
