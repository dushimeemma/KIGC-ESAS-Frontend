import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Card from './Card';
import {
  getCountStudents,
  getCountRooms,
  getCountCourses,
} from '../actions/count';

const DefaultDashboard = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCountStudents());
    dispatch(getCountRooms());
    dispatch(getCountCourses());
  }, []);
  const {
    numberOfStudents,
    numberOfRooms,
    numberOfCourses,
    isLoading,
  } = useSelector((state) => state.count);

  const HandleClickUsers = () => {
    setTimeout(() => {
      props.history.push('/dashboard');
      window.location.reload(false);
    }, 3000);
  };

  const HandleClickStudents = () => {
    setTimeout(() => {
      props.history.push('/students');
      window.location.reload(false);
    }, 3000);
  };

  const HandleClickRooms = () => {
    setTimeout(() => {
      props.history.push('/room');
      window.location.reload(false);
    }, 3000);
  };

  return (
    <Row className='main-height'>
      <Sidebar />
      <Col md='9'>
        <Container>
          <h3 className='text-center'>Welcome, {username}</h3>
          <h6 className='text-capitalize text-center'>
            What do you want to do?
          </h6>
          <Container>
            <Row>
              <Card
                isLoading={isLoading}
                count={numberOfCourses}
                text='Courses'
                onClick={HandleClickUsers}
              />
              <Card
                isLoading={isLoading}
                count={numberOfStudents}
                text='Students'
                onClick={HandleClickStudents}
              />
              <Card
                isLoading={isLoading}
                count={numberOfRooms}
                text='Rooms'
                onClick={HandleClickRooms}
              />
            </Row>
          </Container>
        </Container>
      </Col>
    </Row>
  );
};

export default DefaultDashboard;
