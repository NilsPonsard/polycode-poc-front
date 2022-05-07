import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material';
import { GeneralAppBar } from '../components/GeneralAppBar';
import { LoginContext, useLoginContext } from '../lib/LoginContext';
import UnverifiedEmail from '../components/UnverifedEmail';

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
  const loginContext = useLoginContext();

  return (
    <ThemeProvider theme={DOTheme}>
      <LoginContext.Provider value={loginContext}>
        <div className="root">
          {loginContext.user && !loginContext.user.emailVerified && (
            <UnverifiedEmail />
          )}
          <GeneralAppBar />
          <main>
            <Component {...pageProps} />
          </main>
          {/* <footer>footer</footer> */}
        </div>
      </LoginContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
