import React from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Alert,
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../actions/auth';
import Image from './Image';
import validation from '../validations/login';

const Login = (props) => {
  const dispatch = useDispatch();
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const backMsg = useSelector((state) => state.auth.msg);
  const checkIsAuth = useSelector((state) => state.auth.isAuthenticated);

  const [backErrs, setBackErrs] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setMsg(backMsg);
    setIsSubmitting(false);
    setTimeout(() => {
      setMsg('');
    }, 5000);
  }, [backMsg]);

  React.useEffect(() => {
    setBackErrs(backErrors);
    setIsSubmitting(false);
    setTimeout(() => {
      setBackErrs('');
    }, 5000);
  }, [backErrors]);

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
    if (isSubmitting && Object.keys(errors).length === 0) {
      dispatch(loginUser(state));
    }
  }, [errors]);
  React.useEffect(() => {
    if (checkIsAuth) {
      setTimeout(() => {
        setState({
          email: '',
          password: '',
        });
        props.history.push('/default-dashboard');
        window.location.reload(false);
      }, 5000);
    }
  }, [checkIsAuth]);
  const { email, password } = state;
  const { emailErrors, passwordErrors } = errors;
  return (
    <Row className='main-height'>
      <Image />
      <Col className=''>
        <div className=' border p-2 aside back-color'>
          <h3 className='text-center'>
            Login To <br />
            KIGC-ESAS
          </h3>
          {msg ? (
            <Alert color='success' className='text-center'>
              {msg}
            </Alert>
          ) : (
            ''
          )}
          {backErrs ? (
            <Alert color='danger' className='text-center'>
              {backErrs}
            </Alert>
          ) : (
            ''
          )}
          <hr />
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type='text'
                name='email'
                onChange={onChange}
                value={email}
                placeholder='eg: dushimeemma@gmail.com'
                className={emailErrors ? 'border-danger' : 'border-success'}
              />
              {emailErrors ? (
                <Alert className='alert alert-danger background'>
                  {emailErrors}
                </Alert>
              ) : (
                ''
              )}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type='password'
                name='password'
                onChange={onChange}
                value={password}
                placeholder='eg: Password123'
                className={passwordErrors ? 'border-danger' : 'border-success'}
              />
              {passwordErrors ? (
                <Alert className='alert alert-danger background'>
                  {passwordErrors}
                </Alert>
              ) : (
                ''
              )}
            </FormGroup>
            <Button className='btn btn-block'>
              {isSubmitting ? <Spinner color='light' size='sm' /> : 'Login'}
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
