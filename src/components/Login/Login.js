import AuthForm from '../AuthForm/AuthForm.js';
import { ERROR_MESSAGE, LOGIN_FORM_SETTING, STORAGE_DATA_NAME } from '../../utils/constants.js';
import mainApi from '../../utils/MainApi.js';

function Login({ isLoad, setIsLoad, setCurrentUser, navigate, requestError, setRequestError }) {
  const handleAuthorizationUser = (userData) => {
    setIsLoad(true);

    mainApi.getAuthorizationUser(userData)
      .then(data => {
        const { name, email, _id } = data;

        if (_id) {
          localStorage.setItem(STORAGE_DATA_NAME.userId, data._id);
          setCurrentUser(oldState => ({ name, email, loggeIn: true }));
          navigate('/movies');
        };
      })
      .catch(() => setRequestError(ERROR_MESSAGE.errorRequest))
      .finally(() => setIsLoad(false));
  }

  return (
    <div className="layout layout_full-heigth-1row">
      <AuthForm
        isLoad={isLoad}
        setting={LOGIN_FORM_SETTING}
        handleSubmit={handleAuthorizationUser}
        requestError={requestError}/>
    </div>
  );
};

export default Login;
