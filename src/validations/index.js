import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().label('Password'),
});
