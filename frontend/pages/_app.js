import "./globals.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  console.log('page props', pageProps)
  return getLayout(<Component {...pageProps} />)
}