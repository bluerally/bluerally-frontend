import { useRouter } from 'next/router';

export const useNavigate = () => {
  const router = useRouter();

  const pushToRoute = (pathname: string) => {
    router.push({
      pathname,
    });
  };

  return {
    pushToRoute,
  };
};
