// AddNote.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AddNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, file } = formData;

    if (!title || !file) {
      toast.error("Please provide both title and file.");
      return;
    }

    // API submission logic would go here
    toast.success(`${title} uploaded successfully!`);

    setFormData({
      title: "",
      description: "",
      file: null,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter a note title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Optional description for your note"
          ></textarea>
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            required
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;