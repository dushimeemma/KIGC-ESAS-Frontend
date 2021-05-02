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

import Popup from '../assets/popup.svg';
import Sidebar from './Sidebar';
import { getStudents } from '../actions/students';
import { createCourse, getCourses, clearCourses } from '../actions/course';
import validations from '../validations/course';
import ClearButton from './common/ClearButton';

const Course = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const { createSuccess, msg, courses } = useSelector((state) => state.course);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [backErr, setBackErr] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState({
    name: '',
    start_date: '',
    end_date: '',
    session: '',
  });

  const toggle = () => setModal(!modal);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setErrors({ ...errors, [`${name}Errors`]: null });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validations(state));
    setIsSubmitting(true);
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudents());
  }, []);

  React.useEffect(() => {
    setBackErr(backErrors);
    setIsSubmitting(false);
    setTimeout(() => {
      setBackErr('');
    }, 5000);
  }, [backErrors]);

  React.useEffect(() => {
    setMessage(msg);
    setIsSubmitting(false);
    setTimeout(() => {
      setMessage('');
      dispatch(getCourses());
    }, 5000);
  }, [msg, dispatch]);

  React.useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setIsSubmitting(false);
    } else if (isSubmitting) {
      dispatch(createCourse(state));
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    if (createSuccess) {
      setTimeout(() => {
        dispatch(getCourses());
        setState({
          name: '',
          start_date: '',
          end_date: '',
          session: '',
        });
      }, 6000);
    }
  }, [createSuccess, dispatch]);
  const students = useSelector((state) => state.students.students);
  const onClickView = (id) => {
    props.history.push(`/course/record/${id}`);
  };

  const onClear = () => {
    dispatch(clearCourses());
  };
  const { name, start_date, end_date, session } = state;
  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='background'>
          Create Course
        </ModalHeader>
        {message && (
          <Alert color='success' className='text-center'>
            {msg}
          </Alert>
        )}
        {backErr && (
          <Alert color='danger' className='text-center'>
            {backErr}
          </Alert>
        )}
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <Row>
              <Col sm='12'>
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
              <Col sm='12'>
                <FormGroup>
                  <Label>Session</Label>
                  <Input
                    type='select'
                    name='session'
                    onChange={onChange}
                    value={session}
                    className={
                      errors.sessionErrors ? 'border-danger' : 'border-success'
                    }
                  >
                    <option>Day</option>
                    <option>Night</option>
                    <option>Week end</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label>Start date</Label>
                  <Input
                    type='date'
                    name='start_date'
                    id='exampleDate'
                    placeholder='Starting date'
                    onChange={onChange}
                    value={start_date}
                    className={
                      errors.start_dateErrors
                        ? 'border-danger'
                        : 'border-success'
                    }
                  />
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label>End date</Label>
                  <Input
                    type='date'
                    name='end_date'
                    id='exampleDate'
                    placeholder='End date'
                    onChange={onChange}
                    value={end_date}
                    className={
                      errors.end_dateErrors ? 'border-danger' : 'border-success'
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
      <Sidebar />
      <Col md='9'>
        <Row>
          <Col md='3'>
            <Button className='btn btn-secondary ml-5 mr-5' onClick={toggle}>
              Create Course
            </Button>
          </Col>
          <Col md='9'></Col>
        </Row>
        <Container>
          <h3 className='text-center'>All courses</h3>
        </Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Course Session</th>
              <th>Starting Date</th>
              <th>Ending Date</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.session || 'N/A'}</td>
                <td>{course.start_date || 'N/A'}</td>
                <td>{course.end_date || 'N/A'}</td>
                <td>
                  <Button
                    className='btn btn-sm m-1 btn-light'
                    onClick={() => onClickView(course.id)}
                  >
                    <img src={Popup} alt='assign couse' className='h-25 w-25' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <ClearButton action={onClear} />
    </Row>
  );
};

export default Course;
