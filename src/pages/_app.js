// ** Global css styles
import "@/styles/globals.css";

// ** Utils Imports
import { createEmotionCache } from "../@core/utils/create-emotion-cache";
const clientSideEmotionCache = createEmotionCache();

// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";

// ** Loader Import
import NProgress from "nprogress";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";

// ** Config Imports
import themeConfig from "../configs/themeConfig";

// ** Third Party Import
import { Toaster } from "react-hot-toast";

// ** Component Imports
import UserLayout from "src/layouts/UserLayout";
import ThemeComponent from "../@core/theme/ThemeComponent";
// import AclGuard from '@/@core/components/auth/AclGuard'
import AuthGuard from "@/@core/components/auth/AuthGuard";
import GuestGuard from "@/@core/components/auth/GuestGuard";

// ** Spinner Import
import Spinner from "../@core/components/spinner";

// ** Contexts
import { AuthProvider } from "../context/AuthContext";
import { SettingsConsumer, SettingsProvider } from "../@core/context/settingsContext";

// ** Styled Components
import ReactHotToast from "../@core/styles/libs/react-hot-toast";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";
import "../iconify-bundle/icons-bundle-react";

// ** Redux
import { Provider } from "react-redux";
import store from "../store/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    // Si guestGuard es verdadero, renderiza el contenido dentro de GuestGuard
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else {
    // Si solo se especifica authGuard, renderiza el contenido dentro de AuthGuard
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

// ** Configure JSS & ClassName
const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);
  const setConfig = Component.setConfig ?? undefined;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Portal del Empleado - HR One Click</title>
          <meta
            name="description"
            content="Portal del Empleado – Web portal – implementado para la gestion de RR.HH."
          />
          {/* <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' /> */}
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeComponent settings={settings}>
                  <Guard authGuard={true} guestGuard={false}>
                    {getLayout(<Component {...pageProps} />)}
                  </Guard>
                  <ReactHotToast>
                    <Toaster position={settings.toastPosition} toastOptions={{ className: "react-hot-toast" }} />
                    <ToastContainer />
                  </ReactHotToast>
                </ThemeComponent>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
