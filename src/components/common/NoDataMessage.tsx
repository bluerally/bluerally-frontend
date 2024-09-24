import { FileX } from 'lucide-react';
import React from 'react';

export const NoDataMessage = ({
  icon = <FileX size={48} />,
  message = '데이터가 없어요',
  description = '',
}: {
  icon?: React.ReactNode;
  message: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-g-600">
      {icon}
      <span className="text-[22px] mt-6">{message}</span>
      <span className="text-[15px] mt-1">{description}</span>
    </div>
  );
};
