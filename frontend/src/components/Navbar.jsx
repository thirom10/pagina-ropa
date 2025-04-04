// Icons
import { LuHandMetal } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";
// Routes
import { Link } from "react-router-dom";
// Styles
import "./styles/navbar.css";
const Navbar = () => {
  return (
    <nav>
      <div className="title">
        <LuHandMetal size={26}/>
        <h1><span>Micho's</span> Clothes</h1>
      </div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/catalog"}>Catalog</Link>
        </li>
        <li>
          <Link to={"/bands"}>Bands</Link>
        </li>
        <li>
          <Link to={"contact"}>Contact</Link>
        </li>
      </ul>
      <div className="settings">
        <LuUserRound size={18}/>
        <LuShoppingCart size={18}/>
        <button className="dark-btn">
          Login
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
