import React from 'react';
import { Row, Col, Container, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { getStudents } from '../actions/students';

const Course = (props) => {
  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudents());
  }, []);
  const students = useSelector((state) => state.students.students);
  const onClickView = (id) => {
    props.history.push(`/course/record/${id}`);
  };
  return (
    <Row className='main-height'>
      <Sidebar />
      <Col md='9'>
        <Container>
          <h3 className='text-center'>All Students Courses</h3>
        </Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>RegNo</th>
              <th>Level</th>
              <th>Course</th>
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
      </Col>
    </Row>
  );
};

export default Course;
