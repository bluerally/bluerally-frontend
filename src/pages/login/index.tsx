import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';
import { Login } from '@/components/login/Login';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

export default LoginPage;
