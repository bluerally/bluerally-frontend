import { Size } from '@/@types/common';
import { useEffect, useState } from 'react';

interface Props {
  image?: string;
  size?: Size;
  isModify?: boolean;
}

const STYLES = {
  xs: { imageSize: 26, borderWidth: 1, borderColor: 100 },
  md: { imageSize: 40, borderWidth: 1, borderColor: 300 },
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

export const Avatar = ({ image = '', size = 'md' }: Props) => {
  const [avatarType, setAvatarType] = useState<string>();

  useEffect(() => {
    const randomType = getRandomAvatarType();
    setAvatarType(randomType);
  }, []);

  if (!avatarType) {
    return <></>;
  }

  return (
    <img
      src={image}
      alt="profile-image"
      width={STYLES[size].imageSize}
      height={STYLES[size].imageSize}
      className={`border-${STYLES[size].borderWidth} rounded-full border-g-${STYLES[size].borderColor}`}
    />
  );
};
