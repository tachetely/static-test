import { appWithTranslation } from 'next-i18next';
import "../components/global.css";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);