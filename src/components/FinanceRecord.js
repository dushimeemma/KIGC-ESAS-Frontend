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
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar';
import { getStudent } from '../actions/students';
import { record } from '../actions/finance';

const FinanceRecord = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudent(props.match.params.slug));
  }, []);
  const student = useSelector((state) => state.students.student);
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState({
    amount: '',
  });
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const backMsg = useSelector((state) => state.finance.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.finance.recordSuccess);

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

  React.useEffect(() => {
    if (isSubmitting) {
      dispatch(record(state, props.match.params.slug));
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

  const { amount } = state;

  return (
    <Row className='main-height'>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='background'>
          Record Finance
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
              <Label>Amount</Label>
              <Input
                type='text'
                placeholder='eg: 60000'
                name='amount'
                onChange={onChange}
                value={amount}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className='background'>
            <Button className='btn btn-secondary'>Record</Button>
            <Button className='btn btn-danger' onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md='9'>
        <Container>
          <h3 className='text-center'>Single Student Financial Status</h3>
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
              <tr>
                <td>{student.id}</td>
                <td>{student.regNo}</td>
                <td>{student.level}</td>
                <td>
                  {student.Course ? student.Course.name : 'Record Course'}
                </td>
                <td>
                  {student.Finance ? student.Finance.amount : 'Record Finance'}
                </td>
                <td>
                  {student.Finance ? student.Finance.status : 'No Record'}
                </td>
                <td>
                  <Button className='btn btn-sm m-1' onClick={toggle}>
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

export default FinanceRecord;
