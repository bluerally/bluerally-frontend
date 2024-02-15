import React from 'react';
import { LoginApi } from '@/hooks/api/login';
import { useQueryClient } from '@tanstack/react-query';

const Login = () => {
  const queryClient = useQueryClient();

  const handleAuthRedirect = async (platform: string) => {
    try {
      // 쿼리 수동 실행
      const { data, status } = await queryClient.fetchQuery(
        ['redirect-url', platform],
        () => LoginApi.getDirectUrl(platform),
      );

      // 결과 활용
      const url = data.redirect_url;
      if (status == 200) {
        window.open(url, '_blank', 'noopener, noreferrer');
      } else {
        console.log('URL 취득 실패', status);
      }
    } catch (error) {
      console.error('소셜 로그인 URL 취득 실패:', error);
    }
  };

  return (
    <div>
      <div>Login</div>

      <div>
        <button
          onClick={() => {
            handleAuthRedirect('google');
          }}
        >
          GoogleLogin
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleAuthRedirect('kakao');
          }}
        >
          KakaoTalkLogin
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleAuthRedirect('naver');
          }}
        >
          NaverLogin
        </button>
      </div>
    </div>
  );
};

export default Login;
