import Promo from "./Promo/Promo.js";
import Project from "./Project/Project.js";
import Techno from "./Techo/Techno.js";
import Student from "./Student/Student.js";
import Portfolio from "./Portfolio/Portfolio.js";
import Footer from "../Footer/Footer.js";

function Main() {
  return (
    <div>
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
