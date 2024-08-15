import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { ConfigProvider } from '@/UI';
import theme from '@/configs/antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'antd/dist/reset.css';
import '@/styles/globals.scss';
import ErrorBoundary from '@/components/ErrorBoundary';
import Head from 'next/head';
import vn from 'antd/locale/vi_VN';
import Author from '@/components/auth/Author';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Giao Hàng Tiết Kiệm</title>
      </Head>
      <ConfigProvider theme={theme} locale={vn}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <Author>{getLayout(<Component {...pageProps} />)}</Author>
          </ErrorBoundary>
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}
