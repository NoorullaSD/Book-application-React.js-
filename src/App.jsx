import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login.jsx";
import Home from "./pages/Home/home.jsx";
import Books from "./pages/books/books.jsx";
import AddBook from "./pages/addBooks/addbook.jsx";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/add" element={<AddBook />} />
      <Route path="/books/add/:id" element={<AddBook />} />
    </Routes>
  );
}

export default App;