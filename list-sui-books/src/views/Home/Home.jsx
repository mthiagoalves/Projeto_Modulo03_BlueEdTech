import BookList from "components/BooksList/BookList";
import { useState } from "react";
import AddBooksModal from "components/AddBooksModal/AddBooksModal";
import "./Home.css";
import NavBar from "components/Navbar/NavBar";

function Home() {
  const [canShowBookModal, setCanShowBookModal] = useState(false);

  return (
    <div className="Home">
      <NavBar createBook={() => setCanShowBookModal(true)} />
      <div className="home-container">
        <BookList />
        {
          canShowBookModal && (<AddBooksModal closeModal={() => setCanShowBookModal(false)}/>)
        }
      </div>
    </div>
  );
}

export default Home;
