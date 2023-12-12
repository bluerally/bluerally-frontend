import '@/styles/globals.css';
import { NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useRef } from 'react';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = {
  err?: NextPageContext['err'];
} & AppProps<{
  dehydratedState?: DehydratedState;
}> & {
    Component: NextPageWithLayout;
  };

function BlueRallyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { dehydratedState, ...rest } = pageProps;
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: (count, error: any) => {
            if (count > 0 || error?.response?.status !== 401) {
              return false;
            }

            return true;
          },
          retryDelay: 1000,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          cacheTime: 0,
        },
      },
    });
  }

  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={dehydratedState}>
        {getLayout(<Component {...rest} />)}
      </Hydrate>
    </QueryClientProvider>
  );
}

export default BlueRallyApp;
