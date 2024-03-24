import { useNavigate } from '@/hooks/useNavigate';
import React from 'react';

export const Header = () => {
  const { pushToRoute } = useNavigate();
  return (
    <header className="sticky top-0 left-0 right-0 z-40">
      <div className="box-border relative flex items-center h-12 max-w-sm px-4 mx-auto bg-white border-b">
        <span
          className="text-black cursor-pointer"
          onClick={() => pushToRoute('/')}
        >
          Blue Rally
        </span>
      </div>
    </header>
  );
};
