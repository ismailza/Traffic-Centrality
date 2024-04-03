import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import LanguageSwitcher from './LanguageSwitcher';
import brandLogo from '../assets/Kolmogorov.png';
import { useTranslation } from 'react-i18next';

const NavBar = () => {

  const { t } = useTranslation();

  const navLinks = t("navLinks", { returnObjects: true });

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="custom-navbar"
    >
      <Container>
        <Navbar.Brand href='/'>
          <img
            src={brandLogo}
            width="60"
            height="60"
            alt="Kolmogorov logo"
          />
          &nbsp; Kolmogorov
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className="nav-link"
              >
                {link.label}
              </NavLink>
            ))}
          </Nav>
          <Nav className='d-flex justify-content-center align-items-center'>
            <LanguageSwitcher />
            <Nav.Link href="https://github.com/ismailza/Traffic-Centrality.git" target='_blank' aria-label="GitHub">
              <FaGithub className="icon" size={24} color="#000" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
