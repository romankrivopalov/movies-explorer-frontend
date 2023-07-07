import AuthForm from '../AuthForm/AuthForm.js';
import { ERROR_MESSAGE, REGISTER_FORM_SETTING } from '../../utils/constants.js';
import mainApi from '../../utils/MainApi.js';

function Register({ isLoad, setIsLoad, navigate, requestError, setRequestError }) {
  const handleRegistrationUser = (userData) => {
    setIsLoad(true);

    mainApi.getRegistrationUser(userData)
      .then(() => {
        navigate("/signin");
      })
      .catch(() => setRequestError(ERROR_MESSAGE.repeatedEmail))
      .finally(() => setIsLoad(false));
  };

  return (
    <div
      className="layout layout_full-heigth-1row">
      <AuthForm
        isLoad={isLoad}
        setting={REGISTER_FORM_SETTING}
        handleSubmit={handleRegistrationUser}
        requestError={requestError}/>
    </div>
  );
};

export default Register;
