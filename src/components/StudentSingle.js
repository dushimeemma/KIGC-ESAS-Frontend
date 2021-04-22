import React from "react";
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
  Input,
  Label,
  Alert,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { getStudent, updateStudent } from "../actions/students";
import Student from "./Student";

const StudentSingle = (props) => {
  if (!localStorage.getItem("token")) {
    props.history.push("/");
  }
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStudent(props.match.params.slug));
  }, []);
  const student = useSelector((state) => state.students.student);
  const backMsg = useSelector((state) => state.students.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.students.updateSuccess);
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState({
    id: "",
    regNo: "",
    name: "",
    department: "",
    level: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [backErr, setBackErr] = React.useState("");
  const [msg, setMsg] = React.useState("");
  React.useEffect(() => {
    if (Object.keys(student).length > 0) {
      setState({
        id: student.id,
        regNo: student.regNo,
        name: student.name,
        department: student.department,
        level: student.level,
      });
    }
  }, [student]);

  React.useEffect(() => {
    setBackErr(backErrors);
    setTimeout(() => {
      setBackErr("");
    }, 5000);
  }, [backErrors]);

  React.useEffect(() => {
    setMsg(backMsg);
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
  const { id, regNo, name, department, level } = state;

  React.useEffect(() => {
    if (isSubmitting) {
      dispatch(updateStudent(state, id));
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
    <Row className="main-height">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="background">
          Update Student
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
              <Label>Reg No</Label>
              <Input
                type="text"
                name="regNo"
                onChange={onChange}
                value={regNo}
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" name="name" onChange={onChange} value={name} />
            </FormGroup>
            <FormGroup>
              <Label>Department</Label>
              <Input
                type="text"
                name="department"
                onChange={onChange}
                value={department}
              />
            </FormGroup>
            <FormGroup>
              <Label>Level</Label>
              <Input
                type="text"
                name="level"
                onChange={onChange}
                value={level}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="background">
            <Button className="btn btn-secondary">Update</Button>
            <Button onClick={toggle} className="btn btn-danger">
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md="9">
        <Container>
          <h3 className="text-center">Single Student</h3>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>RegNo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Level</th>
                <th>Status</th>
                <th>Seats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{student.id}</td>
                <td>{student.regNo}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.level}</td>
                <td>{student.Finance ? student.Finance.status : "N/A"}</td>
                <td>
                  {student.seat ? (
                    <>
                      <p>{student.Seat.room}</p>
                      <p>{`No: ${student.Seat.seatNumber}`}</p>
                    </>
                  ) : (
                    "None"
                  )}
                </td>
                <td>
                  <Button className="btn btn-sm m-1" onClick={toggle}>
                    <i className="fas fa-edit"></i>
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

export default StudentSingle;
