import React from "react";
import {
  createBrowserRouter,
  Link,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
// import Root from "./pages/Root";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";

import Footer from "./commons/Layout/Footer";
import Navbar from "./commons/Layout/Navbar";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Items, { SelectedItem } from "./pages/Items";
import VerificationPage from "./pages/Verification";
import VerificationSuccess from "./pages/Verification/Success";
import Error404Page from "./pages/Error404";
import { useRefreshMutation } from "./services/auth.api";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { authSelect, setUser } from "./features/Authentication/authSlice";

interface LocationState {
  from?: string;
}

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as LocationState;
  const { user } = useAppSelector(authSelect);
  const [refresh, { data, isSuccess, isLoading, isError }] =
    useRefreshMutation();

  React.useEffect(() => {
    if (localStorage.getItem("refreshToken")) refresh({});
  }, [refresh]);

  React.useEffect(() => {
    if (isError) {
      localStorage.removeItem("refreshToken");
    }
  }, [isError]);

  React.useEffect(() => {
    if (isSuccess && !isLoading) {
      dispatch(
        setUser({
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
        })
      );
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  }, [isSuccess, isLoading, data, dispatch]);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <div className="font-['inter']">
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAllowed={user === null}
              redirectPath={state?.from || "/"}
            />
          }
        >
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route>
          <Route
            path="/"
            element={
              <div>
                <Navbar user={user} />
                <div className="h-[90px]"></div>
                <Outlet />
                <Footer />
              </div>
            }
          >
            <Route path="verification">
              <Route index element={<VerificationPage />} />
              <Route path="success" element={<VerificationSuccess />} />
              <Route path="*" element={<Error404Page />} />
            </Route>
            <Route index element={<Homepage />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/items" element={<Outlet />}>
              <Route index element={<Items />} />
              <Route path=":id" element={<SelectedItem />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
