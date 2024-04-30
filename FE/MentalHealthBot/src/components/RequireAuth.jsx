/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../utils/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { token } = useAuth();
  const location = useLocation();

  return (
    // eslint-disable-next-line no-extra-boolean-cast
    !!token && allowedRoles?.includes(token.BU_Type) ?
      <Outlet />
     : !!token ? 
     <Navigate to="/dashboard" state={{ from: location }} replace />
     :
      <Navigate to="/" state={{ from: location }} replace />
    
  );
};

export default RequireAuth;
