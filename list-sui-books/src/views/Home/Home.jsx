import BookList from "components/BooksList/BookList";
import { useState } from "react";
import AddEditBooksModal from "components/AddEditBooksModal/AddEditBooksModal";
import "./Home.css";
import NavBar from "components/Navbar/NavBar";
import { ActionMode } from "constants/index";

function Home() {
  const [canShowBookModal, setCanShowBookModal] = useState(false);
  const [bookToAdd, setBookToAdd] = useState();
  const [currentyMode, setCurrentyMode] = useState(ActionMode.NORMAL);

  const [bookForEdit, setBookForEdit] = useState();
  const [bookForDelete, setBookForDelete] = useState();

  const handleAction = (action) => {
    const newAction = currentyMode === action ? ActionMode.NORMAL : action;
    console.log(newAction);
    setCurrentyMode(newAction);
  };

  const handleDeleteBook = (bookForDelete) => {
    setBookForDelete(bookForDelete);
  };

  const handleUpdateBook = (bookForUpdate) => {
    setBookForEdit(bookForUpdate);
    setCanShowBookModal(true);
  };

  const handleCloseModal = () => {
    setCanShowBookModal(false);
    setBookToAdd();
    setBookForDelete();
    setBookForEdit();
  };

  return (
    <div className="Home">
      <NavBar
        mode={currentyMode}
        createBook={() => setCanShowBookModal(true)}
        updateBook={() => handleAction(ActionMode.UPDATE)}
      />
      <div className="home-container">
        <BookList
          deleteBook={handleDeleteBook}
          updateBook={handleUpdateBook}
          bookCreated={bookToAdd}
          mode={currentyMode}
        />
        {canShowBookModal && (
          <AddEditBooksModal
            mode={currentyMode}
            bookForEdit={bookForEdit}
            closeModal={handleCloseModal}
            onCreateBook={(book) => setBookToAdd(book)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
