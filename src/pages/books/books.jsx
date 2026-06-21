import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Books.css";
import api from "../../service/api";

function Books() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchBooks();
    }, [search]);


    const fetchBooks = async () => {
        try {
            const response = await api.get(`/all/books?filter=title&value=${search}`);
            setBooks(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/delete/book/${id}`);

            setBooks((prevBooks) =>
                prevBooks.filter(
                    (book) => book._id !== id
                )
            );

            alert("Book deleted successfully");
        } catch (error) {
            console.log(error);
            alert("Unable to delete book");
        }
    };

    const handleEdit = (id) => {
        navigate(`/books/add/${id}`);
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f5f7fb", padding: 30, }} >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, }} >
                <div>
                    <p style={{ margin: 0, fontSize: 12, color: "#2563eb" }} > 📚 My Library </p>
                    <h2 style={{ marginTop: 5, marginBottom: 0, fontSize: 24, }} > Explore Books </h2>
                </div>
                <button
                    onClick={() => navigation.navigate('/books/add')}
                    style={{ border: "none", padding: "10px 18px", borderRadius: 8, background: "#2563eb", color: "#fff", cursor: "pointer", fontSize: 13, }}
                > + Add Book
                </button>
            </div>
            <input type="text" placeholder="🔍 Search books..."
                style={{ width: "100%", height: 40, border: "1px solid #ddd", borderRadius: 10, padding: "0 14px", marginBottom: 25, fontSize: 13, outline: "none", }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, }} >
                {books.map((book) => (
                    <div
                        key={book._id}
                        style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", minHeight: 140, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", justifyContent: "space-between", }}
                    >
                        <div>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 12, }} >
                                {book.title}
                            </p>
                            <p style={{ margin: 0, fontSize: 12, color: "#4b5563", marginBottom: 8, }} >
                                Category : {book.category}
                            </p>
                            <p style={{ margin: 0, fontSize: 12, color: "#6b7280", }} >
                                Published : {book.publishedYear}
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, }} >
                            <button
                                onClick={() => handleEdit(book._id)}
                                style={{ border: "none", background: "#2563eb", color: "#fff", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, }}
                            > ✏️ Edit
                            </button>
                            <button
                                onClick={() =>
                                    handleDelete(book._id)
                                }
                                style={{ border: "none", background: "#dc2626", color: "#fff", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, }}
                            > 🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Books;