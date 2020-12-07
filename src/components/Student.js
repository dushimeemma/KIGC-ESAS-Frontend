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
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import {
  getStudents,
  createStudent,
  deleteStudent,
  getStudentsPerDept,
} from '../actions/students';

const Student = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const backMsg = useSelector((state) => state.students.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.students.createSuccess);
  const checkDeleteSuccess = useSelector(
    (state) => state.students.deleteSuccess
  );
  React.useEffect(() => {
    dispatch(getStudents());
  }, []);
  const [state, setState] = React.useState({
    regNo: '',
    name: '',
    department: '',
    level: '',
  });
  const [dept, setDept] = React.useState({
    department: '',
    level: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCheckingDept, setIsCheckingDept] = React.useState(false);
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onChangeDept = (e) => {
    const { name, value } = e.target;
    setDept({ ...dept, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const onSUbmitDept = (e) => {
    e.preventDefault();
    setIsCheckingDept(true);
  };

  React.useEffect(() => {
    if (isCheckingDept) {
      dispatch(getStudentsPerDept(dept));
    }
  }, [isCheckingDept]);

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

  React.useEffect(() => {
    if (isSubmitting) {
      dispatch(createStudent(state));
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        window.location.reload(false);
      }, 6000);
    }
  }, [checkSuccess]);

  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  const onClickView = (id) => {
    props.history.push(`/student/${id}`);
  };

  const onClickDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  React.useEffect(() => {
    if (checkDeleteSuccess) {
      setTimeout(() => {
        window.location.reload(false);
      }, 6000);
    }
  }, [checkDeleteSuccess]);

  const { regNo, name, department, level } = state;
  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='background'>
          Create Student
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
              <Label>Reg No</Label>
              <Input
                type='text'
                name='regNo'
                onChange={onChange}
                value={regNo}
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input type='text' name='name' onChange={onChange} value={name} />
            </FormGroup>
            <FormGroup>
              <Label>Department</Label>
              <Input
                type='text'
                name='department'
                onChange={onChange}
                value={department}
              />
            </FormGroup>
            <FormGroup>
              <Label>Level</Label>
              <Input
                type='text'
                name='level'
                onChange={onChange}
                value={level}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className='background'>
            <Button className='btn btn-secondary'>Create</Button>
            <Button className='btn btn-danger' onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md='9'>
        <Row>
          <Col md='3'>
            <Button className='btn btn-secondary ml-5 mr-5' onClick={toggle}>
              Create Student
            </Button>
          </Col>
          <Col md='9'>
            <Form inline onSubmit={onSUbmitDept}>
              <Input
                type='select'
                name='department'
                placeholder='department'
                className='m-1'
                onChange={onChangeDept}
              >
                <option>CHOOSE DEPTERTMENT</option>
                <option value='BCS'>BCS</option>
                <option value='BIT'>BIT</option>
                <option value='BBIT'>BBIT</option>
              </Input>
              <Input
                type='select'
                name='level'
                placeholder='level'
                className='m-1'
                onChange={onChangeDept}
              >
                <option>CHOOSE LEVEL</option>
                <option value='1'>ONE</option>
                <option value='2'>TWO</option>
                <option value='3'>THREE</option>
              </Input>
              <Button className='btn btn-secondary m-1'>VIEW</Button>
            </Form>
          </Col>
        </Row>
        <Container>
          <h3 className='text-center'>All Students</h3>
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
                <th>RegNo.</th>
                <th>Name</th>
                <th>Department</th>
                <th>Level</th>
                <th>Action</th>
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
                      className='btn btn-sm m-1'
                      onClick={() => onClickView(student.id)}
                    >
                      <i className='fas fa-eye'></i>
                    </Button>
                    <Button
                      className='btn btn-sm m-1'
                      onClick={() => onClickDelete(student.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Col>
    </Row>
  );
};

export default Student;
