import { Formik, Field, Form } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../commons/Button";
import TextField from "../../commons/TextField";
import { signupInitialValues } from "../../formik/auth/initialvalues";
import { signupValidationSchema } from "../../formik/auth/ValidationSchema";
import { SignUpProps } from "../../interfaces/auth/Interface";
import { CustomError } from "../../services/auth.api";

const SignUp: React.FC<SignUpProps> = ({
  signupHandleSubmit,
  isError,
  error,
  isModal,
  setSignIn,
}) => {
  return (
    <Formik
      initialValues={signupInitialValues}
      validationSchema={signupValidationSchema}
      onSubmit={signupHandleSubmit}
    >
      {() => (
        <Form>
          <div className="flex flex-col gap-3 p-5 mx-2 ">
            <Field
              name="firstName"
              placeholder="First Name"
              component={TextField}
            />
            <Field
              name="lastName"
              placeholder="Last Name"
              component={TextField}
            />
            <Field name="email" placeholder="Email" component={TextField} />
            <Field
              name="mobileNumber"
              placeholder="Mobile Number"
              component={TextField}
            />
            <Field
              name="password"
              placeholder="Password"
              type="password"
              component={TextField}
            />
            <Button type="submit" className="mt-10">
              Create Account
            </Button>
            <p className="text-sm text-gray-300">
              Already have an account?
              <Link to="/signin">
                <span className="text-[#F4511E] text-opacity-60">Login</span>
              </Link>
            </p>
            {isError && error && (
              <div className="pt-2 text-red-500">
                <h3 className="font-semibold">
                  Error {(error as CustomError).status}
                </h3>
                <ul>
                  <li>{(error as CustomError).data.message}</li>
                </ul>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
