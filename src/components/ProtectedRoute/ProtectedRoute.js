import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return (
    props.currentUser.loggeIn ? <Component {...props} /> : <Navigate to="/signin" replace />
)};

export default ProtectedRouteElement;
