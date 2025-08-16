import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/AxiosInstance";

const semesterOptions = [
  { label: "First", value: "First" },
  { label: "Second", value: "Second" },
  { label: "Third", value: "Third" },
  { label: "Fourth", value: "Fourth" },
  { label: "Fifth", value: "Fifth" },
  { label: "Sixth", value: "Sixth" },
  { label: "Seventh", value: "Seventh" },
  { label: "Eighth", value: "Eighth" },
];

const subjectMap = {
  First: [
    "English I",
    "Mathematics I",
    "Computer Fundamentals and Applications",
    "Digital Logic",
    "Society and Technology",
  ],
  Second: [
    "English II",
    "Mathematics II",
    "Microprocessor and Computer Architecture",
    "Programming in C",
    "Financial Accounting",
  ],
  Third: [
    "Data Structures and Algorithms",
    "Database Management System (DBMS)",
    "Discrete Mathematics",
    "System Analysis and Design",
    "Business Communication",
  ],
  Fourth: [
    "Operating System",
    "Numerical Methods",
    "Software Engineering",
    "Scripting Language",
    "Web Technology",
  ],
  Fifth: [
    "Object Oriented Programming in Java",
    "Computer Networking",
    "Introduction to Management",
    "Principles of Programming Languages",
    "Project I (Minor Project)",
  ],
  Sixth: [
    "Mobile Programming",
    "Distributed System",
    "Applied Economics",
    "Advanced Java Programming",
    "Project II (Major Project)",
  ],
  Seventh: [
    "Cyber Law and Professional Ethics",
    "Cloud Computing",
    "Internship",
    "Elective I",
  ],
  Eighth: ["IT Security", "Elective II", "Final Project (Dissertation)"],
};

const AddNote = () => {
  const [formData, setFormData] = useState({
    caption: "",
    content: "",
    subject: "",
    semester: null,
    file: null,
    isNote: false,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { caption, content, file, isNote, semester, subject } = formData;

    if (!caption || caption.trim() === "") {
      toast.error("Caption is required.");
      return;
    }

    try {
      const form = new FormData();
      form.append("caption", caption);
      form.append("content", content);
      form.append("isNote", isNote);
      form.append("semester", isNote ? semester : "");
      form.append("subject", isNote ? subject : "");
      if (file) {
        form.append("file", file);
      }

      await axiosInstance.post("/post/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post created  and sent for Approval!");

      setFormData({
        caption: "",
        content: "",
        subject: "",
        semester: null,
        file: null,
        isNote: true,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit post.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isNote"
            name="isNote"
            checked={formData.isNote}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="isNote" className="text-sm text-gray-700">
            This is a Note
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Caption <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2.5 focus:ring-blue-500"
            placeholder="Enter a caption"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            rows="3"
            value={formData.content}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2.5 focus:ring-blue-500"
            placeholder="Optional content for your post"
          />
        </div>

        {formData.isNote && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semester"
                value={formData.semester || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    semester: e.target.value, 
                    subject: "", 
                  })
                }
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-blue-500"
              >
                <option value="">Select Semester</option>
                {semesterOptions.map((sem) => (
                  <option key={sem.value} value={sem.value}>
                    {sem.label}
                  </option>
                ))}
              </select>
            </div>

            {formData.semester && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-blue-500"
                >
                  <option value="">Select Subject</option>
                  {(subjectMap[formData.semester] || []).map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload File
          </label>
          <label
            htmlFor="file"
            className="flex items-center justify-center px-4 py-2 bg-blue-200 text-gray-800 font-medium rounded-lg cursor-pointer hover:bg-blue-300"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose file
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf,.jpg,.jpeg,.png"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {formData.file && (
            <p className="mt-3 text-sm text-gray-700 italic">
              Selected file:{" "}
              <span className="font-semibold text-indigo-600">
                {formData.file.name}
              </span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddNote;