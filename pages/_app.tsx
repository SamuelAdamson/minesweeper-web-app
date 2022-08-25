import '../styles/globals.css'
import '../styles/bootstrap/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import { Layout } from '../src'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
