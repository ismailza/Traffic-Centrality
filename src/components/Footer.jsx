import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t } = useTranslation();

  return (
    <footer className="footer text-center text-lg-start mt-5" style={{ width: '100%' }}>
      <div className="text-center p-3">
        {t('footerText')}
      </div>
    </footer>
  );
}

export default Footer