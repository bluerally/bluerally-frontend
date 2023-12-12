import { PropsWithChildren, ReactNode } from 'react';
import { Header } from './Header';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto max-w-lg text-center h-screen bg-slate-300">
      <Header />
      {children}
    </main>
  );
};
