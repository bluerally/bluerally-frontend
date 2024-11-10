import { Size } from '@/@types/common';
import Image from 'next/image';

interface Props {
  image?: string;
  size?: Size;
  isModify?: boolean;
}

const STYLES = {
  xs: { imageSize: 24, borderWidth: 1, borderColor: 100 },
  md: { imageSize: 40, borderWidth: 1, borderColor: 300 },
  lg: { imageSize: 100, borderWidth: 2, borderColor: 300 },
};

export const Avatar = ({ image = '', size = 'md' }: Props) => {
  console.log({ image });
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
