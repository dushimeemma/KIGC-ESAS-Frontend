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
  Label,
  Alert,
  Input,
  Spinner,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { getRooms, createRoom } from "../actions/room";
import roomValidations from "../validations/room";

const Room = (props) => {
  if (!localStorage.getItem("token")) {
    props.history.push("/");
  }
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const backMsg = useSelector((state) => state.rooms.msg);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const checkSuccess = useSelector((state) => state.rooms.createSuccess);

  React.useEffect(() => {
    dispatch(getRooms());
  }, []);
  const [state, setState] = React.useState({
    name: "",
    capacity: 0,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [backErr, setBackErr] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [errors, setErrors] = React.useState({})

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setErrors({...errors, [`${name}Errors`]: null})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(roomValidations(state));
    setIsSubmitting(true);
  };

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
      dispatch(getRooms());
    }, 5000);
  }, [backMsg, dispatch]);

  React.useEffect(() => {
    if(Object.keys(errors).length !== 0){
      setIsSubmitting(false)
    }
    else if (isSubmitting ) {
      dispatch(createRoom(state));
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        // window.location.reload(false);
        dispatch(getRooms());
        setState({
          name: "",
          capacity: 0,
        });
      }, 6000);
    }
  }, [checkSuccess, dispatch]);

  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  const onClickView = (id) => {
    // To be implemented in the future
    // props.history.push(`/room/${id}`);
  };

  const onClickDelete = (id) => {
    // To be implemented in the future
  };

  const { name, capacity } = state;
  return (
    <Row className="main-height">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="background">
          Create Room
        </ModalHeader>
        {msg && (
          <Alert color="success" className="text-center">
            {msg}
          </Alert>
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
            <Row>
              <Col sm="8">
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={name}
                    className={
                      errors.nameErrors
                        ? "border-danger"
                        : "border-success"
                    }
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label>Capacity</Label>
                  <Input
                    type="number"
                    name="capacity"
                    onChange={onChange}
                    value={capacity}
                    className={
                      errors.capacityErrors
                        ? "border-danger"
                        : "border-success"
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="background">
            <Button className="btn btn-secondary">
              {isSubmitting ? <Spinner color="light" size="sm" /> : "Create"}
            </Button>
            <Button className="btn btn-danger" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Sidebar />
      <Col md="9">
        <Row>
          <Col md="3">
            <Button className="btn btn-secondary ml-5 mr-5" onClick={toggle}>
              Create Room
            </Button>
          </Col>
          <Col md="9"></Col>
        </Row>
        <Container>
          <h3 className="text-center">Rooms</h3>
          {/* {msg && checkDeleteSuccess && (
            <Alert color="success" className="text-center">
              {msg}
            </Alert>
          )} */}
          {backErr ? (
            <Alert color="danger" className="text-center">
              {backErr}
            </Alert>
          ) : (
            ""
          )}
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {rooms && (
              <tbody>
                {rooms.map((room, index) => (
                  <tr key={room.id}>
                    <td>{index + 1}</td>
                    <td>{room.name}</td>
                    <td>{room.capacity}</td>
                    <td>{room.status}</td>
                    <td>
                      <Button
                        className="btn btn-sm m-1"
                        onClick={() => onClickView(room.id)}
                      >
                        <i className="fas fa-eye"></i>
                      </Button>
                      <Button
                        className="btn btn-sm m-1"
                        onClick={() => onClickDelete(room.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </Container>
      </Col>
    </Row>
  );
};

export default Room;
