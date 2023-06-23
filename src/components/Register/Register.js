import AuthForm from '../AuthForm/AuthForm.js';
import { registerFormSetting } from '../../utils/constants.js';
import mainApi from '../../utils/MainApi.js';

function Register({ navigate }) {
  function handleRegistrationUser(userData) {
    mainApi.getRegistrationUser(userData)
      .then(data => {
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="layout layout_full-heigth-1row">
      <AuthForm
        setting={registerFormSetting}
        handleSubmit={handleRegistrationUser}/>
    </div>
  )
}

export default Register;
