import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <nav className="navbar">
                <div className="logo"> 📚 BookVerse </div>
                <div className="nav-links">
                    <button>Books</button>
                    <button>Authors</button>
                </div>
            </nav>
            <section className="hero">
                <div className="hero-content">
                    <p className="tagline">  Your Personal Digital Library </p>
                    <h1>  Discover, Organize & Manage Your Favorite Books </h1>
                    <p className="description"> Store books, explore authors, search collections, and build your own reading universe. </p>
                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={() => navigate("/books")} > 📖 Explore Books </button>
                        <button className="secondary-btn"> ➕ Add Book </button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="book-card"> 📚 </div>
                </div>
            </section>
        </div>
    );
}

export default Home;