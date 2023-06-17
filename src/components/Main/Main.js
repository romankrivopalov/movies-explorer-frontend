import Promo from "./Promo/Promo.js";
import Project from "./Project/Project.js";
import Techno from "./Techo/Techno.js";
import Student from "./Student/Student.js";
import Portfolio from "./Portfolio/Portfolio.js";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";

function Main() {
  return (
    <div className="main">
      <Header/>
      <Promo/>
      <Project/>
      <Techno/>
      <Student/>
      <Portfolio/>
      <Footer/>
    </div>
  )
}

export default Main;
