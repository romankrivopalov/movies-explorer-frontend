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
          name: '',
          email: '',
          loggeIn: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('userId');

    if (token) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser({ ...data, loggeIn: true });
        })
    }
  }, []);

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
          element={<Profile
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            navigate={navigate}
          />}
        />

        <Route
          path='/signin'
          element={<Login
            setCurrentUser={setCurrentUser}
            navigate={navigate}
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
