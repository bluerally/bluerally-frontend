export const NoDataMessage = ({
  message = '데이터가 없어요',
}: {
  message?: String;
}) => {
  return (
    <div className="w-full h-screen pt-10 mt-2 text-center text-gray-400 bg-g-50">
      {message}
    </div>
  );
};
