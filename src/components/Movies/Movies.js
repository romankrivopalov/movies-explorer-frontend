import Header from '../Header/Header.js';
import SearchForm from './SearchForm/SearchForm.js';

import Footer from '../Footer/Footer.js'

function Movies() {
  return(
    <div className="layout">
      <Header/>
      <SearchForm/>

      <Footer/>
    </div>
  )
}

export default Movies;
