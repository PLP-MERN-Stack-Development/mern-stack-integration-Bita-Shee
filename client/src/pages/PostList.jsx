import { useEffect, useState } from "react";
import { getPosts } from "../lib/posts";
import { getCategoryById, getAllCategories } from "../lib/category"
import { useNavigate } from "react-router-dom";
import stylesA from "../css/Button.module.css";
import stylesB from "../css/PostList.module.css";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts({
                page,
                search: query,
                category: selectedCategory
            });
            setPosts(data.results);
            setTotalPages(data.totalPages)
        };

        fetchPosts();
    },[page, query, selectedCategory]);

    useEffect(()=>{
        const fetchCategories = async () => {
             const cat = await getAllCategories();
             setCategories(cat);
        };

        fetchCategories()
    },[]);

    if (!posts) return null;

    const handleSearch = async () => {
        const data = await getPosts({
            page: 1,
            search: query
        });

        setPosts(data.results);
    };

    const handleChange = async (e) => {
     const categoryId = e.target.value;
     setSelectedCategory(categoryId);
     const byCategory = await getCategoryById(categoryId);
     setPosts(byCategory.posts);
    };

    return (
        <div>
            <h3>Posts</h3>
            <div>
                <select value={selectedCategory} onChange={handleChange}>
                <option value="">Search By Category</option>
                {categories?.map(category =>
                    <option key={category._id} value={category._id}>
                    {category.name}
                    </option>
                )}
                </select>
                <br />
            
                <input
                type="text"
                value={query}
                className={stylesB.search}
                placeholder= "Search"
                onChange= {e => setQuery(e.target.value)}
                />
                <button className={stylesA.secondary} type = "submit" onClick = {handleSearch}>Enter</button>
            </div>
             <div className={stylesB.box}>
                {posts?.map((post) => (
                    <div className={stylesB.card} key={post?._id} onClick = {() => navigate(`/posts/${post._id}`)}>
                        <p>Category: {post?.category?.name}</p>
                        <p>Author: {post?.author?.email}</p>
                        <h2>{post?.title}</h2>
                        <p>{post?.content}</p>
                        <img className={stylesB.img} src={post?.image?.url} alt={post?.title} />
                    </div>
                ))}
             </div>
                <div className={stylesB.pag}>
                    <button className={stylesA.secondary} disabled={page === 1} onClick={()=> setPage(page - 1)}>
                        Prev
                    </button>
                    <span>{page}</span>
                    <button className={stylesA.primary} disabled={page === totalPages} onClick={()=> setPage(page + 1)}>
                        Next
                    </button>
                </div>
        </div>
    );
};

export default PostList;
