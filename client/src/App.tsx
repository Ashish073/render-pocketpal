import RootLayout from "./layout/RootLayout";
import RootRouter from "./routes/RootRouter";
import { BrowserRouter } from "react-router-dom";
import Snackbar from './components/Snackbar/Snackbar';
import ToastProvider from './context/ToastContext';
import { ReduxProvider } from './redux/Provider';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from "framer-motion"
import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-select-search/style.css'

function App() {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <HelmetProvider>
          <ThemeProvider>
            <ReduxProvider>
              <BrowserRouter>
                <ToastProvider>
                  <Snackbar />
                  <RootLayout>
                    <RootRouter />
                  </RootLayout>
                </ToastProvider>
              </BrowserRouter>
            </ReduxProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LazyMotion>
    </>
  )
}

export default App
