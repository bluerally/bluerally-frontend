import { Size } from '@/@types/common';
import Image from 'next/image';

interface Props {
  image?: string;
  size?: Size;
  isModify?: boolean;
}

const STYLES = {
  xs: { imageSize: 36, borderWidth: 1, borderColor: 100 },
  md: { imageSize: 60, borderWidth: 1, borderColor: 300 },
  lg: { imageSize: 100, borderWidth: 2, borderColor: 300 },
};

export const Avatar = ({ image = '', size = 'md' }: Props) => {
  return (
    <Image
      // src={image}
      src={'https://img.wkorea.com/w/2023/06/style_648fe62d88cfe-700x700.jpg'}
      alt="profile-image"
      width={STYLES[size].imageSize}
      height={STYLES[size].imageSize}
      className={`border-${STYLES[size].borderWidth} rounded-full border-g-${STYLES[size].borderColor}`}
    />
  );
};
