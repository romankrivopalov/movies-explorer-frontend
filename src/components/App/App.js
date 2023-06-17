import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import Main from "../Main/Main.js";

function App() {
  const [ currentUser, setCurrentUser ] = useState({ loggeIn: true });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Routes>
          <Route
            path='/'
            element={<Main/>}
          />

          {/* <Route
            path='/movies'
          />

          <Route
            path='/saved-movies'
          />

          <Route
            path='/signin'
          />

          <Route
            path='/signup'
          /> */}
        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
