import React from 'react';

type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  transparent?: boolean;
};

export const Header = ({ left, center, right, transparent = false }: Props) => {
  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 flex items-center w-full p-5 mx-auto font-18 h-14 ${
        transparent ? 'bg-transparent' : 'bg-white'
      } relative`}
    >
      <div className="absolute left-0 p-5 cursor-pointer">{left}</div>
      <div className="mx-auto">
        <span className="text-[17px] font-medium text-black cursor-pointer">
          {center}
        </span>
      </div>
      <div className="absolute right-0 p-5 cursor-pointer">{right}</div>
    </header>
  );
};
