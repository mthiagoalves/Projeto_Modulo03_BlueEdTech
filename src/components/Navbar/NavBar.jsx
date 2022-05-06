import './NavBar.css';
import { ActionMode } from 'constants/index';
import cart from 'assets/icons/cart.png';
import add from 'assets/icons/add-books.png';
import logo from 'assets/logo.png';
import edit from 'assets/icons/book-edit.png';
import delet from 'assets/icons/book-delete.png';

function NavBar({ createBook, updateBook, mode, deleteBook, openBag }) {
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
        <div className="Header__opcoes Options">
          <button
            type="button"
            className="options-books books"
            onClick={() => createBook()}
          >
            <img src={add} className="book-icon" alt="add books" />
          </button>
          <button
            type="button"
            className={`options-books books ${
              mode === ActionMode.UPDATE && 'book-action'
            }`}
            onClick={() => updateBook()}
          >
            <img
              src={edit}
              width="40px"
              className="book-icon"
              alt="Update Book"
            />
          </button>
          <button
            type="button"
            className={`options-books books ${
              mode === ActionMode.DELET && 'book-delete'
            }`}
            onClick={() => deleteBook()}
          >
            <img
              src={delet}
              width="40px"
              className="book-icon"
              alt="Update Book"
            />
          </button>

          <div className="Opcoes__sacola Sacola" onClick={openBag}>
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
