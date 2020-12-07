const validation = (state) => {
  let errors = {};
  if (!state.email) {
    errors.emailErrors = 'Email is required';
  }
  if (!state.password) {
    errors.passwordErrors = 'Password is required';
  }
  return errors;
};
export default validation;
