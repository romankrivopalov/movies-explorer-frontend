import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "../Header/Header.js";

function App() {
  const [ loggeIn, setLoggeIn ] = useState(true);
  const [ openBurger, setOpenBurger ] = useState(false);

  function handleToggleBurger() {
    setOpenBurger(!openBurger);
  }

  return (
    <div className="content">
      <Header
        loggeIn={loggeIn}
        isOpenBurger={openBurger}
        isToggleBurger={handleToggleBurger}/>

      {/* <Routes>
        <Route
          path='/'
        />

        <Route
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
        />
      </Routes> */}

    </div>
  );
}

export default App;
