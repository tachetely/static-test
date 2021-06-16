import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';
import { useTranslation } from 'next-i18next';

function Index(props) {

  const { t } = useTranslation();  

  return (
    <Layout
      {...props}
    >
      <div className="media-container">
        {t("intro")}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default Index;