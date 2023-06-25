import AuthForm from '../AuthForm/AuthForm.js';
import { loginFormSetting } from '../../utils/constants.js';
import mainApi from '../../utils/MainApi.js';

function Login({ setCurrentUser, navigate }) {
  const handleRegistrationUser = (userData) => {
    mainApi.getAuthorizationUser(userData)
      .then(data => {
        const { name, email, _id } = data;

        if (_id) {
          localStorage.setItem('userId', data._id);
          setCurrentUser(oldState => ({ name, email, loggeIn: true }));
          navigate('/movies');
        };
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="layout layout_full-heigth-1row">
      <AuthForm
        setting={loginFormSetting}
        handleSubmit={handleRegistrationUser}/>
    </div>
  );
};

export default Login;
