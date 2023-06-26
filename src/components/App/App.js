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
        [ toggleShortMovie, setToggleShortMovie ] = useState(false),
        [ saveCards, setSaveCards ] = useState([]); // пробросить ы сейвмуви


  useEffect(() => {
    if (userIdInLocalStorage) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser({ ...data, loggeIn: true });
        })
        .catch(() => localStorage.removeItem(userIdInLocalStorage));
    }
  }, [userIdInLocalStorage]);

  const handleDeleteSaveMovie = (movie) => {  // пробросить ы сейвмуви
    mainApi.deleteSavedMovie(movie)
      .then(setSaveCards(saveCards.filter(c => c._id !== movie._id)));
  };

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
            saveCards={saveCards}
            setSaveCards={setSaveCards}
            handleDeleteSaveMovie={handleDeleteSaveMovie}
            toggleShortMovie={toggleShortMovie}
            onToggleShortMovie={handleToggleShortMovie}
          />}
        />

        <Route
          path='/saved-movies'
          element={<ProtectedRouteElement
            element={SavedMovies}
            saveCards={saveCards}
            setSaveCards={setSaveCards}
            handleDeleteSaveMovie={handleDeleteSaveMovie}
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
