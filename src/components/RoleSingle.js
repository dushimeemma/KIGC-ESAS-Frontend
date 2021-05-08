import React from 'react';
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
  Alert,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getRole, updateRole } from '../actions/roles';

const RoleSingle = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getRole(props.match.params.slug));
  }, []);
  const role = useSelector((state) => state.roles.role);
  const backMsg = useSelector((state) => state.roles.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.roles.updateSuccess);
  const [state, setState] = React.useState({
    id: '',
    name: '',
    description: '',
  });
  const [modal, setModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
  React.useEffect(() => {
    if (Object.keys(role).length !== 0) {
      setState({
        id: role.id,
        name: role.name,
        description: role.description,
      });
    }
  }, [role]);

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const { id, name, description } = state;

  React.useEffect(() => {
    if (isSubmitting) {
      dispatch(updateRole(state, id));
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        window.location.reload(false);
      }, 6000);
    }
  }, [checkSuccess]);

  const toggle = () => setModal(!modal);
  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='back-color'>
          Update Role
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
            <Button color='secondary'>Update</Button>
            <Button color='danger' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md='9'>
        <Container>
          <h3 className='text-center'>Single Role</h3>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <Button className='btn btn-light btn-sm m-1' onClick={toggle}>
                    <i className='fas fa-edit'></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </Col>
    </Row>
  );
};

export default RoleSingle;
