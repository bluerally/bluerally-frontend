import { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <main className="mx-auto w- bg-g-0 w-390 h-812">{children}</main>;
};
