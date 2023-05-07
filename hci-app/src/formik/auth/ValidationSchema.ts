import * as yup from "yup";

export const signupValidationSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().required("Password is required!"),
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  mobileNumber: yup.string().required("Mobile Number is required!"),
});

export const signinValidationSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});
