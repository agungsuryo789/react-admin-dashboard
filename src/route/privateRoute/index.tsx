import { useRecoilValue } from "recoil";
import { userState } from "../../state";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuth } = useRecoilValue(userState);

  if (!isAuth) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
