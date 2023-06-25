import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const { loggeIn } = useContext(CurrentUserContext);

  return (
    loggeIn ? <Component {...props} /> : <Navigate to="/signin" replace />
)};

export default ProtectedRouteElement;
