import React from 'react';
import { Col, ListGroup, ListGroupItem, NavLink } from 'reactstrap';

const Sidebar = () => {
  return (
    <Col md='3' className='back-color'>
      <ListGroup>
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
          <NavLink href='/seat' className='back-color'>
            Seat
          </NavLink>
        </ListGroupItem>
      </ListGroup>
    </Col>
  );
};

export default Sidebar;
