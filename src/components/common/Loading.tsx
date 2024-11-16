import Image from 'next/image';

export const Loading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <Image
      src={`/images/loading.gif`}
      alt="loading"
      width={75}
      height={26}
      priority
    />
  </div>
);
