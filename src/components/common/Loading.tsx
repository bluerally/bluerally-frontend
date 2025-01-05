import Image from 'next/image';

export const Loading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <Image
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/loading.gif`}
      alt="loading"
      width={75}
      height={26}
      priority
    />
  </div>
);
