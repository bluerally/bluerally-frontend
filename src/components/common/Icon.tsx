import Image from 'next/image';

type Props = {
  size?: number;
  name: string;
  color?: 'black' | 'gray';
};

export const Icon = ({ size = 24, name, color = 'black' }: Props) => {
  return (
    <Image
      src={`/icon/${name}-${color}.svg`}
      alt={name}
      width={size}
      height={size}
      priority
    />
  );
};
