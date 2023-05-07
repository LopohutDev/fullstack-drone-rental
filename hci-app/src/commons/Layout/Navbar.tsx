import React from "react";

import logoNoBG from "../../assets/logo-no-bg.png";
import logoNoBGWhite from "../../assets/logo-no-bg-white.png";
import { Link, useNavigate } from "react-router-dom";
import { logout, User } from "../../features/Authentication/authSlice";
import Button from "../Button";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutMutation } from "../../services/auth.api";

const Navbar: React.FC<{ user: User | null }> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isSuccess }] = useLogoutMutation();
  React.useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("refreshToken");
      dispatch(logout());
      navigate("/");
      window.location.reload();
    }
  }, [isSuccess, dispatch, navigate]);

  const handleLogout = () => {
    logoutMutation({});
  };

  return (
    <div className="fixed w-full font-semibold text-white bg-gray-800 bg-opacity-50">
      <div className="flex items-center justify-between mx-auto max-w-screen-2xl">
        <img src={logoNoBGWhite} alt="No BG" />
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/items">
          <p>Items</p>
        </Link>
        <Link to="/aboutus">
          <p>About us</p>
        </Link>
        <Link to="/FAQ">
          <p>Faq's</p>
        </Link>
        <Link to="/contactus">
          <p>Contact us</p>
        </Link>
        <Link to="/privacy-policy">
          <p>Privacy Policy</p>
        </Link>
        <div className="flex gap-3">
          {!user ? (
            <>
              <Link to="/signin">
                <p className="p-3 border-2 border-[#F4511E] rounded-xl bg-[#F4511E]">
                  Login
                </p>
              </Link>
              <Link to="/signup">
                <p className="p-3 border-2 border-white rounded-xl">Signup</p>
              </Link>
            </>
          ) : (
            <Button onClick={handleLogout}>Logout</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
