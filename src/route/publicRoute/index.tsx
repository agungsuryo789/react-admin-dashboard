import { useRecoilValue } from "recoil";
import { userState } from "../../state";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuth } = useRecoilValue(userState);

  if (isAuth) {
    // Redirect to dashboard if already login
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
