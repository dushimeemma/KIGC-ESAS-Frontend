import React from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Table,
  Spinner,
  Alert,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from './Sidebar';
import Popup from '../assets/popup.svg';
import { getSingleRoom, deleteRoom } from '../actions/room';
import { getStudentsPerRoom } from '../actions/students';

const SingleRoom = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }

  const { room, isLoading, msg } = useSelector((state) => state.rooms);
  const { students, isSearchingStudents } = useSelector(
    (state) => state.students
  );

  const [isDeletingRoom, setIsDeletingRoom] = React.useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSingleRoom(props.match.params.slug));

    dispatch(getStudentsPerRoom(props.match.params.slug));
  }, []);

  const redirect = (id) => {
    props.history.push(`/student/${id}`);
  };

  const handleDeleteRoom = (id) => {
    setIsDeletingRoom(true);
    setTimeout(() => {
      dispatch(deleteRoom(id));
      props.history.push('/room');
    }, 1000);
  };

  return (
    <Row className='main-height'>
      <Sidebar />
      {isDeletingRoom ? (
        <Col md='9'>
          <Container
            fluid
            className='d-flex justify-content-center align-items-center'
          >
            <Alert color='success'>{msg}</Alert>
          </Container>
        </Col>
      ) : (
        <Col md='9'>
          {isLoading ? (
            <Container
              fluid
              className='d-flex justify-content-center align-items-center'
            >
              <Spinner type='grow' color='secondary' size='large' />
            </Container>
          ) : (
            <Container fluid>
              <Row>
                <Col sm='12' md='9'>
                  <Card body outline color='success'>
                    <CardHeader tag='h3'>{room.name}</CardHeader>
                    <CardBody>
                      <CardTitle className='center' tag='h5'>
                        Welcome to this Room
                      </CardTitle>
                      <CardText>
                        <Row>
                          <Col md='12' lg='6'>
                            <p>
                              <b>Name:</b> {room.name}
                            </p>
                            <p>
                              <b>Remaining Capacity:</b> {room.capacity} Seats
                            </p>
                          </Col>
                          <Col md='12' lg='6'>
                            <p>
                              <b>Assigned on</b> : {students.length} Students
                            </p>
                          </Col>
                        </Row>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm='12' md='3'>
                  <Button
                    className='btn btn-danger ml-5 mr-5'
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    {isDeletingRoom ? (
                      <Spinner color='light' size='sm' />
                    ) : (
                      <i className='fas fa-trash-alt'></i>
                    )}
                  </Button>
                </Col>
              </Row>
              {students.length && (
                <>
                  <h3 className='text-center'>Assigned Students</h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>RegNo</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Level</th>
                        <th>More</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.regNo}</td>
                          <td>{student.name}</td>
                          <td>{student.department}</td>
                          <td>{student.level}</td>
                          <td>
                            <Button
                              className='btn btn-sm m-1 btn-light'
                              onClick={() => redirect(student.id)}
                            >
                              <img
                                src={Popup}
                                alt='popup'
                                className='w-25 h-25'
                              />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </Container>
          )}
        </Col>
      )}
    </Row>
  );
};

export default SingleRoom;
