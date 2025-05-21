import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function LoginPage({ onLogin }: { onLogin: () => void }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const name = "AlyShah";
    const pass = "AlyShah123";

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user?.userName) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        await new Promise((resolve) => setTimeout(resolve, 800));

        if (userName === name && password === pass) {
            localStorage.setItem("user", JSON.stringify({ userName }));
            onLogin();
            navigate("/");
        } else {
            setError("Invalid username or password. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <div className="background">
            <div className="login-container">
                <div className="login-card">
                    <div className="brand-section">
                        <div className="brand-content">
                            <img className="app-image" src="/images/logo5.png" alt="App illustration" />
                        </div>
                        <div className="col left-background ">
                            <p>Powerd By INNOVISTA INDUS</p>
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-content">
                            <h2 className="form-title">Welcome Back</h2>
                            <p className="form-subtitle">Login to your account</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>

                                {error && (
                                    <div className="error-message">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading-spinner"></span>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}