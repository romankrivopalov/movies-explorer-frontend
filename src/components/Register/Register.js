import AuthForm from '../AuthForm/AuthForm.js';
import { registerFormSetting } from '../../utils/constants.js';

function Register() {
  return (
    <div className="layout layout_full-heigth-1row">
      <AuthForm
        setting={registerFormSetting}/>
    </div>
  )
}

export default Register;
