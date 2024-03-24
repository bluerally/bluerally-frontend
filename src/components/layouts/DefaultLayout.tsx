import { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="max-w-sm p-10 pt-0 pb-20 pl-0 pr-0 mx-auto bg-slate-300">
        {children}
      </main>
      <Footer />
    </>
  );
};
