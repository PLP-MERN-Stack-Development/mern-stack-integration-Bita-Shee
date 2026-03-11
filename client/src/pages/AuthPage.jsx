import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import stylesA from "../css/AuthPage.module.css";
import stylesB from "../css/Button.module.css";

const AuthPage = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password);
            }
            navigate("/");
        } catch (error) {
            alert(error.message || "Authentication failed");
        }
    };

    return (
        <form className={stylesA.form} onSubmit={handleSubmit}>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            <button className={stylesB.primary} type="submit">{isLogin ? "Login" : "Register"}</button>
            <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsLogin(!isLogin)}
            >
            {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
           </p>
        </form>
    );
};

export default AuthPage;