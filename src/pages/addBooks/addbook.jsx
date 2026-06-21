import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";

function AddBook() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState({
        title: "",
        category: "",
        publishedYear: "",
        available: true,
        authorId: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAuthors();
    }, []);

    useEffect(() => {
        if (isEdit) {
            fetchBook();
        }
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await api.get(`/book/${id}`);
            setBook(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await api.get("/all/authors");
            setAuthors(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvailable = (e) => {
        setBook((prev) => ({
            ...prev,
            available: e.target.value === "true",
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!book.title || !book.category || !book.publishedYear || !book.authorId) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            setLoading(true);
            if (isEdit) {
                await api.put(`/update/book/${id}`, book);
                alert("Book update successfully.");
                navigation.navigate("/books")
            }
            else {
                await api.post("/new/book", book);
                alert("Book added successfully.");
            }
            setBook({
                title: "",
                category: "",
                publishedYear: "",
                available: true,
                authorId: "",
            });
        } catch (error) {
            console.log(error);
            isEdit ?
                alert("Unable to edit book.")
                :
                alert("Unable to add book.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{ minHeight: "100vh", background: "#f5f7fb", display: "flex", justifyContent: "center", paddingTop: 40, }}>
            <div style={{ width: 500, background: "#fff", padding: 30, borderRadius: 16, boxShadow: "0 4px 18px rgba(0,0,0,0.08)", }} >
                <h2 style={{ marginTop: 0, marginBottom: 25, }} > 📚 Add Book</h2>
                <form onSubmit={handleSubmit}>
                    <label>Book Title *</label>
                    <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Atomic Habits" required style={inputStyle} />
                    <label>Category *</label>
                    <input type="text" name="category" value={book.category} onChange={handleChange} placeholder="Self Growth" required style={inputStyle} />
                    <label>Publish Year *</label>
                    <input type="number" name="publishedYear" value={book.publishedYear} onChange={handleChange} placeholder="2024" required style={inputStyle} />
                    <label>Available *</label>
                    <select name="available" value={book.available} onChange={handleAvailable} style={inputStyle}  >
                        <option value={true}> True </option>
                        <option value={false}> False </option>
                    </select>
                    <label>Author *</label>
                    <select name="authorId" value={book.authorId} onChange={handleChange} required style={inputStyle} >
                        <option value=""> Select Author </option>
                        {authors.map((author) => (
                            <option key={author._id} value={author._id} >{author.name} </option>
                        ))}
                    </select>
                    <button type="submit" disabled={loading} style={buttonStyle} >
                        {
                            loading
                                ? "Saving..."
                                : "Add Book"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    height: 42,
    marginTop: 8,
    marginBottom: 18,
    padding: "0 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    outline: "none",
    fontSize: 14,
};

const buttonStyle = {
    width: "100%",
    height: 44,
    border: "none",
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    marginTop: 10,
};

export default AddBook;