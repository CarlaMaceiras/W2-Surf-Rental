import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

   const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
      <Navbar color="white" light>
        <NavbarBrand href="/" className="w2">W² Surf Rental</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>

            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/beaches">Playas</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/sports">Material</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/users/signup">Registrarse</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/users/login">Entrar</NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
    </div>
       
    );
};

export default NavBar;