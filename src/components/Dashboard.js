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
import { Formik } from 'formik';

import { validationSchema } from '../validations/role';
import Sidebar from './Sidebar';
import { getUsers, getUser } from '../actions/users';
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

  const { users, isLoading, user } = useSelector((state) => state.users);
  const { roles, assignSuccess: checkSuccess, msg } = useSelector(
    (state) => state.roles
  );

  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );

  const [backErrs, setBackErrs] = React.useState('');
  const [modal, setModal] = React.useState(false);

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

  const toggle = (id) => {
    dispatch(getUser(id));
    setModal(!modal);
  };

  const handleAssignRole = (values) => {
    setIsSubmmitting(true);
    dispatch(assignRole(values));
  };

  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        setIsSubmmitting(false);
        window.location.reload(false);
      }, 5000);
    }
  }, [checkSuccess]);

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
        {Object.keys(user).length ? (
          <Formik
            initialValues={{ role: '', email: user.email }}
            onSubmit={handleAssignRole}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <Label>Role</Label>
                    <Input
                      type='select'
                      name='role'
                      onChange={handleChange('role')}
                      onBlur={handleBlur('role')}
                      value={values.role}
                    >
                      <option value=''>Select Role</option>
                      {roles.map((role) => (
                        <option value={role.name} key={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Input>
                    {touched.role && errors.role && (
                      <p className='text-danger'>{errors.role}</p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type='text'
                      name='email'
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <p className='text-danger'>{errors.email}</p>
                    )}
                  </FormGroup>
                </ModalBody>
                <ModalFooter className='back-color'>
                  <Button color='secondary'>
                    {isSubmitting ? (
                      <Spinner color='light' size='sm' />
                    ) : (
                      ' Assign'
                    )}
                  </Button>
                  <Button color='danger' onClick={() => setModal(!modal)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        ) : null}
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
                            onClick={() => toggle(user.id)}
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
