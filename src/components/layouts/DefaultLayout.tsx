import { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    // <main className="max-w-xl mx-auto w-390 bg-g-0 min-w-96 h-812">
    <main className="mx-auto w- bg-g-0 min-w-96 max-w-xl h-full">
      {children}
    </main>
  );
};
