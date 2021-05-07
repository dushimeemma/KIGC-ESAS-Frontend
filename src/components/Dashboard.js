import React from 'react';
import {
  Container,
  Row,
  Col,
  Table,
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
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getUsers } from '../actions/users';
import { getRoles, assignRole } from '../actions/roles';
import Popup from '../assets/popup.svg';

const Dashboard = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getRoles());
  }, []);

  const { users, isLoading } = useSelector((state) => state.users);
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
        {isLoading ? (
          <Container
            fluid
            className='d-flex justify-content-center align-items-center'
          >
            <Spinner type='grow' color='secondary' size='large' />
          </Container>
        ) : (
          <Container>
            {users.length ? (
              <>
                <h3 className='text-center'>All Users And Roles</h3>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.Role ? user.Role.name : 'No Role'}</td>
                        <td>
                          <Button
                            className='btn btn-sm m-1 btn-light'
                            onClick={toggle}
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
            ) : null}
          </Container>
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
