import React from 'react';
import { useRouter } from 'next/router';
import { useNavigate } from '@/hooks/useNavigate';
import { ROUTES } from '@/constants/routes';

export const Footer = () => {
  const router = useRouter();
  const { pushToRoute } = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50">
      <div className="relative max-w-lg mx-auto bg-white border-t">
        <div className="box-border relative flex h-12">
          {ROUTES.map(({ name, path }) => {
            const isCurrentPage = router.pathname === path;

            return (
              <span
                key={path}
                className={`cursor-pointer px-10 text-black ${
                  isCurrentPage ? 'text-blue-500' : ''
                }`}
                onClick={() => pushToRoute(path)}
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
