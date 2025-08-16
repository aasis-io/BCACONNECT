import React from "react";

const NoteCard = ({ note }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-800">
            {note.subject}
          </h3>
          <p className="text-sm text-gray-500">{note.semester} Sem</p>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-600">
            Uploaded by: {note.userResponse.fullName}
          </p>
          <p className="text-sm text-gray-500">
            Email: {note.userResponse.email}
          </p>
        </div>

        {note.fileUrl && (
          <div className="mb-3">
            <a
              href={note.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              <span className="font-semibold">View Note:</span> {note.fileName}
            </a>
          </div>
        )}

        <div className="mt-3 text-sm text-gray-500">
          <p>Uploaded on: {new Date(note.date).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;