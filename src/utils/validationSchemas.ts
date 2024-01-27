import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const AddKarchaFormValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup
    .string()
    .max(200, 'Description must be less than 200 characters'),
  date: yup
    .date()
    .required('Date is required')
    .typeError('Date must be a valid date'),
  amount: yup
    .number()
    .required('Amount is required')
    .typeError('Amount must be a number'),
});
