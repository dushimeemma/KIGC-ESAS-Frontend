import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { Formik } from 'formik';

import { createUser } from '../actions/auth';
import Image from '../components/Image';
import { validationSchema } from '../validations';

const Signup = (props) => {
  const dispatch = useDispatch();

  const { msg: backMsg, registered: checkSuccess } = useSelector(
    (state) => state.auth
  );

  const backErrors = useSelector(
    (state) => state.errors.msg.error || state.errors.msg.msg
  );
  const [backErrs, setBackErrs] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setMsg(backMsg);
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

  const handleRegister = (values) => {
    setIsSubmitting(true);
    dispatch(createUser(values));
  };

  React.useEffect(() => {
    if (checkSuccess) {
      setIsSubmitting(false);
      setTimeout(() => {
        props.history.push('/login');
      }, 5000);
    }
  }, [checkSuccess]);

  return (
    <Row className='main-height'>
      <Col md='6' className=''>
        <div className=' border p-2 aside back-color'>
          <h3 className='text-center'>
            Create New Account <br /> To KIGC-ESAS
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
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={handleRegister}
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
                  <Label>Name</Label>
                  <Input
                    type='text'
                    name='name'
                    placeholder='eg: Emma Dushime'
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    className={errors.name && touched.name && 'border-danger'}
                  />
                  {errors.name && touched.name && (
                    <Label className='alert alert-danger background'>
                      {errors.name}
                    </Label>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type='text'
                    name='email'
                    placeholder='eg: dushimeemma@gmail.com'
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    className={errors.email && touched.email && 'border-danger'}
                  />
                  {errors.email && touched.email && (
                    <Label className='alert alert-danger background'>
                      {errors.email}
                    </Label>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type='password'
                    name='password'
                    placeholder='eg: Password123'
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    className={
                      errors.password && touched.password && 'border-danger'
                    }
                  />
                  {errors.password && touched.password && (
                    <Label className='alert alert-danger background'>
                      {errors.password}
                    </Label>
                  )}
                </FormGroup>
                <Button className='btn btn-block'>
                  {isSubmitting ? (
                    <Spinner color='light' size='sm' />
                  ) : (
                    'Register'
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
      <Image />
    </Row>
  );
};

export default Signup;
