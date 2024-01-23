import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import requester from '@/utils/requester';
import axios from 'axios';
import { getDirectUrl } from '@/hooks/api/login';

const Login = () => {
  const getAuthRedirectUrl = async (platform: string) => {
    try {
      const data = await getDirectUrl(platform);
      console.log('data', data);
    } catch (error) {
      console.error('소셜 로그인 url 취득 실패', error);
    }

    // status === 200
    //   ? window.open(data.data.redirect_url, '_blank', 'noopener, noreferrer')
    //   : console.log('error!');
  };

  return (
    <div>
      <div>Login</div>

      <div>
        <button
          onClick={() => {
            getAuthRedirectUrl('google');
          }}
        >
          GoogleLogin
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            getAuthRedirectUrl('kakao');
          }}
        >
          KakaoTalkLogin
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            getAuthRedirectUrl('naver');
          }}
        >
          NaverLogin
        </button>
      </div>
    </div>
  );
};

export default Login;
