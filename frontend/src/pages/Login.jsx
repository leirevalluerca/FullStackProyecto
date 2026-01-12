import "./Login.css";
import { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/use-auth";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || "/";
    const { login } = useAuth();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        })
        .then(async response => {
            const data = await response.json();
            // Comprobacion de response y de que el token exista
            if (response.ok && data.token) {
                login(data.token);
                navigate(redirectTo, { replace: true });
            } else {
                setError('Invalid username or password');
            }
        })
        .catch(() => {
            setError('Server error. Please try again later.');
        });
    };

    return(
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                
                {location.state?.from && (
                <p className="login-info">
                    Inicia sesión para continuar con la reserva
                </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="login-group">
                        <input
                            id="username"
                            type="text"
                            ref={usernameRef}
                            required
                            placeholder=" "
                        />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className="login-group">
                        <input
                            id="password"
                            type="password"
                            ref={passwordRef}
                            required
                            placeholder=" "
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <Link to="/register">I don't have an account yet.</Link>
            </div>
        </div>
    )
}
export default Login;