import React from 'react';
import { useRouter } from 'next/router';
import { Home, PenSquare, UserRound } from 'lucide-react';
import { Footer } from './Footer';

export const BottomMenu = () => {
  const router = useRouter();

  const isCurrentMenu = (path: string) => {
    return router.pathname === path ? 'text-g-900' : 'text-g-400';
  };

  return (
    <div className="w-full h-[56px] px-9 py-4 bg-white text-center border-t border-gray-100">
      <div className="flex items-center justify-around h-full max-w-screen-lg mx-auto">
        <div
          className={`flex flex-col items-center gap-1 cursor-pointer ${isCurrentMenu(
            '/',
          )}`}
          onClick={() => router.push(`/`)}
        >
          <Home size={22} strokeWidth={1.5} />
          <span className="text-sm">홈</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 cursor-pointer ${isCurrentMenu(
            '/create-party',
          )}`}
          onClick={() => router.push(`/create-party`)}
        >
          <PenSquare size={22} strokeWidth={1.5} />
          <span className="text-sm">모임개설</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 cursor-pointer ${isCurrentMenu(
            '/profile',
          )}`}
          onClick={() => router.push(`/profile`)}
        >
          <UserRound size={22} strokeWidth={1.5} />
          <span className="text-sm">마이페이지</span>
        </div>
      </div>
    </div>
  );
};
