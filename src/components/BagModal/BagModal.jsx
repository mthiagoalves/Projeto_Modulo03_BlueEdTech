import './BagModal.css';
import Modal from 'components/Modal/Modal';
import { BagServices } from 'services/BagServices';
import { useEffect, useState } from 'react';
import { BookServices } from 'services/BookServices';
import { useNavigate } from 'react-router-dom';

function BagModal({ closeModal }) {
  const navigate = useNavigate();

  const [list, setList] = useState([]);

  const purchase = async () => {
    await BagServices.purchase();
    navigate('/loading');
  };

  const handleClose = async () => {
    await BagServices.purchase();
    closeModal();
  };

  const getLists = async () => {
    const bookLists = await BookServices.getList();
    const bag = await BagServices.getList();

    const findName = (id) => {
      const obj = bookLists.find((i) => i.id === id);

      return (obj && obj.title) ?? '';
    };

    if (Array.isArray(bag)) {
      const newList = bag.map(({ bookId, qtdSelected }) => ({
        title: findName(bookId),
        qtdSelected,
      }));

      setList(newList);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <Modal closeModal={handleClose}>
      <div className="bag-modal">
        <h2>Amont & Books</h2>

        <div>
          {list.map((book, index) => (
            <div key={index}>
              {' '}
              {book.qtdSelected + 'x' + ' - ' + book.title} <br />
            </div>
          ))}
        </div>

        <br />

        <div>
          <button onClick={purchase} className="bag-modal-confirm">
            {' '}
            Sell all{' '}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default BagModal;
