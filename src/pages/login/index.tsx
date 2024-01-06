import { Login } from '@/components/login/Login';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

LoginPage.getLayout = (page: ReactElement) => page;

export default LoginPage;
