import { useRouter } from 'next/router';
import { Icon } from '../common/Icon';

export const BottomMenu = () => {
  const router = useRouter();

  const isCurrentMenu = (path: string) => {
    return router.pathname === path;
  };

  return (
    <div className="w-full h-[56px] px-9 py-4 bg-white text-center border-t border-gray-100">
      <div className="flex items-center justify-around h-full max-w-screen-lg mx-auto">
        <div
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            isCurrentMenu('/') ? 'text-g-900' : 'text-g-400'
          }`}
          onClick={() => router.push(`/`)}
        >
          <Icon
            name="home"
            color={`${isCurrentMenu('/') ? 'black' : 'gray'}`}
          />
          <span className="text-sm">홈</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            isCurrentMenu('/create-party') ? 'text-g-900' : 'text-g-400'
          }`}
          onClick={() => router.push(`/create-party`)}
        >
          <Icon
            name="write"
            color={`${isCurrentMenu('/create-party') ? 'black' : 'gray'}`}
          />
          <span className="text-sm">모임개설</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            isCurrentMenu('/profile') ? 'text-g-900' : 'text-g-400'
          }`}
          onClick={() => router.push(`/profile`)}
        >
          <Icon
            name="my"
            color={`${isCurrentMenu('/profile') ? 'black' : 'gray'}`}
          />
          <span className="text-sm">마이페이지</span>
        </div>
      </div>
    </div>
  );
};
