import { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className="h-screen mx-auto bg-g-0 w-full max-w-[600px]"
      style={{
        minHeight: 'calc(100vh - 112px)',
      }}
    >
      {children}
    </main>
  );
};
