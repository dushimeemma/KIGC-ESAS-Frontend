import React from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Alert,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import HomeImage from "./Image";
import { viewSeat } from "../actions/seat";

const HomePage = () => {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.seat.msg);
  const seat = useSelector((state) => state.seat.seat);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const [state, setState] = React.useState({
    reg: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [backErr, setBackErr] = React.useState("");
  React.useEffect(() => {
    setBackErr(backErrors);
    setIsSubmitting(false);
    setTimeout(() => {
      setBackErr("");
    }, 15000);
  }, [backErrors]);

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
      dispatch(viewSeat(state));
      setTimeout(() => {
        window.location.reload(false);
      }, 16000);
    }
  }, [isSubmitting]);

  React.useEffect(() => {
    setIsSubmitting(false);
  }, [seat]);

  if (Object.keys(seat).length > 0) {
    setTimeout(() => {
      window.location.reload(false);
    }, 15000);
  }

  const { reg } = state;
  return (
    <Row className="main-height">
      <HomeImage />
      <Col className="">
        <div className=" border p-2 aside back-color">
          <h3 className="text-center mt-2 mb-2">
            Enter Your Registration Number <br />
            To View Your Seat
          </h3>
          <hr />
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Registration Number</Label>
              <Input
                type="text"
                name="reg"
                onChange={onChange}
                value={reg}
                placeholder="eg: D/BCS/17/09/6177"
              />
            </FormGroup>
            <Button className="btn btn-secondary btn-block mb-2">
              {isSubmitting ? <Spinner color="light" size="sm" /> : "View Seat"}
            </Button>
          </Form>
          {backErr ? (
            <Alert className="text-center" color="danger">
              {backErr}
            </Alert>
          ) : null}
          {Object.keys(seat).length > 0 ? (
            <ListGroup>
              <ListGroupItem color="success">Name: {seat.name}</ListGroupItem>
              <ListGroupItem color="success">RegNo: {seat.regNo}</ListGroupItem>
              <ListGroupItem color="success">Level: {seat.level}</ListGroupItem>
              <ListGroupItem color="success">
                Course: {seat.course.name}
              </ListGroupItem>
              <ListGroupItem color="success">
                Seat: {seat.seat.seatNumber}-{seat.seat.room}
              </ListGroupItem>
            </ListGroup>
          ) : null}
        </div>
      </Col>
    </Row>
  );
};

export default HomePage;
