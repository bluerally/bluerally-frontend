import { PropsWithChildren } from 'react';

const PaddingLayout = ({ children }: PropsWithChildren) => {
  return <div className="p-4">{children}</div>;
};

export default PaddingLayout;
