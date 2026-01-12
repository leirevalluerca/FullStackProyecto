import "./Register.css";
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const birthdateRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                name: nameRef.current.value,
                surname: surnameRef.current.value,
                birthdate: birthdateRef.current.value,
                email: emailRef.current.value,  
                password: passwordRef.current.value
            })
        })
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        })
        .catch(() => {
            setError('Server error. Please try again later.');
        });
    }

    return(
        <div className="register-page">
            <div className="register-container">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>

                    <div className="register-group">
                        <input
                            id="name"
                            type="text"
                            ref={nameRef}
                            required
                            placeholder=" "
                        />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="register-group">
                        <input
                            id="surname"
                            type="text"
                            ref={surnameRef}
                            required
                            placeholder=" "
                        />
                        <label htmlFor="surname">Surname</label>
                    </div>
                    
                    <div className="register-group">
                        <input
                            id="username"
                            type="text"
                            ref={usernameRef}
                            required
                            placeholder=" "
                        />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className="register-group">
                        <input
                            id="birthdate"
                            type="date"
                            ref={birthdateRef}
                            required
                            placeholder=" "
                        />
                        <label htmlFor="birthdate">Birthdate</label>
                    </div>

                    <div className="register-group">
                        <input
                            id="email"
                            type="email"
                            ref={emailRef}
                            required
                            placeholder=" "
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="register-group">
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
                        <div className="register-error">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>

                <Link to="/login">I already have an account</Link>
            </div>
        </div>
    )
}
export default Register;