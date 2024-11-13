import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Footer = () => {
  const router = useRouter();

  return (
    <footer className="flex flex-col gap-4 w-full h-[160px] p-10 bg-g-50">
      <div className="flex items-center gap-2 text-basic-2 text-g-500">
        <span
          className="cursor-pointer"
          onClick={() => router.push('/service')}
        >
          이용약관
        </span>
        <div className="w-[1px] h-3 bg-g-200 mx-1.5" />
        <span
          className="cursor-pointer"
          onClick={() => router.push('/privacy-policy')}
        >
          개인정보처리방침
        </span>
        <div className="w-[1px] h-3 bg-g-200 mx-1.5" />
        <Link
          href="https://www.instagram.com/buooy.official"
          className="text-g-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          인스타그램
        </Link>
      </div>
      <span className="text-basic-2 text-g-400">Copyright © 2024 Buooy</span>
    </footer>
  );
};
