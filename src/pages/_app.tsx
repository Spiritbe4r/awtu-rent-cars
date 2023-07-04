import 'semantic-ui-css/semantic.min.css'
import "@/scss/global.scss"
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BasketProvider, SearchProvider } from '@/contexts';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <ToastContainer />
      <BasketProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </BasketProvider>
    </AuthProvider>
  )
}
