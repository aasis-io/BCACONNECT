// RightSidebar.jsx
import React from "react";

const RightSidebar = () => {
  return (
    <aside className="hidden lg:block w-72 bg-white border-l border-gray-200 p-4 space-y-6 sticky top-0 overflow-y-auto">
      {/* <div className="bg-blue-50 p-4 rounded-md shadow-sm">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">
          📢 Announcements
        </h3>
        <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
          <li>Note-sharing for 6th Sem open now!</li>
          <li>Join our Telegram group.</li>
        </ul>
      </div> */}

      {/* Recently Uploaded Notes */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          📄 Recent Uploads
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li className="hover:underline cursor-pointer">
            DSA Handwritten Notes
          </li>
          <li className="hover:underline cursor-pointer">CN Short Q&As</li>
          <li className="hover:underline cursor-pointer">SE Past Papers</li>
        </ul>
      </div>

      {/* Connect Section */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">🤝 Connect</h3>
        <p className="text-xs text-gray-600">
          Want to contribute or need help? Connect with peers and share your
          knowledge!
        </p>
        <button className="mt-3 w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-500">
          Share Your Notes
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
