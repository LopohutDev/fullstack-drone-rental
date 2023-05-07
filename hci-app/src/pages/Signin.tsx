import React from "react";
import Button from "../commons/Button";
import TextField from "../commons/TextField";
import SignInBg from "../assets/signin-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "../features/Authentication/SignIn";
import { useDispatch } from "react-redux";
import { CustomError, useSigninMutation } from "../services/auth.api";
import { SignInFormValues } from "../interfaces/auth/Interface";
import { setUser, setUserDetail } from "../features/Authentication/authSlice";

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signin, { data, isSuccess, isLoading, error, isError }] =
    useSigninMutation();
  const [userDetails, setUserDetails] = React.useState<SignInFormValues>({});

  React.useEffect(() => {
    if (isSuccess && !isLoading) {
      localStorage.setItem("refreshToken", data.refreshToken);
      dispatch(
        setUser({
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
        })
      );
    }
  }, [isSuccess, isLoading, data, dispatch]);

  React.useEffect(() => {
    if (isError && (error as CustomError).data.isActive === false) {
      dispatch(setUserDetail(userDetails));
      navigate("/verification");
    }
  }, [isError, error, navigate, dispatch, userDetails]);

  if (isLoading) {
    return <h1>Loading ..</h1>;
  }

  const handleSubmit = (values: SignInFormValues) => {
    signin(values);
    setUserDetails(values);
  };

  return (
    <div
      className="flex h-screen bg-cover"
      style={{ backgroundImage: `url(${SignInBg})` }}
    >
      <div className="flex-1" />
      <div className="w-[60%] bg-white rounded-l-2xl flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-bold tracking-widest">Login</h1>
          <SignIn signInhandleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
