import Head from 'next/head';

export const HeadTitle = ({ title }: { title?: string }) => {
  return (
    <Head>{title ? <title>{title} | Buooy</title> : <title>Buooy</title>}</Head>
  );
};
