import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import mainApi from '../../utils/MainApi.js';
import NotFound from '../NotFound/NotFound.js';

function App() {
  const navigate = useNavigate(),
        userIdInLocalStorage = localStorage.getItem('userId'),
        [ isLoad, setIsLoad ] = useState(false),
        [ currentUser, setCurrentUser ] = useState({
          name: null,
          email: null,
          loggeIn: !!userIdInLocalStorage,
        }),
        [ movies, setMovies ] = useState([]),
        [ toggleShortMovie, setToggleShortMovie ] = useState(false),
        [ saveMovies, setSaveMovies ] = useState([]),
        [ error, setError ] = useState(null),
        [ requestError, setRequestError ] = useState(null);

  useEffect(() => {
    if (userIdInLocalStorage) {
      mainApi.getUserInfo()
        .then(data => {
          setCurrentUser({ ...data, loggeIn: true });
        })
        .catch(() => localStorage.removeItem(userIdInLocalStorage));

      mainApi.getAllSavedMovies()
        .then(res => setSaveMovies(res))
        .catch(err => console.log(err))
    }
  }, [userIdInLocalStorage]);

  const handleDeleteSaveMovie = (movie) => {
    const movieId = movie.movieId || movie.id;
    const movieForDelete = saveMovies.find(movie => movie.movieId === movieId || movie.id === movieId);

    mainApi.deleteSavedMovie(movieForDelete)
      .then(setSaveMovies(saveMovies.filter(c => c.movieId !== movieId && c.id !== movieId)))
      .catch(err => console.log(err))
  };

  const handleToggleShortMovie = (value) => {
    setToggleShortMovie(value);
  }

  const handleToggleIsLoad = (value) => {
    setIsLoad(value);
  }

  return (
    (
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/'
            element={<Main/>}
          />

          <Route
            path='/movies'
            element={<ProtectedRouteElement
              currentUser={currentUser}
              isLoad={isLoad}
              setIsLoad={handleToggleIsLoad}
              element={Movies}
              movies={movies}
              setMovies={setMovies}
              saveMovies={saveMovies}
              setSaveMovies={setSaveMovies}
              handleDeleteSaveMovie={handleDeleteSaveMovie}
              toggleShortMovie={toggleShortMovie}
              onToggleShortMovie={handleToggleShortMovie}
              error={error}
              setError={setError}
            />}
          />

          <Route
            path='/saved-movies'
            element={<ProtectedRouteElement
              isLoad={isLoad}
              setIsLoad={handleToggleIsLoad}
              element={SavedMovies}
              saveMovies={saveMovies}
              setSaveMovies={setSaveMovies}
              handleDeleteSaveMovie={handleDeleteSaveMovie}
              toggleShortMovie={toggleShortMovie}
              onToggleShortMovie={handleToggleShortMovie}
              error={error}
              setError={setError}
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
            element={!currentUser.loggeIn
              ?
                <Login
                  setCurrentUser={setCurrentUser}
                  navigate={navigate}
                  requestError={requestError}
                  setRequestError={setRequestError}
                />
              :
                <Navigate to='/movies'/>
            }
          />

          <Route
            path='/signup'
            element={!currentUser.loggeIn
              ?
                <Register
                  navigate={navigate}
                  requestError={requestError}
                  setRequestError={setRequestError}
                />
              :
                <Navigate to='/movies'/>
            }
          />

          <Route
            path='*'
            element={<NotFound/>}
          />
        </Routes>
      </CurrentUserContext.Provider>
    )
  );
}

export default App;
