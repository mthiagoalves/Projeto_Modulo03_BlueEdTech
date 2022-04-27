import "./NavBar.css";
import cart from "assets/icons/cart.png";
import logo from "assets/logo.png";

function NavBar() {
  return (
    <div className="Home__header Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="70px"
            alt="Logo Books Books"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> Shelves Books </span>
        </div>
        <div className="Header__opcoes Opcoes">
          <div className="Opcoes__sacola Sacola">
            <img
              src={cart}
              width="40px"
              className="Sacola__icone"
              alt="Sacola de compras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
