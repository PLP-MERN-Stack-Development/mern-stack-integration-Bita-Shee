import { createPortal } from "react-dom";
import { useState } from "react";
import { createCategory } from "../lib/category";
import stylesA from "../css/Button.module.css";
import stylesB from "../css/CategoryCard.module.css";

const CategoryCard = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");

    if (!isOpen) return null;

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert("Category name is required");
            return;
        }

        await createCategory(name);
        setName("");
        onClose();
    }

    return createPortal(
        <div>
            <form className={stylesB.modal} onSubmit = {handlesubmit} >
                <div className={stylesB.modalContent}>
                <h3>Create Category</h3>
                <input
                    type="text"
                    placeholder="Category Name"
                    className={stylesB.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <button className={stylesA.primary} type="submit">
                    Create
                </button>
                <button className={stylesA.danger} type="button" onClick={onClose}>
                    Cancel
                </button>
                </ div>
            </form>
        </div>,
        document.getElementById("modal-root")
        );         
};

export { CategoryCard };