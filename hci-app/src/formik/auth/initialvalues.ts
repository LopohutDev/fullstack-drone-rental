import {
  SignInFormValues,
  SignupFormValues,
} from "../../interfaces/auth/Interface";

export const signupInitialValues: SignupFormValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

export const signinInitialValues: SignInFormValues = {
  email:
    process.env.REACT_APP_INIT_EMAIL === "default"
      ? ""
      : process.env.REACT_APP_INIT_EMAIL || "",
  password:
    process.env.REACT_APP_INIT_PASSWORD === "default"
      ? ""
      : process.env.REACT_APP_INIT_PASSWORD || "",
};
