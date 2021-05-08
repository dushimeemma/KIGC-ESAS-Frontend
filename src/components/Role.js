import React from 'react';
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getRoles, deleteRole, createRole, getRole } from '../actions/roles';

const Role = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getRoles());
  }, []);

  const {
    roles,
    deleteSuccess,
    msg: backMsg,
    createSuccess: checkSuccess,
    isLoading,
  } = useSelector((state) => state.roles);

  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );

  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState({
    name: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setBackErr(backErrors);
    setTimeout(() => {
      setBackErr('');
    }, 5000);
  }, [backErrors]);

  React.useEffect(() => {
    setMsg(backMsg);
    setTimeout(() => {
      setMsg('');
    }, 5000);
  }, [backMsg]);

  const onClickDelete = (id) => {
    dispatch(deleteRole(id));
  };

  const onClickView = (id) => {
    props.history.push(`/role/${id}`);
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (deleteSuccess) {
        window.location.reload(false);
      }
    }, 6000);
  }, [deleteSuccess]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (isSubmitting) {
      dispatch(createRole(state));
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    setTimeout(() => {
      if (checkSuccess) {
        window.location.reload(false);
      }
    }, 6000);
  }, [checkSuccess]);

  const toggle = () => setModal(!modal);

  const { name, description } = state;

  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='back-color'>
          Create New Role
        </ModalHeader>
        {msg ? (
          <Alert color='success' className='text-center'>
            {msg}
          </Alert>
        ) : (
          ''
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
            <FormGroup>
              <Label>Name</Label>
              <Input type='text' name='name' onChange={onChange} value={name} />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type='text'
                name='description'
                onChange={onChange}
                value={description}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className='back-color'>
            <Button color='secondary'>Create</Button>
            <Button color='danger' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Sidebar />

      <Col md='9'>
        <Button className='btn btn-secondary ml-5 mr-5' onClick={toggle}>
          Create Role
        </Button>
        {isLoading ? (
          <Container
            fluid
            className='d-flex justify-content-center align-items-center'
          >
            <Spinner type='grow' color='secondary' size='large' />
          </Container>
        ) : (
          <Container>
            <h3 className='text-center'>All Roles</h3>
            {msg ? (
              <Alert color='success' className='text-center'>
                {msg}
              </Alert>
            ) : (
              ''
            )}
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
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      <Button
                        className='btn btn-light btn-sm m-1'
                        onClick={() => onClickView(role.id)}
                      >
                        <i className='fas fa-eye'></i>
                      </Button>
                      <Button
                        className='btn btn-light btn-sm m-1'
                        onClick={() => onClickDelete(role.id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        )}
      </Col>
    </Row>
  );
};

export default Role;
