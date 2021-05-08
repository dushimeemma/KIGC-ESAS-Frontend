import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  role: Yup.string().required().label('Role'),
  email: Yup.string().required().label('Email'),
});
