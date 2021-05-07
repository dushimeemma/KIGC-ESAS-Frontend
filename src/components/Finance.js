import React from 'react';
import {
  Row,
  Col,
  Container,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Sidebar from './Sidebar';
import Popup from '../assets/popup.svg';
import { getStudents, searchStudents } from '../actions/students';
import { record } from '../actions/finance';

const validationSchema = Yup.object().shape({
  amount: Yup.number().required().label('Amount'),
});

const searchValidationSchema = Yup.object().shape({
  term: Yup.string().required().label('Search Term'),
});

const Finance = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudents());
  }, []);
  const { students, isSearchingStudents, isLoading } = useSelector(
    (state) => state.students
  );
  const [modal, setModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const backMsg = useSelector((state) => state.finance.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.finance.recordSuccess);

  const handleRecordFinance = (values) => {
    setIsSubmitting(true);
    dispatch(record(values, localStorage.getItem('id')));
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

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
    if (checkSuccess) {
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    }
  }, [checkSuccess]);

  const handleSearchStudents = (values) => {
    dispatch(searchStudents(values.term));
  };

  const toggle = (id) => {
    localStorage.setItem('id', id);
    setModal(!modal);
  };
  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='background'>
          Record Finance
        </ModalHeader>
        <Formik
          initialValues={{ amount: '' }}
          onSubmit={handleRecordFinance}
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
                  <Label>Amount</Label>
                  <Input
                    type='text'
                    placeholder='eg: 60000'
                    name='amount'
                    onChange={handleChange}
                    value={values.amount}
                    onBlur={handleBlur}
                  />
                  {errors.amount && touched.amount && (
                    <div className='text-danger'>{errors.amount} </div>
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
        <Row>
          <Col md='6' />
          <Col md='6'>
            <Formik
              initialValues={{ term: '' }}
              onSubmit={handleSearchStudents}
              validationSchema={searchValidationSchema}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
              }) => (
                <Form inline onSubmit={handleSubmit}>
                  <Input
                    className='m-1'
                    placeholder='Search students...'
                    name='term'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.term}
                  />
                  {errors.term && touched.term && (
                    <div className='text-danger'>{errors.term} </div>
                  )}
                  <Button type='submit'>
                    {isSearchingStudents ? (
                      <Spinner color='light' size='sm' />
                    ) : (
                      'Search'
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
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
            {students.length ? (
              <>
                <h3 className='text-center'>All Students Financial Status</h3>
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
                        <td>
                          {student.Course
                            ? student.Course.name
                            : 'Record Course'}
                        </td>
                        <td>
                          {student.Finance
                            ? student.Finance.amount
                            : 'Record Finance'}
                          Rwfs
                        </td>
                        <td>
                          {student.Finance
                            ? student.Finance.status
                            : 'No Record'}
                        </td>
                        <td>
                          <Button
                            className='btn btn-sm m-1 btn-light'
                            onClick={() => toggle(student.id)}
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

export default Finance;
