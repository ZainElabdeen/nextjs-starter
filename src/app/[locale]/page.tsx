import CssBaseline from '@mui/material/CssBaseline';

import TranslationsProvider from '@/providers/TranslationsProvider';
import ThemeRegistry from '@/themes/ThemeRegistry';
import initTranslations from '../i18n';
import DashboardHeader from './components/DashboardHeader';
import MessageProvider from '@/providers/MessageProvider';
import ToastHandler from '@/components/toast/ToastHandler';

interface HomeProps {
  params: {
    locale: string;
  };
}
const namespaces = ['home', 'common']; // the first elment will be the default name space

export default async function Home({ params: { locale } }: HomeProps) {
  const { t, resources } = await initTranslations({
    locale,
    namespaces,
  });

  return (
    <TranslationsProvider
      namespaces={namespaces}
      locale={locale}
      resources={resources}
    >
      <ThemeRegistry>
        <MessageProvider>
          <CssBaseline />
          <DashboardHeader />
          <ToastHandler />
        </MessageProvider>
      </ThemeRegistry>
    </TranslationsProvider>
  );
}
