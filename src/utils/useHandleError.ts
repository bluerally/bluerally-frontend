import { AxiosError } from 'axios';
import { useNotification, useSnackbar } from 'bluerally-design-system'; // 또는 사용 중인 알림 라이브러리
import { useAuth } from '@/hooks/useAuth';
import router from 'next/router';

export const useHandleError = () => {
  const { logout } = useAuth();
  const snackbar = useSnackbar();

  const handleError = (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      snackbar.warning({
        content: `로그인을 다시 진행해주세요.`,
      });

      logout();
    } else {
      console.error(`Error: ${error.message}`);
    }
  };

  return { handleError };
};
