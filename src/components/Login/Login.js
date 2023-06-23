import AuthForm from '../AuthForm/AuthForm.js';
import { loginFormSetting } from '../../utils/constants.js';
import mainApi from '../../utils/MainApi.js';

function Login({ setLoggedIn, navigate }) {
  const handleRegistrationUser = (userData) => {
    mainApi.getAuthorizationUser(userData)
      .then(data => {
        if (data._id) {
          localStorage.setItem('userId', data._id);
          setLoggedIn(oldState => ({ ...oldState, loggeIn: true }));
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="layout layout_full-heigth-1row">
      <AuthForm
        setting={loginFormSetting}
        handleSubmit={handleRegistrationUser}/>
    </div>
  )
}

export default Login;
