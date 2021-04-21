import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Alert,
} from "reactstrap";

import { createUser } from "../actions/auth";
import Image from "../components/Image";
import validation from "../validations";

const Signup = (props) => {
  const dispatch = useDispatch();
  const backMsg = useSelector((state) => state.auth.msg);
  const checkSuccess = useSelector((state) => state.auth.registered);
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const [backErrs, setBackErrs] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});

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
    setErrors(validation(state));
    setIsSubmitting(true);
  };
  React.useEffect(() => {
    setBackErrs(backErrors);
    setTimeout(() => {
      setBackErrs("");
    }, 5000);
  }, [backErrors]);
  React.useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      dispatch(createUser(state));
    }
  }, [errors]);
  React.useEffect(() => {
    if (checkSuccess) {
      setTimeout(() => {
        setState({
          name: "",
          email: "",
          password: "",
        });
        props.history.push("/login");
      }, 5000);
    }
  }, [checkSuccess]);

  const { name, email, password } = state;
  const { nameErrors, emailErrors, passwordErrors } = errors;
  return (
    <Row className="main-height">
      <Col md="6" className="">
        <div className=" border p-2 aside back-color">
          <h3 className="text-center">
            Create New Account <br /> To KIGC-ESAS
          </h3>
          {msg ? (
            <Alert color="success" className="text-center">
              {msg}
            </Alert>
          ) : (
            ""
          )}
          {backErrs ? (
            <Alert color="danger" className="text-center">
              {backErrs}
            </Alert>
          ) : (
            ""
          )}
          <hr />
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="eg: Emma Dushime"
                onChange={onChange}
                value={name}
                className={nameErrors ? "border-danger" : "border-success"}
              />
              {nameErrors ? (
                <Label className="alert alert-danger background">
                  {nameErrors}
                </Label>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="eg: dushimeemma@gmail.com"
                onChange={onChange}
                value={email}
                className={emailErrors ? "border-danger" : "border-success"}
              />
              {emailErrors ? (
                <Label className="alert alert-danger background">
                  {emailErrors}
                </Label>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="eg: Password123"
                onChange={onChange}
                value={password}
                className={passwordErrors ? "border-danger" : "border-success"}
              />
              {passwordErrors ? (
                <Label className="alert alert-danger background">
                  {passwordErrors}
                </Label>
              ) : (
                ""
              )}
            </FormGroup>
            <Button className="btn btn-block">Register</Button>
          </Form>
        </div>
      </Col>
      <Image />
    </Row>
  );
};

export default Signup;
