import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/AxiosInstance";
import PostCard from "../../components/PostCard";

const PostApproval = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visiblePost, setVisiblePost] = useState(null);
  const [userRole] = useState("MOD");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetchPostsForApproval();
  }, []);

  const fetchPostsForApproval = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/moderator/unverifiedPosts", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setPosts(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch posts", error);
      toast.error("Error loading posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (postId, verified) => {
    console.log("Sending to backend:", { id: postId, verified });
    try {
      await axiosInstance.post(
        `/moderator/verifyPost`,
        { id: postId, verified },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      toast.success(`Post ${verified ? "approved" : "rejected"} successfully`);
      fetchPostsForApproval();
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update post status");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Posts for Approval</h2>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No pending posts found.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">SN</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{post.caption}</td>
                <td className="p-2 border">
                  {post.userResponse?.fullName || "Unknown"}
                </td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      post.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : post.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status || "PENDING"}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => setVisiblePost(post)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleStatusChange(post.id, 1)}
                    className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(post.id, 0)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {visiblePost && (
        <Dialog
          header="Post Preview"
          visible={!!visiblePost}
          style={{ width: "50vw" }}
          onHide={() => setVisiblePost(null)}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        >
          {visiblePost && <PostCard post={visiblePost} userRole={userRole} />}
        </Dialog>
      )}
    </div>
  );
};

export default PostApproval;