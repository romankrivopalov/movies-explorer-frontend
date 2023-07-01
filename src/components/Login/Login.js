import AuthForm from '../AuthForm/AuthForm.js';
import { errorMessage, loginFormSetting } from '../../utils/constants.js';
import mainApi from '../../utils/MainApi.js';

function Login({ setCurrentUser, navigate, requestError, setRequestError }) {
  const handleRegistrationUser = (userData) => {
    mainApi.getAuthorizationUser(userData)
      .then(data => {
        const { name, email, _id } = data;

        if (_id) {
          localStorage.setItem('userId', data._id);
          setCurrentUser(oldState => ({ name, email, loggeIn: true }));
          navigate('/movies');
        };

        setCurrentUser(null);
      })
      .catch(() => setRequestError(errorMessage.errorRequest));
  }

  return (
    <div className="layout layout_full-heigth-1row">
      <AuthForm
        setting={loginFormSetting}
        handleSubmit={handleRegistrationUser}
        requestError={requestError}/>
    </div>
  );
};

export default Login;
