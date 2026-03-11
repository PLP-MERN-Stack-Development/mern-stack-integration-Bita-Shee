import { getAllCategories } from "../lib/category"; 
import { createPost, updatePost } from "../lib/posts";
import { useEffect, useState } from "react";
import stylesA from "../css/Button.module.css";
import stylesB from "../css/CreatePost.module.css";

const CreatePost = ({ editingPost, onPostUpdated, closeEditor }) => {
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [post, setPost] = useState({
    title: "",
    content: "",
    image: null,
   });

   useEffect(() => {
    const fetchCategories = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

    fetchCategories();
    }, []);

    useEffect(() => {
        if (editingPost) {
            setSelectedCategory(editingPost.category._id);
            setPost({
                title: editingPost.title,
                content: editingPost.content,
                image: null
            });
        }
    }, [editingPost]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (!selectedCategory || !post.title || !post.content || (!post.image && !editingPost)) {
        alert("All fields are required");
        return;
        }

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        formData.append("category", selectedCategory);
        if (post.image) {
         formData.append("image", post.image);
        }

        if (editingPost) {
        await updatePost(editingPost._id, formData);
        alert("Post updated successfully");

        setPost({ title: "", content: "", image: null });
        setSelectedCategory("");
        onPostUpdated();
        closeEditor();
        } else {
        await createPost(formData);
        setPost({
            title: "",
            content: "",
            image: null
        });
        setSelectedCategory("");
        alert("Post created successfully");
        }

    } catch (err) {
        console.error(err.response?.data || err.message);
    }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Category</legend>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </fieldset>

            <input className={stylesB.title} type="text" placeholder="Title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} /><br />
            <textarea className={stylesB.content} placeholder="Content" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} /><br />
            <input type="file" accept="image/*" onChange={(e) => setPost({ ...post, image: e.target.files[0] })} />
            <button className={stylesA.primary} type="submit">{editingPost ? "UpdatePost" : "Create Post"}</button>
        </form>
        </>
    )
};

export default CreatePost;
