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
import { STORAGE_DATA_NAME } from '../../utils/constants.js';

function App() {
  const navigate = useNavigate(),
        userIdInLocalStorage = localStorage.getItem(STORAGE_DATA_NAME.userId),
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

  const setClearValues = () => {
    const movieArrs = [ setMovies, setSaveMovies ],
          valueArrs = [ setIsLoad, setToggleShortMovie, setError, setRequestError ]

    movieArrs.forEach(i => i([]));
    valueArrs.forEach(i => i(null));
    setCurrentUser({
      name: '',
      email: '',
      loggeIn: false,
    });

    localStorage.clear(STORAGE_DATA_NAME.userId);
    sessionStorage.clear(STORAGE_DATA_NAME.movies);
    sessionStorage.clear(STORAGE_DATA_NAME.searchQuery);
    sessionStorage.clear(STORAGE_DATA_NAME.toggleShortMovie);
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
              isLoad={isLoad}
              setIsLoad={setIsLoad}
              element={Profile}
              setCurrentUser={setCurrentUser}
              navigate={navigate}
              setClearValues={setClearValues}
            />}
          />

          <Route
            path='/signin'
            element={!currentUser.loggeIn
              ?
                <Login
                  isLoad={isLoad}
                  setIsLoad={setIsLoad}
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
                  isLoad={isLoad}
                  setIsLoad={setIsLoad}
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
            path='*'
            element={<NotFound/>}
          />
        </Routes>
      </CurrentUserContext.Provider>
    )
  );
}

export default App;
