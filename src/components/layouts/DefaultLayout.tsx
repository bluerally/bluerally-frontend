import { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-full mx-auto bg-g-0 min-w-96 w-[600px]">{children}</main>
  );
};
