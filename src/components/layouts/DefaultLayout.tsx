import { PropsWithChildren, ReactNode } from 'react';
import { Header } from './Header';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-screen max-w-lg mx-auto bg-slate-300">
      <Header />
      {children}
    </main>
  );
};
