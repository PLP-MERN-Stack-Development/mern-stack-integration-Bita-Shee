import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PostList from "./pages/PostList";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout"

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<AuthPage />} /> 

        <Route element={<PrivateRoute />}>

         <Route element={<Layout />}>

          <Route path="/" element={<PostList />} />   
          <Route path="/create" element={<CreatePost />} />
          <Route path="posts/:postId" element={<SinglePost />} />
         
         </Route>

        </Route>

      </Routes>
    </Router>
  );
};

export default App;