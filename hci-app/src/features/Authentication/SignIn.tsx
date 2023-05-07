import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../commons/Button";
import TextField from "../../commons/TextField";
import { signinInitialValues } from "../../formik/auth/initialvalues";
import { signinValidationSchema } from "../../formik/auth/ValidationSchema";
import { SignInFormValues } from "../../interfaces/auth/Interface";

const SignIn: React.FC<SignInFormValues> = ({
  signInhandleSubmit,
  isModal,
  setSignIn,
}) => {
  return (
    <Formik
      initialValues={signinInitialValues}
      validationSchema={signinValidationSchema}
      onSubmit={signInhandleSubmit}
    >
      {() => (
        <Form>
          <div className="flex flex-col gap-3 p-5 mx-2 ">
            <Field placeholder="Email" name="email" component={TextField} />
            <Field
              placeholder="Password"
              name="password"
              type="password"
              component={TextField}
            />
            <Button type="submit" className="mt-10">
              Login
            </Button>
            <p className="text-sm text-gray-300">
              Doesn't have an account?
              <Link to="/signup">
                <span className="text-[#F4511E] text-opacity-60">
                  Create Account
                </span>
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
