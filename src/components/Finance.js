import React from 'react';
import { Row, Col, Container, Button, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getStudents } from '../actions/students';

const Finance = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudents());
  }, []);
  const students = useSelector((state) => state.students.students);
  const onClickView = (id) => {
    props.history.push(`/finance/record/${id}`);
  };
  return (
    <Row className='main-height'>
      <Sidebar />
      <Col md='9'>
        <Container>
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
                    {student.Course ? student.Course.name : 'Record Course'}
                  </td>
                  <td>
                    {student.Finance
                      ? student.Finance.amount
                      : 'Record Finance'}
                    Rwfs
                  </td>
                  <td>
                    {student.Finance ? student.Finance.status : 'No Record'}
                  </td>
                  <td>
                    <Button
                      className='btn btn-sm m-1'
                      onClick={() => onClickView(student.id)}
                    >
                      <i className='fas fa-eye'></i>
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

export default Finance;
