import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useNavigate } from '@/hooks/useNavigate';
import { ROUTES } from '@/constants/routes';

interface Props {
  children: ReactNode;
}

export const FooterCustom = ({ children }: Props) => {
  const router = useRouter();
  const { pushToRoute } = useNavigate();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40
    mx-auto bg-g-0 min-w-96
    "
    >
      <div className="relative mx-auto bg-white">
        <div className="box-border relative ">{children}</div>
      </div>
    </footer>
  );
};
