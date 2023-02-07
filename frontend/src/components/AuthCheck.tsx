import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export interface IAuthCheckProps {
  children: JSX.Element;
}

export default function AuthCheck({ children }: IAuthCheckProps) {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
