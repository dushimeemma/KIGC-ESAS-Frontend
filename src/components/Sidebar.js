import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col,
  ListGroup,
  ListGroupItem,
  NavLink,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import AdminImage from '../assets/admin-image.svg';
import DropDown from '../assets/drop-down.svg';
import { logout } from '../actions/auth';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const onClick = () => {
    setIsLoggedOut(true);
  };
  useEffect(() => {
    if (isLoggedOut) {
      dispatch(logout());
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    }
  }, [isLoggedOut]);
  return (
    <Col md='3' className='back-color sidebar'>
      <ListGroup>
        <ListGroupItem className='back-color'>
          <NavLink href='/default-dashboard' className='back-color'>
            Dashboard
          </NavLink>
        </ListGroupItem>
        <ListGroupItem className='back-color'>
          <NavLink href='/roles' className='back-color'>
            Role
          </NavLink>
        </ListGroupItem>
        <ListGroupItem className='back-color'>
          <NavLink href='/students' className='back-color'>
            Student
          </NavLink>
        </ListGroupItem>
        <ListGroupItem className='back-color'>
          <NavLink href='/attendance' className='back-color'>
            Attendance
          </NavLink>
        </ListGroupItem>
        <ListGroupItem className='back-color'>
          <NavLink href='/finance' className='back-color'>
            Finance
          </NavLink>
        </ListGroupItem>
        <ListGroupItem className='back-color'>
          <NavLink href='/course' className='back-color'>
            Course
          </NavLink>
        </ListGroupItem>
        <ListGroupItem className='back-color'>
          <NavLink href='/room' className='back-color'>
            Room
          </NavLink>
        </ListGroupItem>
        {localStorage.getItem('username') == 'SUPER ADMIN' && (
          <ListGroupItem className='back-color'>
            <NavLink href='/dashboard' className='back-color'>
              Users
            </NavLink>
          </ListGroupItem>
        )}
        {/* <ListGroupItem className='back-color'>
          <NavLink href='/seat' className='back-color'>
            Seat
          </NavLink>
        </ListGroupItem> */}
      </ListGroup>
      <Row className='admin-panel'>
        <Col className='w-full bg-secondary admin-col'>
          <Row className='admin-w'>
            <Col md='3'>
              <img src={AdminImage} alt='admin image' className='admin-image' />
            </Col>
            <Col md='6'>
              <ul className='admin-list'>
                <li>Welcome, </li>
                <li>{localStorage.getItem('username')}</li>
              </ul>
            </Col>
            <Col md='3'>
              <ButtonDropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                className='w-25'
                size='sm'
              >
                <DropdownToggle>
                  <img src={DropDown} alt='logout' />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <a onClick={onClick}>Logout</a>
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Sidebar;
