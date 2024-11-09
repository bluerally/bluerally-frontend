import React from 'react';
import { useGetRedirectionUrl } from '@/hooks/api/auth';
import Image from 'next/image';
import { GetAuthPlatform } from '@/@types/auth/type';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const Login = () => {
  const { mutate: getAuthRedirectUrl } = useGetRedirectionUrl();
  const router = useRouter();

  const handleClickLoginButton = (platform: GetAuthPlatform) => {
    getAuthRedirectUrl({
      platform,
    });
  };

  return (
    <div className="p-5 w-full h-full bg-center bg-cover bg-[url('/images/login_background.svg')] flex flex-col">
      <div className="self-start mb-5 cursor-pointer">
        <ChevronLeft onClick={() => router.push('/')} />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <Image
          src={`/images/logo_white.svg`}
          alt="buooy"
          width={160}
          height={56}
          priority
          className="mb-5"
        />
      </div>
      <div className="flex flex-col items-center w-full gap-5 pb-10">
        <Image
          src={`/images/kakao.svg`}
          alt="kakao login"
          width={460}
          height={54}
          priority
          onClick={() => handleClickLoginButton('kakao')}
          className="cursor-pointer w-full max-w-[460px]"
        />
        <Image
          src={`/images/google.svg`}
          alt="google login"
          width={460}
          height={54}
          priority
          onClick={() => handleClickLoginButton('google')}
          className="cursor-pointer w-full max-w-[460px]"
        />
        <Image
          src={`/images/naver.svg`}
          alt="naver login"
          width={460}
          height={54}
          priority
          onClick={() => handleClickLoginButton('naver')}
          className="cursor-pointer w-full max-w-[460px]"
        />
      </div>
    </div>
  );
};
