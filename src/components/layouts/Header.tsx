import React from 'react';

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const Header = (props: Props) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-5 mx-auto font-semibold bg-white border-b w-96 h-14 border-g-100 font-18 ">
      <div className="cursor-pointer w-3/1">{props.left}</div>
      <div className="w-3/1">
        <span className="text-black cursor-pointer">{props.center}</span>
      </div>
      <div className="cursor-pointer w-3/1">{props.right}</div>
    </header>
  );
};
