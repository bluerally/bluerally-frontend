import React from 'react';
import { useRouter } from 'next/router';
import { Home, PenSquare, UserRound } from 'lucide-react';

export const BottomMenu = () => {
  const router = useRouter();

  return (
    <div className="sticky bottom-0 w-full h-[56px] px-9 py-4 bg-white text-center border-t border-gray-100">
      <div className="flex items-center justify-between h-full max-w-screen-lg mx-auto">
        <Home
          size={24}
          className="cursor-pointer"
          onClick={() => router.push(`/`)}
        />
        <PenSquare
          size={24}
          onClick={() => router.push(`/create-party`)}
          className="cursor-pointer"
        />
        <UserRound
          size={24}
          onClick={() => router.push(`/profile`)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
