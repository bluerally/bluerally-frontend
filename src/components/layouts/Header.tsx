import React from 'react';

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const Header = ({ left, center, right }: Props) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-5 mx-auto bg-white w-96 h-14 font-18">
      <div className="cursor-pointer w-3/1">{left}</div>
      <div className="w-3/1">
        <span className="text-xl text-black cursor-pointer">{center}</span>
      </div>
      <div className="cursor-pointer w-3/1">{right}</div>
    </header>
  );
};
