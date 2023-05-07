import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Button from "../../commons/Button";
import Loading from "../../commons/Loading";
import {
  CustomError,
  useResendOTPVerificationMutation,
  useVerifyUserMutation,
} from "../../services/auth.api";
import { authSelect } from "../Authentication/authSlice";

let currentOTPIndex: number = 0;

const Verification: React.FC = () => {
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = React.useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      setActiveOTPIndex(currentOTPIndex - 1);
    }
  };
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  //Handling resend OTP and verify

  const { userDetail } = useAppSelector(authSelect);
  const navigate = useNavigate();
  const [counter, setCounter] = React.useState(300);
  const [resendOTPVerification] = useResendOTPVerificationMutation();
  const [verifyUser, { data, isSuccess, isLoading, isError, error }] =
    useVerifyUserMutation();
  const customError = error as CustomError;

  React.useEffect(() => {
    counter > 1 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleResendOTP = () => {
    const resendVerification = {
      email: userDetail?.email,
      password: userDetail?.password,
    };
    setCounter(300);
    resendOTPVerification(resendVerification);
  };

  const handleVerifyUser = () => {
    const userData = {
      email: userDetail?.email,
      password: userDetail?.password,
      otp: otp.join(""),
    };
    verifyUser(userData);
  };

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/verification/success");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <p className="px-5 text-lg md:pb-5">
        We have sent your access code to{" "}
        <b>{`${userDetail ? userDetail.email : ""}`} </b>
      </p>

      <div className="flex items-center justify-center mt-4 mb-6 space-x-2 lg:mt-0">
        {otp.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <input
                ref={index === activeOTPIndex ? inputRef : null}
                type="number"
                className="w-12 text-xl font-semibold text-center text-gray-400 transition bg-transparent border-2 border-gray-400 rounded outline-none h-14 focus:border-gray-700 focus:text-gray-700 spin-button-none"
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, index)}
                value={otp[index]}
              />
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex justify-center my-2">
        <div className="mr-2">Did not received OTP?</div>
        <div>
          {counter === 1 ? (
            <div
              onClick={() => handleResendOTP()}
              className="underline cursor-pointer"
            >
              Resend OTP click here.
            </div>
          ) : (
            <>Resend {`(In ${counter} sec)`} </>
          )}
        </div>
      </div>
      <div>
        {isError && <p className="text-red-700">{customError.data.message}</p>}
      </div>

      <Button
        onClick={() => handleVerifyUser()}
        className="p-2 font-bold text-white uppercase rounded-sm lg:w-96 w-72"
      >
        Proceed
      </Button>
    </>
  );
};

export default Verification;
