import React from 'react';
import { useGetRedirectionUrl } from '@/hooks/api/auth';
import Image from 'next/image';
import kakao_login from 'public/images/kakao_login.png';
import naver_login from 'public/images/naver_login.png';
import google_login from 'public/images/google_login.png';
import logo_white from 'public/images/logo_white.png';

export const Login = () => {
  const { mutate: getAuthRedirectUrl } = useGetRedirectionUrl();

  const handleClickLoginButton = (platform: 'google' | 'kakao' | 'naver') => {
    getAuthRedirectUrl({ platform });
  };

  return (
    <div className="px-[65px] py-[80px] flex flex-col items-center w-full h-full bg-center bg-cover login-background">
      <div>
        <Image
          src={logo_white}
          alt="bluerally"
          width={260}
          height={260}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-5 mt-auto">
        <Image
          src={kakao_login}
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
            src={naver_login}
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
            src={google_login}
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
