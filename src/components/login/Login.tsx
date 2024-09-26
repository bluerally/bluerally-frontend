import React from 'react';
import { useGetRedirectionUrl } from '@/hooks/api/auth';
import Image from 'next/image';
import { GetAuthPlatform } from '@/@types/auth/type';
import { IMAGE_URL } from '@/constants/common';

export const Login = () => {
  const { mutate: getAuthRedirectUrl } = useGetRedirectionUrl();

  const handleClickLoginButton = (platform: GetAuthPlatform) => {
    getAuthRedirectUrl({
      platform,
    });
  };

  return (
    <div className="px-[65px] py-[80px] flex flex-col items-center w-full h-full bg-center bg-cover login-background">
      <div>
        <Image
          src={`/images/logo_white.png`}
          alt="bluerally"
          width={260}
          height={260}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-5 mt-auto">
        <Image
          src={`/images/kakao.svg`}
          alt="kakao login"
          width={460}
          height={54}
          priority
          onClick={() => {
            handleClickLoginButton('kakao');
          }}
          className="cursor-pointer"
        />
        <Image
          src={`/images/google.svg`}
          alt="google login"
          width={460}
          height={54}
          priority
          onClick={() => {
            handleClickLoginButton('google');
          }}
          className="cursor-pointer"
        />
        <Image
          src={`/images/naver.svg`}
          alt="naver login"
          width={460}
          height={54}
          priority
          onClick={() => {
            handleClickLoginButton('naver');
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
