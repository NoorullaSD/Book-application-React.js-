import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await api.post("/login", { email, password });
            localStorage.setItem(
                "token",
                response.data.token
            );
            navigate("/books");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>📚 BookVerse</h1>
                <p>Welcome back</p>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" disabled={loading} >
                        {
                            loading
                                ? "Signing In..."
                                : "Login"
                        }
                    </button>
                </form>
                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;