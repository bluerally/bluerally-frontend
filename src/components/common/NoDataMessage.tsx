import { FileX } from 'lucide-react';
import React from 'react';

export const NoDataMessage = ({
  icon = <FileX size={32} />,
  message = '데이터가 없어요',
  description = '',
}: {
  icon?: React.ReactNode;
  message: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center text-g-600 h-['50vh']">
      {icon}
      <span className="mt-3 text-xl font-medium">{message}</span>
      <span className="text-basic-2 text-g-400">{description}</span>
    </div>
  );
};
