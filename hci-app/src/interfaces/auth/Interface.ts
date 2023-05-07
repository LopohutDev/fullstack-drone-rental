export interface SignUpProps {
  signupHandleSubmit?: any;
  isError: boolean;
  error: any;
  isModal?: boolean;
  setSignIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignupFormValues {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
}

export interface SignInFormValues {
  email?: string;
  password?: string;
  signInhandleSubmit?: any;
  isModal?: boolean;
  setSignIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SuccessImageProps {
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  handleClick?: () => void;
  image?: string;
  buttonTitle?: string;
}
