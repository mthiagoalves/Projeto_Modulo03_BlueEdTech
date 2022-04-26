import BookList from "./BookList";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <div className="home-container">
        <BookList />
      </div>
    </div>
  );
}

export default Home;
