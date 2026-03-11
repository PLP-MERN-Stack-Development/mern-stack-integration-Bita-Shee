import useAuth from "../hooks/useAuth";
import { CategoryCard } from "./CategoryCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import stylesA from "../css/Button.module.css";
import stylesB from "../css/Navbar.module.css";

const Navbar = () => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={stylesB.nav}>
        <nav className={stylesB.nav1}>
            <h2>My Blog App</h2>
            <div>
                <button className={stylesA.secondary} onClick={() => setIsOpen(true)}>
                    Create Category
                </button>
                <button className={stylesA.danger} onClick={logout}>Logout</button>
            </div>

        <CategoryCard isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </nav>
        <nav className={stylesB.nav2}>
            <Link to="/">Posts</Link>
            <Link to="/create">CreatePost</Link>
        </nav>
        </div>
    )
};

export default Navbar;