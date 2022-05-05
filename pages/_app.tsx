import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material';
import { GeneralAppBar } from '../components/GeneralAppBar';

const DOTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#821980',
    },
    secondary: {
      main: '#EDAE49',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={DOTheme}>
      <div className="root">
        <GeneralAppBar />
        <main>
          <Component {...pageProps} />
        </main>
        {/* <footer>footer</footer> */}
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
