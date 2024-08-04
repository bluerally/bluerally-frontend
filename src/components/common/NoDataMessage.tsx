export const NoDataMessage = ({
  message = '데이터가 없어요',
}: {
  message: string;
}) => {
  return (
    <div className="flex items-center justify-center w-full h-screen pt-12 text-center text-gray-400 bg-g-50">
      {message}
    </div>
  );
};
