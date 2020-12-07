import React from 'react';
import { Row, Col, Container, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getStudents } from '../actions/students';

const Attendance = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudents());
  }, []);
  const students = useSelector((state) => state.students.students);
  const onClickRecord = (id) => {
    props.history.push(`/attendance/record/${id}`);
  };
  return (
    <Row className='main-height'>
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
                      className='btn btn-sm m-1'
                      onClick={() => onClickRecord(student.id)}
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

export default Attendance;
