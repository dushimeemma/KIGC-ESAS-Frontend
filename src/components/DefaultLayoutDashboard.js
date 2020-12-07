import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Card from './Card';
import { getUsers } from '../actions/users';
import { getRoles, assignRole } from '../actions/roles';

const DefaultDashboard = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUsers());
  }, []);
  React.useEffect(() => {
    dispatch(getRoles());
  }, []);
  const users = useSelector((state) => state.users.users);
  const roles = useSelector((state) => state.roles.roles);
  const msg = useSelector((state) => state.roles.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.roles.assignSuccess);
  const [backErrs, setBackErrs] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState({
    role: '',
    email: '',
  });
  const [isSubmitting, setIsSubmmitting] = React.useState(false);
  const [backMsg, setBackMsg] = React.useState('');
  React.useEffect(() => {
    setBackErrs(backErrors);
    setTimeout(() => {
      setBackErrs('');
    }, 5000);
  }, [backErrors]);
  React.useEffect(() => {
    setBackMsg(msg);
    setTimeout(() => {
      setBackMsg('');
    }, 5000);
  }, [msg]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmmitting(true);
  };
  React.useEffect(() => {
    if (isSubmitting) {
      dispatch(assignRole(state));
      setTimeout(() => {
        window.location.reload(false);
      }, 5000);
    }
  }, [isSubmitting]);
  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        window.location.reload(false);
      }, 5000);
    }
  }, [checkSuccess]);

  const toggle = () => setModal(!modal);

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

  const HandleClickSeats = () => {
    setTimeout(() => {
      props.history.push('/seat');
      window.location.reload(false);
    }, 3000);
  };

  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='back-color'>
          Assign Role
        </ModalHeader>
        {backMsg ? (
          <Alert color='success' className='text-center'>
            {backMsg}
          </Alert>
        ) : (
          ''
        )}
        {backErrs ? (
          <Alert color='danger' className='text-center'>
            {backErrs}
          </Alert>
        ) : (
          ''
        )}
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Role</Label>
              <Input type='select' name='role' onChange={onChange}>
                <option value=''>Select Role</option>
                {roles.map((role) => (
                  <option value={role.name} key={role.id}>
                    {role.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type='select' name='email' onChange={onChange}>
                <option value=''>Select User Email</option>
                {users.map((user) => (
                  <option value={user.email} key={user.id}>
                    {user.email}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter className='back-color'>
            <Button color='secondary'>Assign</Button>
            <Button color='danger' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md='9'>
        <Container>
          <h3 className='text-center'>Welcome, {username}</h3>
          <h6 className='text-capitalize text-center'>
            What do you want to do?
          </h6>
          <Container>
            <Row>
              <Card count={2} text='Users' onClick={HandleClickUsers} />
              <Card count={4} text='Students' onClick={HandleClickStudents} />
              <Card count={4} text='Seats' onClick={HandleClickSeats} />
            </Row>
          </Container>
        </Container>
      </Col>
    </Row>
  );
};

export default DefaultDashboard;
