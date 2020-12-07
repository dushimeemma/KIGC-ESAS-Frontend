import validation from '../../validations/login';

describe('validations', () => {
  let state = {
    email: 'dushimeemma@gmail.com',
    password: 'Password123',
  };
  let newState = {};
  it('Should return errors object', () => {
    expect(validation(newState)).toStrictEqual({
      emailErrors: 'Email is required',
      passwordErrors: 'Password is required',
    });
  });
  it('Should return empty object', () => {
    expect(validation(state)).toStrictEqual({});
  });
});
