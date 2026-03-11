import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getPostById, getCommentsByPost, createComment, deleteComment } from "../lib/posts";
import { deletePost } from "../lib/posts";
import { useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";
import stylesA from "../css/Button.module.css";
import stylesB from "../css/SinglePost.module.css"

const SinglePost = () => {

  const { postId } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const fetchData = useCallback(async () => {
    const [postData, commentsData] = await Promise.all([
      getPostById(postId),
      getCommentsByPost(postId)
    ]);

    setPost(postData);
    setComments(commentsData);
  }, [postId]);


  useEffect(() => {
      fetchData();
    }, [fetchData]);

  if (!post) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = await createComment(postId, text);

    setComments(prev => [...prev, newComment]);
    setText("");
  };

  const handleDelete = async (id) => {
    await deleteComment(postId, id);
    setComments(comments.filter(c => c._id !== id));
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Delete this post?");
  
    if (!confirmDelete) return;
    await deletePost(postId);
    navigate("/");
  };

  return (
    <div>

      <h3>{post.category.name}</h3>
      <h2>{post.title}</h2>
      <p>{post.author.email}</p>
      <p>{post.content}</p>
      <img className={stylesB.image} src={post.image.url} alt={post.title} />

      <button className={stylesA.secondary} onClick={() => setEditing(true)}>Edit Post</button>
      <button className={stylesA.danger} onClick={handleDeletePost}>Delete Post</button>

      {editing && (
        <CreatePost
          editingPost={post}
          onPostUpdated={fetchData}
          closeEditor={() => setEditing(false)}
        />
      )}

      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment"
        />
        <button type="submit" className={stylesA.primary}>Submit</button>
      </form>

      {comments?.map(comment => (
        <div key={comment._id}>
          <p>{comment?.author?.email}</p>
          <p>{comment?.text}</p>

          <button className={stylesA.danger} onClick={() => handleDelete(comment._id)}>
            Delete
          </button>
        </div>
      ))}

    </div>
  );
};

export default SinglePost;