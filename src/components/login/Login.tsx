import React from 'react';
import { useGetRedirectionUrl } from '@/hooks/api/auth';
import Image from 'next/image';
import { GetAuthPlatform } from '@/@types/auth/type';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { theme } from 'buooy-design-system';

export const Login = () => {
  const { mutate: getAuthRedirectUrl } = useGetRedirectionUrl();
  const router = useRouter();

  const handleClickLoginButton = (platform: GetAuthPlatform) => {
    getAuthRedirectUrl({
      platform,
    });
  };

  return (
    <div
      className={`p-5 w-full h-full bg-center bg-cover bg-[url('/images/blue_background.svg')] flex flex-col`}
    >
      <div className="self-start mb-5 cursor-pointer">
        <ChevronLeft
          onClick={() => router.push('/')}
          color={theme.palette.white}
        />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/logo_white.svg`}
          alt="buooy"
          width={160}
          height={56}
          priority
          className="mb-5 sm:mb-1"
        />
      </div>
      <div className="flex flex-col items-center w-full gap-5 pb-14">
        <div
          className="flex items-center justify-center w-full h-[56px] bg-kakao rounded-[16px] cursor-pointer px-6"
          onClick={() => handleClickLoginButton('kakao')}
        >
          <Image
            src={`/icon/kakao.svg`}
            alt="kakao"
            width={22}
            height={22}
            priority
          />
          <span className="flex-grow text-lg font-semibold text-center text-gray-900">
            카카오로 시작하기
          </span>
        </div>

        {/* 구글 로그인 버튼 */}
        <div
          className="flex items-center justify-between w-full h-[56px] bg-white rounded-[16px] border border-gray-300 cursor-pointer px-6"
          onClick={() => handleClickLoginButton('google')}
        >
          <Image
            src={`/icon/google.svg`}
            alt="google"
            width={22}
            height={22}
            priority
          />
          <span className="flex-grow text-lg font-semibold text-center text-gray-900">
            구글로 시작하기
          </span>
        </div>

        {/* 네이버 로그인 버튼 */}
        <div
          className="flex items-center justify-center w-full h-[56px] bg-naver rounded-[16px] cursor-pointer px-6"
          onClick={() => handleClickLoginButton('naver')}
        >
          <Image
            src={`/icon/naver.svg`}
            alt="naver"
            width={22}
            height={22}
            priority
          />
          <span className="flex-grow font-semibold text-center text-white">
            네이버로 시작하기
          </span>
        </div>
      </div>
    </div>
  );
};
