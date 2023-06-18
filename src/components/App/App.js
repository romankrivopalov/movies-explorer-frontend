import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import Main from "../Main/Main.js";
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

function App() {
  const [ currentUser, setCurrentUser ] = useState({ loggeIn: true });

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

        {/* <Route
          path='/signin'
        />

        <Route
          path='/signup'
        /> */}
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
