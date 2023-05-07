import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VerificationSuccessLogo from "../../../assets/verificationsuccesslogo.png";

const VerificationSuccess: React.FC = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const verifyOTP = searchParams.get("verifyOTP");

  const [active, setActive] = React.useState<boolean>(true);
  const [counter, setCounter] = React.useState(3);

  React.useEffect(() => {
    counter > 1 && setTimeout(() => setCounter(counter - 1), 1000);
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 2500);

    return () => clearTimeout(timer);
  }, [counter, navigate]);

  // React.useEffect(() => {
  //   if (!verifyOTP) {
  //     navigate("/");
  //   }
  // }, [verifyOTP, navigate]);

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div>
          <div className="mb-6">
            <img src={VerificationSuccessLogo} alt="successlogo" />
          </div>
          <div className="my-2 text-2xl font-bold text-center">
            <p>Verification Successful</p>
          </div>
          <div className="my-4 text-center">
            <p>Redirecting to SignIn in {counter} ... </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationSuccess;
