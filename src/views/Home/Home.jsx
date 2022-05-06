import BookList from 'components/BooksList/BookList';
import { useState } from 'react';
import AddEditBooksModal from 'components/AddEditBooksModal/AddEditBooksModal';
import './Home.css';
import NavBar from 'components/Navbar/NavBar';
import { ActionMode } from 'constants/index';
import DeleteBookModal from 'components/DeleteBookModal/DeleteBookModal';
import BagModal from 'components/BagModal/BagModal';
import { BagServices } from 'services/BagServices';

function Home() {
  const [canOpenBag, setCanOpenBag] = useState();
  const [canShowBookModal, setCanShowBookModal] = useState(false);
  const [bookToAdd, setBookToAdd] = useState();
  const [currentyMode, setCurrentyMode] = useState(ActionMode.NORMAL);

  const [bookForEdit, setBookForEdit] = useState();
  const [bookForDelete, setBookForDelete] = useState();
  const [bookEdited, setBookEdited] = useState();
  const [bookDeleted, setBookDeleted] = useState();

  const handleAction = (action) => {
    const newAction = currentyMode === action ? ActionMode.NORMAL : action;
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
    setCurrentyMode(ActionMode.NORMAL);
  };

  const openingBag = async () => {
    const list = JSON.parse(localStorage.getItem('bag'));
    const bag = list.filter((i) => i.amount > 0);

    await BagServices.createBag(bag);

    setCanOpenBag(true);
  };

  return (
    <div className="Home">
      <NavBar
        mode={currentyMode}
        openBag={openingBag}
        createBook={() => setCanShowBookModal(true)}
        updateBook={() => handleAction(ActionMode.UPDATE)}
        deleteBook={() => handleAction(ActionMode.DELET)}
      />
      <div className="home-container">
        <BookList
          bookDeleted={bookDeleted}
          bookEdited={bookEdited}
          deleteBook={handleDeleteBook}
          updateBook={handleUpdateBook}
          bookCreated={bookToAdd}
          mode={currentyMode}
        />
        {canShowBookModal && (
          <AddEditBooksModal
            mode={currentyMode}
            bookForEdit={bookForEdit}
            onUpdateBook={(book) => setBookEdited(book)}
            closeModal={handleCloseModal}
            onCreateBook={(book) => setBookToAdd(book)}
          />
        )}
        {bookForDelete && (
          <DeleteBookModal
            bookForDelete={bookForDelete}
            closeModal={handleCloseModal}
            onDeleteBook={(book) => setBookDeleted(book)}
          />
        )}
        {canOpenBag && <BagModal closeModal={() => setCanOpenBag(false)} />}
      </div>
    </div>
  );
}

export default Home;
