import React from "react";
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
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { getStudents } from "../actions/students";
import { getCourse, assignCourse, assignedStudents } from "../actions/course";
// import { assignCourse } from "../actions/course";

const CourseRecord = (props) => {
  if (!localStorage.getItem("token")) {
    props.history.push("/");
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCourse(props.match.params.slug));
    dispatch(assignedStudents(props.match.params.slug));
  }, []);

  const { course, assignedStudents: students } = useSelector(
    (state) => state.course
  );
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState({
    student_reg: "",
  });
  const [backErr, setBackErr] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const backMsg = useSelector((state) => state.course.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.course.assignSuccess);

  React.useEffect(() => {
    setBackErr(backErrors);
    setIsSubmitting(false);
    setTimeout(() => {
      setBackErr("");
    }, 5000);
  }, [backErrors]);

  React.useEffect(() => {
    setMsg(backMsg);
    setIsSubmitting(false);
    setTimeout(() => {
      setMsg("");
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

  const toggle = () => setModal(!modal);

  const redirect = (id) => {
    props.history.push(`/student/${id}`);
  };

  const { student_reg } = state;

  return (
    <Row className="main-height">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="background">
          Enter The student you want to assign to this course
        </ModalHeader>
        {msg ? (
          <Alert color="success" className="text-center">
            {msg}
          </Alert>
        ) : (
          ""
        )}
        {backErr ? (
          <Alert color="danger" className="text-center">
            {backErr}
          </Alert>
        ) : (
          ""
        )}
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Student Restration number</Label>
              <Input
                type="text"
                name="student_reg"
                placeholder="eg: D/BCS/17/09/0000"
                onChange={onChange}
                value={student_reg}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="background">
            <Button className="btn btn-secondary">
              {isSubmitting ? <Spinner color="ligth" size="sm" /> : "Save"}
            </Button>
            <Button className="btn btn-danger" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md="9">
        <Container fluid>
          <Row>
            <Col sm="12" md="6">
              <Card body outline color="success">
                <CardHeader tag="h3">{course.name}</CardHeader>
                <CardBody>
                  <CardTitle className="center" tag="h5">
                    Welcome to this Course
                  </CardTitle>
                  <CardText>
                    <Row>
                      <Col md="12" lg="6">
                        <p>
                          <b>Session:</b> {course.session}
                        </p>
                        <p>
                          <b>Assigned on</b> :{" "}
                          {`${course.students_number} Student`}
                        </p>
                      </Col>
                      <Col md="12" lg="6">
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
            <Col sm="12" md="6">
              <Button className="btn btn-secondary ml-5 mr-5" onClick={toggle}>
                Assign to student
              </Button>
            </Col>
          </Row>

          {students && (
            <>
              <h3 className="text-center">Assigned Students</h3>
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
                  {students.map((student, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{student.Student.regNo}</td>
                      <td>{student.Student.name}</td>
                      <td>{student.Student.level}</td>
                      <td>
                        <Button
                          className="btn btn-sm m-1"
                          onClick={() => redirect(student.Student.id)}
                        >
                          <i class="fas fa-ellipsis-h"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
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
