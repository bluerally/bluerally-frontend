import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePostAuthToken } from '@/hooks/api/auth';

const Auth = () => {
  const router = useRouter();
  const { mutate: postAuthToken } = usePostAuthToken();
  const uid = router.query.uid;

  const setAuth = () => {
    postAuthToken({ user_uid: String(uid) });
  };

  useEffect(() => {
    if (!uid) {
      return;
    }

    setAuth();
  }, [uid]);

  return <></>;
};

export default Auth;
