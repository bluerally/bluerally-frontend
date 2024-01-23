import React from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useGetToken } from '@/hooks/api/login';

const Auth = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { data } = useGetToken({ user_uid: uid });
  console.log('data', data);

  return (
    <div>
      <div>auth</div>
    </div>
  );
};

export default Auth;
