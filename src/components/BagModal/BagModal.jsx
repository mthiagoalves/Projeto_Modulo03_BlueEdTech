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

  const getList = async () => {
    const bookList = await BookServices.getList();
    const bagList = await BagServices.getList();

    const findName = (id) => {
      const obj = bookList.find((i) => i.id === id);
      return (obj && obj.title) ?? '';
    };

    if (Array.isArray(bagList)) {
      const newList = bagList.map(({ bookId, qtdSelected }) => ({
        name: findName(bookId),
        qtdSelected,
      }));

      setList(newList);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Modal closeModal={handleClose}>
      <div className="bag-modal">
        <h2>Books & amount</h2>

        <div>
          {list.map((book, index) => (
            <div key={index}>
              {' '}
              {book.title + ' ' + book.qtdSelected + 'x'} <br />
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
