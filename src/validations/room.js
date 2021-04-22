const room = (state) => {
    let errors = {};
    if (!state.name) {
      errors.nameErrors = 'Room name is required';
    }
    if (state.capacity <= 0 ) {
      errors.capacityErrors = 'Room capacity is required';
    }
    return errors;
  };
  export default room;
  