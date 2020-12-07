import React from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from 'reactstrap';

import './styles.scss';
import { logout } from '../actions/auth';

const Header = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);
  const onClick = () => {
    setIsLoggedOut(true);
  };
  React.useEffect(() => {
    if (isLoggedOut) {
      dispatch(logout());
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    }
  }, [isLoggedOut]);
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
  const authLink = (
    <Nav className='ml-auto'>
      <NavItem>
        <NavLink href='/dashboard' className='text-color'>
          Welcome <strong className='text-capitalize'>{username}</strong>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          onClick={onClick}
          className='text-color cursor-pointer'
          id='logout'
        >
          Logout
        </NavLink>
      </NavItem>
    </Nav>
  );
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
