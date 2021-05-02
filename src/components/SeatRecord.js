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
  Label,
  Input,
  Alert,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getStudent } from '../actions/students';
import { assign } from '../actions/seat';

const SeatRecord = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/login');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudent(props.match.params.slug));
  }, []);
  const student = useSelector((state) => state.students.student);
  const backMsg = useSelector((state) => state.seat.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.seat.assignSuccess);
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState({
    seat: '',
    room: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [backErr, setBackErr] = React.useState('');
  const [msg, setMsg] = React.useState('');

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
      dispatch(assign(state, props.match.params.slug));
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
        <ModalHeader toggle={toggle} className='background'>
          Record Seat &#38;&#38; Room
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
              <Label>Room</Label>
              <Input type='select' name='room' onChange={onChange}>
                <option>Choose Room</option>
                <option value='Muhabura'>Muhabura</option>
                <option value='Kalisimbi'>Kalisimbi</option>
                <option value='Gasabo'>Gasabo</option>
                <option value='Jari'>Jari</option>
                <option value='Jabana'>Jabana</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Seat</Label>
              <Input type='select' name='seat' onChange={onChange}>
                <option>Choose Seat</option>
                <option value='001'>001</option>
                <option value='002'>002</option>
                <option value='003'>003</option>
                <option value='004'>004</option>
                <option value='005'>005</option>
                <option value='006'>006</option>
                <option value='007'>007</option>
                <option value='008'>008</option>
                <option value='009'>009</option>
                <option value='010'>010</option>
              </Input>
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
          <h3 className='text-center'>Single Student With Seat</h3>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>RegNo</th>
                <th>Level</th>
                <th>Course</th>
                <th>Seat &#38;&#38; Room</th>
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
                  {student.Seat ? student.Seat.seatNumber : 'Record Seat'}-
                  {student.Seat ? student.Seat.room : 'Room'}
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

export default SeatRecord;
