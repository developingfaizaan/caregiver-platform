import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const RoleRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {

    if (user.user.role === "family" || user.user.role === "agency") {
      console.log("⚠️ You cannot access the HomePage - Job Listing Page!");
     
      return <Navigate to={`/user/${user?.user?.id}`} />;
    }
  }

  return children;
};

export default RoleRoute;
