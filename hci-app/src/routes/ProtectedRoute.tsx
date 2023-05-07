import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
}

interface ComponentProps {
  children?: JSX.Element | JSX.Element[];
}

type ExtendentComponentProps = ProtectedRouteProps & ComponentProps;
const ProtectedRoute: React.FC<ExtendentComponentProps> = ({
  isAllowed,
  redirectPath = "/",
  children,
}): any => {
  const location = useLocation();
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
