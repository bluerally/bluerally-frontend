import { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-screen mx-auto bg-g-0 w-full max-w-[600px]">
      {children}
    </main>
  );
};
