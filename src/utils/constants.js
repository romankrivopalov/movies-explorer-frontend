export
const mainApiSetting = {
  // baseUrl: 'https://api.krivo.nomoredomains.rocks',
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: 'bdecdc76-75a5-40e2-94d6-35ac4e7b5bcc',
    'Content-Type': 'application/json'
  }
}

export
const moviesApiSetting = {
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
}

export
const birthDate = {
  birthDate: new Date(1992, 6, 28),
  dateTitles: ['год', 'года', 'лет'],
}

export
const durationTitles = ['минута', 'минуты', 'минут'];

export
const loginFormSetting = {
  type: 'login',
  title: 'Рады видеть!',
  btnSubmitText: 'Войти',
  transitionText: 'Ещё не зарегистрированы?',
  transitionPath: '/signup',
  transitionLinkText: 'Регистрация',
}

export
const registerFormSetting = {
  type: 'register',
  title: 'Добро пожаловать!',
  btnSubmitText: 'Зарегистрироваться',
  transitionText: 'Уже зарегистрированы?',
  transitionPath: '/signin',
  transitionLinkText: 'Войти',
}

export
const inputErrorNameList = {
  name: 'Имя не должно быть короче 2 букв',
  email: 'Введите корректный email',
  password: 'Пароль должен быть не короче 8 символов',
}
