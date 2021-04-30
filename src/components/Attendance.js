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
  Spinner,
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Popup from '../assets/popup.svg';
import { getStudents } from '../actions/students';
import { record } from '../actions/attendance';

const validationSchema = Yup.object().shape({
  percentage: Yup.number().required().label('Percentage'),
});

const Attendance = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  const dispatch = useDispatch();
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(getStudents());
  }, []);
  const students = useSelector((state) => state.students.students);
  const backMsg = useSelector((state) => state.attendance.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.attendance.recordSuccess);
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
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

  const handleRecordAttendance = (values) => {
    setIsSubmitting(true);
    dispatch(record(values, localStorage.getItem('id')));
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    }
  }, [checkSuccess]);

  const toggle = (id) => {
    localStorage.setItem('id', id);
    setModal(!modal);
  };
  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='background'>
          Record Attendance
        </ModalHeader>
        <Formik
          initialValues={{ percentage: '' }}
          onSubmit={handleRecordAttendance}
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
                <FormGroup>
                  <Label>Percentage</Label>
                  <Input
                    type='text'
                    name='percentage'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.percentage}
                    placeholder='eg: 85'
                  />
                  {errors.percentage && touched.percentage && (
                    <div className='text-danger'>{errors.percentage} </div>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter className='background'>
                <Button className='btn btn-secondary'>
                  {isSubmitting ? (
                    <Spinner color='light' size='sm' />
                  ) : (
                    'Record'
                  )}
                </Button>
                <Button className='btn btn-danger' onClick={toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
      <Sidebar />
      <Col md='9'>
        <Container>
          <h3 className='text-center'>All Students Attendance</h3>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>RegNo</th>
                <th>Level</th>
                <th>Course</th>
                <th>Value</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.regNo}</td>
                  <td>{student.level}</td>
                  <td>{student.Course ? student.Course.name : 'No course'}</td>
                  <td>
                    {student.Attendance
                      ? student.Attendance.percentage
                      : 'Record Attandance'}
                    %
                  </td>
                  <td>
                    {student.Attendance
                      ? student.Attendance.status
                      : 'No record'}
                  </td>
                  <td>
                    <Button
                      className='btn btn-sm m-1 btn-light'
                      onClick={() => toggle(student.id)}
                    >
                      <img src={Popup} alt='popup' className='w-25 h-25' />
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

export default Attendance;
