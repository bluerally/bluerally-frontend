import { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <main className="mx-auto w- bg-g-0 w-390 h-812">{children}</main>;
  // return (
  //   <main className="mx-auto w-96 bg-g-0 w-390 h-812 pl-4 pr-4 pb-4 mt-14">
  //     {children}
  //   </main>
  // );
};
