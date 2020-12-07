import validation from '../../validations';

describe('validations', () => {
  let state = {
    name: 'Emma Dushime',
    email: 'dushimeemma@gmail.com',
    password: 'Password123',
  };
  let newState = {};
  it('Should return errors object', () => {
    expect(validation(newState)).toStrictEqual({
      emailErrors: 'Email is required',
      nameErrors: 'Name is required',
      passwordErrors: 'Password is required',
    });
  });
  it('Should return empty object', () => {
    expect(validation(state)).toStrictEqual({});
  });
});
