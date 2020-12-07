const validation = (state) => {
  let errors = {};
  if (!state.name) {
    errors.nameErrors = 'Name is required';
  }
  if (!state.email) {
    errors.emailErrors = 'Email is required';
  }
  if (!state.password) {
    errors.passwordErrors = 'Password is required';
  }
  return errors;
};
export default validation;
