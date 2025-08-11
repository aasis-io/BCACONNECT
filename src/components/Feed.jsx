// Feed.jsx
import React from "react";
import { FaBookmark } from "react-icons/fa";

const sharedNotes = [
  {
    id: 1,
    title: "DSA Quick Reference",
    description: "Handwritten notes covering all major DSA topics.",
    subject: "Data Structures",
    uploader: "Sita Sharma",
    date: "2 hours ago",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 2,
    title: "OOP Notes PDF",
    description: "Clean and concise PDF of Object-Oriented Programming notes.",
    subject: "OOP",
    uploader: "Ram Thapa",
    date: "1 day ago",
    image: "https://via.placeholder.com/400x250",
  },
];

const Feed = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Feed</h2>

      <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
        {sharedNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-md shadow-sm border border-gray-100 hover:shadow transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {note.uploader.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {note.uploader}
                  </p>
                  <p className="text-xs text-gray-500">{note.date}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-600">
                <FaBookmark />
              </button>
            </div>

            <h3 className="text-base font-semibold text-blue-700 mb-1">
              {note.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{note.description}</p>

            {note.image && (
              <img
                src={note.image}
                alt="Note preview"
                className="rounded-md border border-gray-200"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
