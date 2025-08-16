import { Trash2 } from "lucide-react";
import React from "react";

const PostCard = ({ post, userRole, onDelete }) => {
  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="bg-white p-4 rounded-md shadow-sm hover:shadow transition">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            {post.userResponse?.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {post.userResponse?.fullName}
            </p>
            <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
          </div>
        </div>

        {onDelete && (userRole === "ADMIN" || userRole === "MODERATOR") && (
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(post.id)}
            title="Delete Post"
          >
            <Trash2 />
          </button>
        )}
      </div>

      <h3 className="text-base font-semibold text-blue-700 mb-1">
        {post.caption}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{post.content}</p>

     <div className="flex gap-4">
     {post.semester && (
        <p className="text-xs text-gray-400">{post.semester} Sem</p>
      )}
      {post.subject && <p className="text-xs text-gray-400">{post.subject}</p>}
     </div>

      {post.fileUrl && (
        <div className="mt-3">
          {post.fileType?.startsWith("image") ? (
            <img
              src={post.fileUrl}
              alt={post.filename}
              className="rounded-md max-h-60"
            />
          ) : post.fileType === "application/pdf" ? (
            <div className="bg-gray-100 p-4 rounded shadow">
              <p className="text-sm mb-2">📄 {post.filename}</p>
              <a
                href={post.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
              >
                View PDF
              </a>
            </div>
          ) : (
            <a
              href={post.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              📄 {post.filename}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;