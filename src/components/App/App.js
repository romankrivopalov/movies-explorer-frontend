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
        [ appIsLoad, setAppIsLoad ] = useState(false),
        [ currentUser, setCurrentUser ] = useState({
          name: null,
          email: null,
          loggeIn: !!userIdInLocalStorage,
        }),
        [ toggleShortMovie, setToggleShortMovie ] = useState(false),
        [ saveCards, setSaveCards ] = useState([]);


  useEffect(() => {
    if (userIdInLocalStorage) {
      mainApi.getUserInfo()
        .then(data => {
          setCurrentUser({ ...data, loggeIn: true });
        })
        .catch(() => localStorage.removeItem(userIdInLocalStorage));

      mainApi.getAllSavedMovies()
        .then(res => setSaveCards(res))
        .then(() => setAppIsLoad(true))
    } else {
      setAppIsLoad(true);
    }
  }, [userIdInLocalStorage]);

  const handleDeleteSaveMovie = (movie) => {
    const movieId = movie.movieId || movie.id;
    const movieForDelete = saveCards.find(movie => movie.movieId || movie.id === movieId);

    mainApi.deleteSavedMovie(movieForDelete)
      .then(setSaveCards(saveCards.filter(c => c.movieId && movie.id !== movieId)))
  };

  const handleToggleShortMovie = (value) => {
    setToggleShortMovie(value);
  }

  return (
    ( appIsLoad &&
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
    )
  );
}

export default App;
