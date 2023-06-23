import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import mainApi from '../../utils/MainApi.js';

function App() {
  const navigate = useNavigate(),
        [ currentUser, setCurrentUser ] = useState({
          name: 'Роман',
          email: 'test@mail.ru',
          loggeIn: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('userId');

    if (token) {
      mainApi.checkValidityUser()
        .then((data) => {
          setCurrentUser({ ...data, loggeIn: true });
        })
        .then(() => {
          navigate("/", {replace: true});
        });
    }
  }, [navigate])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/'
          element={<Main/>}
        />

        <Route
          path='/movies'
          element={<Movies/>}
        />

        <Route
          path='/saved-movies'
          element={<SavedMovies/>}
        />

        <Route
          path='/profile'
          element={<Profile/>}
        />

        <Route
          path='/signin'
          element={<Login
            setLoggedIn={setCurrentUser}
          />}
        />

        <Route
          path='/signup'
          element={<Register
            navigate={navigate}
          />}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
