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
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Sidebar from './Sidebar';
import Popup from '../assets/popup.svg';
import { getStudents } from '../actions/students';
import {
  getCourse,
  assignCourse,
  assignedStudents,
  assignCourseToClass,
} from '../actions/course';
// import { assignCourse } from "../actions/course";

const validationSchema = Yup.object().shape({
  course: Yup.number().required().label('Course'),
  department: Yup.string().required().label('Department'),
  level: Yup.string().required().label('Level'),
});

const CourseRecord = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCourse(props.match.params.slug));
    dispatch(assignedStudents(props.match.params.slug));
    dispatch(getStudents());
  }, []);

  const {
    course,
    assignedStudents: students,
    isLoading,
    msg: backMsg,
  } = useSelector((state) => state.course);
  const { students: allStudents } = useSelector((state) => state.students);

  const [modal, setModal] = React.useState(false);
  const [modalClass, setModalClass] = React.useState(false);
  const [state, setState] = React.useState({
    student_reg: '',
  });
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const backMsg = useSelector((state) => state.course.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.course.assignSuccess);

  React.useEffect(() => {
    setBackErr(backErrors);
    setIsSubmitting(false);
    setTimeout(() => {
      setBackErr('');
    }, 5000);
  }, [backErrors]);

  React.useEffect(() => {
    setMsg(backMsg);
    setIsSubmitting(false);
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

  React.useEffect(() => {
    if (isSubmitting && state.student_reg) {
      dispatch(assignCourse(state.student_reg, props.match.params.slug));
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    if (checkSuccess) {
      setIsSubmitting(false);
      setTimeout(() => {
        window.location.reload(false);
      }, 6000);
    }
  }, [checkSuccess]);

  const handleAssignCourseToClass = (values) => {
    dispatch(assignCourseToClass(values));
  };

  const toggle = () => setModal(!modal);
  const toggleClass = () => setModalClass(!modalClass);

  const redirect = (id) => {
    props.history.push(`/student/${id}`);
  };

  const { student_reg } = state;

  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='background'>
          Enter The student you want to assign to this course
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
              <Label>Student Restration number</Label>
              <Input
                type='text'
                name='student_reg'
                placeholder='eg: D/BCS/17/09/0000'
                onChange={onChange}
                value={student_reg}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className='background'>
            <Button className='btn btn-secondary'>
              {isSubmitting ? <Spinner color='ligth' size='sm' /> : 'Save'}
            </Button>
            <Button className='btn btn-danger' onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Modal isOpen={modalClass} toggle={toggleClass}>
        <ModalHeader toggle={toggleClass} className='background'>
          Assign course to class
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
        <Formik
          initialValues={{ course: '', department: '', level: '' }}
          onSubmit={handleAssignCourseToClass}
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
                  <Label>Course</Label>
                  <Input
                    type='select'
                    name='course'
                    onChange={handleChange('course')}
                    onBlur={handleBlur('course')}
                    value={values.course}
                  >
                    <option>CHOOSE COURSE</option>
                    <option value={course.id}>{course.name}</option>
                  </Input>
                  {errors.course && touched.course && (
                    <div className='text-danger'>{errors.course}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Department</Label>
                  <Input
                    type='select'
                    name='department'
                    onChange={handleChange('department')}
                    onBlur={handleBlur('department')}
                    value={values.department}
                  >
                    <option>CHOOSE DEPARTMENT</option>
                    {allStudents.map((student) => (
                      <option value={student.department} key={student.id}>
                        {student.department}
                      </option>
                    ))}
                  </Input>
                  {errors.department && touched.department && (
                    <div className='text-danger'>{errors.department}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Level</Label>
                  <Input
                    type='select'
                    name='level'
                    onChange={handleChange('level')}
                    onBlur={handleBlur('level')}
                    value={values.level}
                  >
                    <option>CHOOSE LEVEL</option>
                    {allStudents.map((student) => (
                      <option value={student.level} key={student.id}>
                        {student.level}
                      </option>
                    ))}
                  </Input>
                  {errors.level && touched.level && (
                    <div className='text-danger'>{errors.level}</div>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter className='background'>
                <Button className='btn btn-secondary' type='submit'>
                  {isLoading ? <Spinner color='ligth' size='sm' /> : 'Save'}
                </Button>
                <Button className='btn btn-danger' onClick={toggleClass}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
      <Sidebar />
      <Col md='9'>
        <Container fluid>
          <Row>
            <Col sm='12' md='6'>
              <Card body outline color='success'>
                <CardHeader tag='h3'>{course.name}</CardHeader>
                <CardBody>
                  <CardTitle className='center' tag='h5'>
                    Welcome to this Course
                  </CardTitle>
                  <CardText>
                    <Row>
                      <Col md='12' lg='6'>
                        <p>
                          <b>Session:</b> {course.session}
                        </p>
                        <p>
                          <b>Assigned on</b> :{' '}
                          {`${course.students_number} Student`}
                        </p>
                      </Col>
                      <Col md='12' lg='6'>
                        <p>
                          <b>Starting date:</b> {course.start_date}
                        </p>
                        <p>
                          <b>Ending date:</b> {course.end_date}
                        </p>
                      </Col>
                    </Row>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col sm='12' md='3'>
              <Button className='btn btn-secondary ml-5 mr-5' onClick={toggle}>
                Assign to student
              </Button>
            </Col>
            <Col sm='12' md='3'>
              <Button
                className='btn btn-secondary ml-5 mr-5'
                onClick={toggleClass}
              >
                Assign to class
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
                    <th>Level</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  {students &&
                    students.map(
                      (student, index) =>
                        student.Student && (
                          <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>
                              {student.Student.regNo
                                ? student.Student.regNo
                                : 'N/A'}
                            </td>
                            <td>
                              {student.Student.name
                                ? student.Student.name
                                : 'N/A'}
                            </td>
                            <td>
                              {student.Student.level
                                ? student.Student.level
                                : 'N/A'}
                            </td>
                            <td>
                              <Button
                                className='btn btn-sm m-1 btn-light'
                                onClick={() => redirect(student.Student.id)}
                              >
                                <img
                                  src={Popup}
                                  alt='popup'
                                  className='w-25 h-25'
                                />
                              </Button>
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </Table>
            </>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default CourseRecord;
