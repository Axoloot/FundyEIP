import * as yup from 'yup';

const emailAddress = yup
  .string().email()
  .required('No email address provided.')
  .min(3, 'Email address too short. 3 characters minimum.')

const password = yup.string().required('No password provided');

const passwordConfirmation = yup
  .string()
  .required('No password confirmation provided')
  .oneOf([yup.ref('password'), null], 'Passwords must match');

export { emailAddress, password, passwordConfirmation };
