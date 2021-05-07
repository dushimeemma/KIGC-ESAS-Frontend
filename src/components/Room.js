import React from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Alert,
  Input,
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getRooms, createRoom, assignRoom, clearRoom } from '../actions/room';
import { getCourses } from '../actions/course';
import roomValidations from '../validations/room';
import ClearButton from './common/ClearButton';
import Popup from '../assets/popup.svg';

const Room = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();

  const {
    rooms,
    msg: backMsg,
    assignedSuccess,
    createSuccess: checkSuccess,
    isLoading,
  } = useSelector((state) => state.rooms);

  // const rooms = useSelector((state) => state.rooms.rooms);
  // const backMsg = useSelector((state) => state.rooms.msg);
  // const assignedSuccess = useSelector((state) => state.rooms.assignedSuccess);
  const { courses } = useSelector((state) => state.course);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  // const checkSuccess = useSelector((state) => state.rooms.createSuccess);

  React.useEffect(() => {
    dispatch(getRooms());
  }, []);
  const [state, setState] = React.useState({
    name: '',
    capacity: 0,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAssignSubmit, setIsAssignSubmit] = React.useState(false);
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [assigned, setAssigned] = React.useState({
    room_id: '',
    course_id: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setErrors({ ...errors, [`${name}Errors`]: null });
  };

  const onAssignedChange = ({ target }) => {
    const { name, value } = target;
    setAssigned({ ...assigned, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(roomValidations(state));
    setIsSubmitting(true);
  };

  const onClear = () => {
    dispatch(clearRoom());
  };

  const onAssignedSubmit = (e) => {
    e.preventDefault();
    if (assigned.course_id && assigned.room_id) {
      setIsAssignSubmit(true);
      dispatch(assignRoom(assigned.room_id, assigned.course_id));
    }
  };

  React.useEffect(() => {
    setIsAssignSubmit(false);
  }, [assignedSuccess]);

  React.useEffect(() => {
    setBackErr(backErrors);
    setIsSubmitting(false);
    setIsAssignSubmit(false);
    setTimeout(() => {
      setBackErr('');
    }, 5000);
  }, [backErrors]);

  React.useEffect(() => {
    setMsg(backMsg);
    setIsSubmitting(false);
    setIsAssignSubmit(false);
    setTimeout(() => {
      setMsg('');
      dispatch(getRooms());
    }, 5000);
  }, [backMsg, dispatch]);

  React.useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setIsSubmitting(false);
    } else if (isSubmitting) {
      dispatch(createRoom(state));
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        // window.location.reload(false);
        dispatch(getRooms());
        setState({
          name: '',
          capacity: 0,
        });
      }, 6000);
    }
  }, [checkSuccess, dispatch]);

  const [modal, setModal] = React.useState(false);
  const [assignModal, setAssignModal] = React.useState(false);

  const toggle = () => setModal(!modal);
  const toggleAssign = () => {
    dispatch(getCourses());
    setAssignModal(!assignModal);
  };

  const onClickView = (id) => {
    props.history.push(`/room/${id}`);
  };

  const { name, capacity } = state;
  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='background'>
          Create Room
        </ModalHeader>
        {msg && (
          <Alert color='success' className='text-center'>
            {msg}
          </Alert>
        )}
        {backErr ? (
          <Alert color='danger' className='text-center'>
            {backErr}
          </Alert>
        ) : (
          ''
        )}
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <Row>
              <Col sm='8'>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type='text'
                    name='name'
                    onChange={onChange}
                    value={name}
                    className={
                      errors.nameErrors ? 'border-danger' : 'border-success'
                    }
                  />
                </FormGroup>
              </Col>
              <Col sm='4'>
                <FormGroup>
                  <Label>Capacity</Label>
                  <Input
                    type='number'
                    name='capacity'
                    onChange={onChange}
                    value={capacity}
                    className={
                      errors.capacityErrors ? 'border-danger' : 'border-success'
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className='background'>
            <Button className='btn btn-secondary'>
              {isSubmitting ? <Spinner color='light' size='sm' /> : 'Create'}
            </Button>
            <Button className='btn btn-danger' onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={assignModal} toggle={toggleAssign}>
        <ModalHeader toggle={toggleAssign} className='background'>
          Assign Room
        </ModalHeader>
        {msg && (
          <Alert color='success' className='text-center'>
            {msg}
          </Alert>
        )}
        {backErr ? (
          <Alert color='danger' className='text-center'>
            {backErr}
          </Alert>
        ) : (
          ''
        )}
        <Form onSubmit={onAssignedSubmit}>
          <ModalBody>
            <Row>
              <Col sm='6'>
                <FormGroup>
                  <Label>Select Room</Label>
                  <Input
                    type='select'
                    name='room_id'
                    onChange={onAssignedChange}
                    value={assigned.room_id}
                  >
                    <option>CHOOSE ROOM</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label>Select Course</Label>
                  <Input
                    type='select'
                    name='course_id'
                    onChange={onAssignedChange}
                    value={assigned.course_id}
                  >
                    <option>CHOOSE COURSE</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className='background'>
            <Button className='btn btn-secondary'>
              {isAssignSubmit ? <Spinner color='light' size='sm' /> : 'Assign'}
            </Button>
            <Button className='btn btn-danger' onClick={toggleAssign}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md='9'>
        <Row>
          <Col sm='6' md='4'>
            <Button className='btn btn-secondary ml-5 mr-5' onClick={toggle}>
              Create Room
            </Button>
          </Col>
          <Col sm='0' md='4'></Col>
          <Col sm='6' md='4'>
            <Button
              className='btn btn-secondary ml-5 mr-5'
              onClick={toggleAssign}
            >
              Assign Room
            </Button>
          </Col>
        </Row>
        {isLoading ? (
          <Container
            fluid
            className='d-flex justify-content-center align-items-center'
          >
            <Spinner type='grow' color='secondary' size='large' />
          </Container>
        ) : (
          <Container>
            {rooms.length ? (
              <>
                <h3 className='text-center center'>Rooms</h3>
                {/* {msg && checkDeleteSuccess && (
            <Alert color='success' className='text-center'>
              {msg}
            </Alert>
          )} */}
                {backErr ? (
                  <Alert color='danger' className='text-center'>
                    {backErr}
                  </Alert>
                ) : (
                  ''
                )}
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Capacity</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {rooms && (
                    <tbody>
                      {rooms.map((room, index) => (
                        <tr key={room.id}>
                          <td>{index + 1}</td>
                          <td>{room.name}</td>
                          <td>{room.capacity}</td>
                          <td>{room.status}</td>
                          <td>
                            <Button
                              className='btn btn-sm m-1 btn-light'
                              onClick={() => onClickView(room.id)}
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
                  )}
                </Table>
              </>
            ) : null}
          </Container>
        )}
      </Col>
      <ClearButton action={onClear} />
    </Row>
  );
};

export default Room;
