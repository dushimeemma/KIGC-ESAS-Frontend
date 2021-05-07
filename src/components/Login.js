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
import { Formik } from 'formik';

import { validationSchema } from '../validations/login';
import { loginUser } from '../actions/auth';
import Image from './Image';

const Login = (props) => {
  const dispatch = useDispatch();
  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );

  const { msg: backMsg, isAuthenticated: checkIsAuth } = useSelector(
    (state) => state.auth
  );

  const [backErrs, setBackErrs] = React.useState('');
  const [msg, setMsg] = React.useState('');

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

  const handleLogin = (values) => {
    setIsSubmitting(true);
    dispatch(loginUser(values));
  };

  React.useEffect(() => {
    if (checkIsAuth) {
      setTimeout(() => {
        setIsSubmitting(false);
        props.history.push('/default-dashboard');
        window.location.reload(false);
      }, 500);
    }
  }, [checkIsAuth]);

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
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type='text'
                    name='email'
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder='eg: dushimeemma@gmail.com'
                    className={errors.email && touched.email && 'border-danger'}
                  />
                  {errors.email && touched.email && (
                    <Alert className='alert alert-danger background'>
                      {errors.email}
                    </Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type='password'
                    name='password'
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder='eg: Password123'
                    className={
                      errors.password && touched.password && 'border-danger'
                    }
                  />
                  {errors.password && touched.password && (
                    <Alert className='alert alert-danger background'>
                      {errors.password}
                    </Alert>
                  )}
                </FormGroup>
                <Button className='btn btn-block'>
                  {isSubmitting ? <Spinner color='light' size='sm' /> : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
