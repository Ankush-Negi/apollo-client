import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
  Name: yup
    .string()
    .required('Name is a required field')
    .min(3),
  Email: yup
    .string()
    .required('Email Address is a required field')
    .matches('^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$', { message: 'Email address must be a valid email' }),
  Password: yup
    .string()
    .required('Password is required')
    .matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$', { message: 'Must contain 8 characters, atleast one uppercase letter, one lowercase letter and a number' }),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password')], 'Must match password')
    .required('Confirm Password is required'),
});

export default ValidationSchema;
