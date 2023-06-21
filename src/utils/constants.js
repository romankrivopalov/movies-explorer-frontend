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
const mainApiSetting = {
  baseUrl: 'https://api.krivo.nomoredomains.rocks',
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
const saveCardList = [
  {
    country: 'США',
    director: 'Стивен Содерберг',
    duration: 116,
    year: 2001,
    description: 'После выхода из тюрьмы вора Дэнни Оушена не проходит и 24 часов, а он уже планирует организовать самое сложное ограбление казино в истории. Он хочет украсть 160 млн американских долларов из трёх самых преуспевающих казино Лас-Вегаса. Все эти казино принадлежат элегантному и в то же время жестокому дельцу Терри Бенедикту, который только и мечтает о том, как встретится с бывшей женой Дэнни Оушена - Тесс.',
    image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/02636f2c-4a48-4a9c-a160-c3c60f732064/1920x',
    trailerLink: 'https://link.ru',
    thumbnail: 'https://link.ru',
    movieId: 11,
    nameRU: 'Одиннадцать друзей Оушена',
    nameEN: "Ocean's Eleven",
  },
  {
    country: 'США',
    director: 'Стивен Содерберг',
    duration: 120,
    year: 2004,
    description: 'ангстер Денни Оушен собрал свою банду профессиональных грабителей и мошенников, и теперь там появились новые лица. Они задумали совершить три ограбления в европейских столицах. Владелец казино Терри Бенедикт, которого Оушен ограбил в Лас-Вегасе, жаждет мести и пытается настигнуть банду. За ней также охотятся агенты Европола и Диннер Джекет.',
    image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/747d0cb6-1f28-4315-a4f5-8465ab49f371/1920x',
    trailerLink: 'https://link.ru',
    thumbnail: 'https://link.ru',
    movieId: 12,
    nameRU: 'Двенадцать друзей Оушена',
    nameEN: "Ocean's Twelve",
  },
];
