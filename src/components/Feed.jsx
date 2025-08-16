import React, { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  const fetchPosts = () => {
    axiosInstance
      .get("/post/getAllPosts")
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const fetchUser = () => {
    axiosInstance
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setUserRole(res.data.data.roles?.[0]); // assuming single role
      })
      .catch((err) => console.error("Failed to fetch user role", err));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/post/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
      alert("Error deleting post");
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Feed</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              userRole={userRole}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;