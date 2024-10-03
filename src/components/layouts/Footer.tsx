import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const Footer = () => {
  const router = useRouter();
  return (
    <footer className="w-full h-[160px] p-10 bg-g-50">
      <Image
        src={`/images/logo.svg`}
        alt="buooy"
        width={70}
        height={24}
        priority
      />
      <div className="flex items-center gap-2 pt-4 text-basic-2 text-g-500">
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
        <Link href={''} className="text-g-500">
          인스타그램
        </Link>
      </div>
    </footer>
  );
};
