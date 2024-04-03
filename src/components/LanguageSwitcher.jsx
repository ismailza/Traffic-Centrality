import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { Globe } from 'react-bootstrap-icons';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const getCurrentLangFullName = () => {
    switch (i18n.language) {
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      default:
        return 'Language';
    }
  };

  return (
    <Dropdown align="end" className="language-switcher">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic" className="d-flex align-items-center" style={{ fontSize: '0.875rem' }}>
        <Globe className="me-2" style={{ fontSize: '1.2rem' }} />{getCurrentLangFullName()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={() => changeLanguage('en')}>English</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => changeLanguage('fr')}>Français</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
