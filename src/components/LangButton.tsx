'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

// import { Black } from '@/themes/colors';
import i18nConfig from '@/i18nConfig';

const LangButton = () => {
  const [language, setLanguage] = useState<string>(''); // Initialize with an empty string
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const currentPathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const initialLanguage = Cookies.get('NEXT_LOCALE') ?? 'ar';
    setLanguage(initialLanguage); // Set the language from cookies or default
    i18n.changeLanguage(initialLanguage);
    document.body.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n]);

  useEffect(() => {
    if (language) {
      Cookies.set('NEXT_LOCALE', language, { expires: 30, path: '/' });
    }
  }, [language]);

  const handleChange = () => {
    const newLocale = language === 'en' ? 'ar' : 'en';
    setLanguage(newLocale);
    i18n.changeLanguage(newLocale);
    document.body.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 30, path: '/' });

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !(i18nConfig as any).prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <Button
      variant='text'
      onClick={handleChange}
      sx={{ color: 'black', height: '40px', ml: 1, mr: 1 }}
      size='small'
    >
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LangButton;
