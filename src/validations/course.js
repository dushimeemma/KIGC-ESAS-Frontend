const course = (state) => {
  let errors = {};
  if (!state.name) {
    errors.nameErrors = "Room name is required";
  }
  if (!state.session) {
    errors.sessionErrors = "Session is required";
  }
  if (!state.start_date) {
    errors.start_dateErrors = "Start date is required";
  }
  if (!state.end_date) {
    errors.end_dateErrors = "End date is required";
  }
  return errors;
};
export default course;
