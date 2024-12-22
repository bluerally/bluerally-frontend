import { PropsWithChildren } from 'react';
import { BottomMenu } from './BottomMenu';
import { Footer } from './Footer';

type Props = {
  isShowFooter?: boolean;
};

export const BottomMenuLayout = ({
  isShowFooter = false,
  children,
}: PropsWithChildren & Props) => {
  return (
    <main className="h-screen mx-auto bg-g-0 w-full max-w-[600px] flex flex-col">
      <div
        className="flex-grow"
        style={{
          minHeight: '100vh - 112px',
        }}
      >
        {children || <div className="flex-grow" />}
      </div>
      {isShowFooter && <Footer />}
      <div className="sticky bottom-0">
        <BottomMenu />
      </div>
    </main>
  );
};
