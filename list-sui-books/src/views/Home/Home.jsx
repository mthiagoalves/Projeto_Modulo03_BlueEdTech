import BookList from "components/BooksList/BookList";
import "./Home.css";
import NavBar from "components/Navbar/NavBar";

function Home() {
  return (
    <div className="Home">
      <NavBar />
      <div className="home-container">
        <BookList />
      </div>
    </div>
  );
}

export default Home;
