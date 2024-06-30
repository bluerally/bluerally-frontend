import React, { useEffect, useState } from 'react';
import { useGetRedirectionUrl } from '@/hooks/api/auth';
import Image from 'next/image';

const Login = () => {
  const { mutate: getAuthRedirectUrl } = useGetRedirectionUrl();

  const handleClickLoginButton = (platform: 'google' | 'kakao' | 'naver') => {
    getAuthRedirectUrl({ platform: platform });
  };

  return (
    <div className="login-background login-wrapper ">
      <div className="login-button-wrapper fixed bottom-40 ">
        <Image
          src={`/images/kakao_login_logo.png`}
          alt="google_login_logo"
          width={260}
          height={45}
          onClick={() => {
            handleClickLoginButton('kakao');
          }}
        />
        <div className="center font-description pt-4 pb-4">또는</div>
        <div className="flex center gap-4">
          <Image
            src={`/images/naver_login_logo.png`}
            alt="google_login_logo"
            width={48}
            height={48}
            onClick={() => {
              handleClickLoginButton('naver');
            }}
          />
          <Image
            src={`/images/google_login_logo.png`}
            alt="google_login_logo"
            width={48}
            height={48}
            onClick={() => {
              handleClickLoginButton('google');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
