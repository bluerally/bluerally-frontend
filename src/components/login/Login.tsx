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
          src={`${IMAGE_URL}/logo_white.png`}
          alt="bluerally"
          width={260}
          height={260}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-5 mt-auto">
        <Image
          src={`${IMAGE_URL}/kakao_login.png`}
          alt="kakao login"
          width={260}
          height={45}
          priority
          onClick={() => {
            handleClickLoginButton('kakao');
          }}
          className="cursor-pointer"
        />
        <span className="font-normal text-g-200 text-basic-2">또는</span>
        <div className="flex items-center justify-center gap-5">
          <Image
            src={`${IMAGE_URL}/naver_login.png`}
            alt="naver login"
            width={48}
            height={48}
            priority
            onClick={() => {
              handleClickLoginButton('naver');
            }}
            className="cursor-pointer"
          />
          <Image
            src={`${IMAGE_URL}/google_login.png`}
            alt="google login"
            width={48}
            height={48}
            priority
            onClick={() => {
              handleClickLoginButton('google');
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
