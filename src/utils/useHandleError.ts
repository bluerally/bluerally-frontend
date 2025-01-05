import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from 'axios';
import { useSnackbar } from 'buooy-design-system';

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
