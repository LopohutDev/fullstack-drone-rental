import React from "react";
import Button from "../commons/Button";
import TextField from "../commons/TextField";
import SignUpBg from "../assets/signup-bg.jpg";
import { Link } from "react-router-dom";
import SignUp from "../features/Authentication/SignUp";
import { useSignupMutation } from "../services/auth.api";
import { SignupFormValues } from "../interfaces/auth/Interface";

const Signup: React.FC = () => {
  const [signup, { error, isError, isSuccess, isLoading }] =
    useSignupMutation();

  const handleSubmit = (values: SignupFormValues) => {
    signup(values);
  };

  return (
    <div
      className="flex h-screen bg-red-500 bg-bottom bg-cover"
      style={{ backgroundImage: `url(${SignUpBg})` }}
    >
      <div className="flex-1" />
      <div className="w-[60%] bg-white rounded-l-2xl flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-bold tracking-widest">Create Account</h1>
          <SignUp
            signupHandleSubmit={handleSubmit}
            isError={isError}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
