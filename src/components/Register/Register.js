import AuthForm from '../AuthForm/AuthForm.js';
import { errorMessage, registerFormSetting } from '../../utils/constants.js';
import mainApi from '../../utils/MainApi.js';

function Register({ navigate, requestError, setRequestError }) {
  const handleRegistrationUser = (userData) => {
    mainApi.getRegistrationUser(userData)
      .then(data => {
        navigate("/signin");
      })
      .catch(() => setRequestError(errorMessage.repeatedEmail));
  };

  return (
    <div
      className="layout layout_full-heigth-1row">
      <AuthForm
        setting={registerFormSetting}
        handleSubmit={handleRegistrationUser}
        requestError={requestError}/>
    </div>
  )
};

export default Register;
