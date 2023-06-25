import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import mainApi from '../../utils/MainApi.js';

function App() {
  const navigate = useNavigate(),
        userIdInLocalStorage = localStorage.getItem('userId'),
        [ currentUser, setCurrentUser ] = useState({
          name: null,
          email: null,
          loggeIn: !!userIdInLocalStorage,
        }),
        [ toggleShortMovie, setToggleShortMovie ] = useState(false)

  useEffect(() => {
    if (userIdInLocalStorage) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser({ ...data, loggeIn: true });
        })
    }
  }, [userIdInLocalStorage]);

  const handleToggleShortMovie = () => {
    setToggleShortMovie(!toggleShortMovie);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/'
          element={<Main/>}
        />

        <Route
          path='/movies'
          element={<ProtectedRouteElement
            element={Movies}
            toggleShortMovie={toggleShortMovie}
            onToggleShortMovie={handleToggleShortMovie}
          />}
        />

        <Route
          path='/saved-movies'
          element={<ProtectedRouteElement
            element={SavedMovies}
            toggleShortMovie={toggleShortMovie}
            onToggleShortMovie={handleToggleShortMovie}
          />}
        />

        <Route
          path='/profile'
          element={<ProtectedRouteElement
            element={Profile}
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
