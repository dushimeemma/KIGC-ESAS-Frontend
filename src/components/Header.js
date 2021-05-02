import React from 'react';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from 'reactstrap';

import './styles.scss';

const Header = () => {
  const username = localStorage.getItem('username');
  const guestLink = (
    <Nav className='ml-auto'>
      <NavItem>
        <NavLink href='/login' className='text-color'>
          Login
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/register' className='text-color'>
          Register
        </NavLink>
      </NavItem>
    </Nav>
  );
  const authLink = <Nav className='ml-auto' />;
  return (
    <Navbar className='back-color mb-2'>
      <NavbarBrand href='/' className='text-color'>
        KIGC | ESAS
      </NavbarBrand>
      {username ? authLink : guestLink}
    </Navbar>
  );
};

export default Header;
