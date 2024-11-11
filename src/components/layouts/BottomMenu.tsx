import React from 'react';
import { useRouter } from 'next/router';
import { Home, PenSquare, UserRound } from 'lucide-react';

export const BottomMenu = () => {
  const router = useRouter();

  const isCurrentMenu = (path: string) => {
    const router = useRouter();
    return router.pathname === path ? 'text-g-900' : 'text-g-400';
  };

  return (
    <div className="sticky bottom-0 w-full h-[56px] px-9 py-4 bg-white text-center border-t border-gray-100">
      <div className="flex items-center justify-around h-full max-w-screen-lg mx-auto">
        <div
          className={`flex flex-col items-center gap-1 ${isCurrentMenu('/')}`}
        >
          <Home
            size={22}
            strokeWidth={1.5}
            className="cursor-pointer"
            onClick={() => router.push(`/`)}
          />
          <span className="text-sm">홈</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 ${isCurrentMenu(
            '/create-party',
          )}`}
        >
          <PenSquare
            size={22}
            strokeWidth={1.5}
            onClick={() => router.push(`/create-party`)}
            className="cursor-pointer"
          />
          <span className="text-sm">모임개설</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 ${isCurrentMenu(
            '/profile',
          )}`}
        >
          <UserRound
            size={22}
            strokeWidth={1.5}
            onClick={() => router.push(`/profile`)}
            className="cursor-pointer"
          />
          <span className="text-sm">마이페이지</span>
        </div>
      </div>
    </div>
  );
};
