import { Navigate } from "react-router-dom";
import { getUserInfo } from "../../utils/helpers";

export default function AuthLayout({ children, isPublic }) {
  const userInfo = getUserInfo();

  if (isPublic && userInfo) {
    return <Navigate to="/" replace />;
  }

  if (!isPublic && !userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
