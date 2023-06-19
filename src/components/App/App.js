import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

function App() {
  const [ currentUser, setCurrentUser ] = useState({
    name: 'Роман',
    email: 'test@mail.ru',
    loggeIn: false,
  });

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
          element={<Login/>}
        />

        <Route
          path='/signup'
          element={<Register/>}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
