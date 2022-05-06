import './BagModal.css';
import Modal from 'components/Modal/Modal';
import { BagServices } from 'services/BagServices';
import { useEffect, useState } from 'react';
import { BookServices } from 'services/BookServices';

function BagModal({ closeModal }) {
  const [list, setList] = useState([]);

  const purchase = async () => {
    await BagServices.purchase();
    // ROTAS/NAVEGAÇÃO AQUI
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
      const newList = bagList.map(({ bookId, amount }) => ({
        name: findName(bookId),
        amount,
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
          {list.map((i, idx) => (
            <div key={idx}>
              {' '}
              {i.title + ' ' + i.amout + 'x'} <br />
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
