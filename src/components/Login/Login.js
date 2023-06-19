import AuthForm from '../AuthForm/AuthForm.js';
import { loginFormSetting } from '../../utils/constants.js';

function Login() {
  return (
    <div className="layout layout_full-heigth-1row">
      <AuthForm
        setting={loginFormSetting}/>
    </div>
  )
}

export default Login;
