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

  return <footer></footer>;
};
