import { Size } from '@/@types/common';

type Props = {
  image?: string;
  size?: Size;
  isModify?: boolean;
};

const STYLES = {
  xs: { imageSize: 24, borderWidth: 1, borderColor: 100 },
  md: { imageSize: 40, borderWidth: 1, borderColor: 300 },
  lg: { imageSize: 48, borderWidth: 1, borderColor: 300 },
};

export const ProfileImage = ({ image = '', size = 'md' }: Props) => {
  return (
    <img
      src={image}
      alt="profile-image"
      width={STYLES[size].imageSize}
      height={STYLES[size].imageSize}
      className={`border-${STYLES[size].borderWidth} rounded-full border-g-${STYLES[size].borderColor} object-cover`}
      style={{ width: STYLES[size].imageSize, height: STYLES[size].imageSize }}
    />
  );
};
