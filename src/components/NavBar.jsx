import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaGithub } from "react-icons/fa";

const NavBar = () => {
  return (
    <Navbar 
      collapseOnSelect 
      expand="lg" 
      className="navbar w-100"
    >
      <Container>
        <Navbar.Brand href='/'>
          <img
            src="/kolmogorov.png"
            width="60"
            height="60"
            alt="React Bootstrap logo"
          />
          &nbsp; Kolmogorov</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='about'>About us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://github.com/ismailza/Centrality.git" target='blank'><FaGithub className="icon" size={24} color="black"/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar