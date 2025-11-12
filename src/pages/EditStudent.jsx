import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    studentDOB: "",
    studentAddress: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7002/student/getStudentByID/${id}`
        );
        const s = res.data.student;
        setStudentData({
          studentName: s.studentName,
          studentEmail: s.studentEmail,
          studentPhone: s.studentPhone || "",
          studentDOB: s.studentDOB ? s.studentDOB.slice(0, 10) : "",
          studentAddress: s.studentAddress || "",
        });
      } catch {
        toast.error("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(studentData).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (image) formData.append("image", image);

      await axios.put(
        `http://localhost:7002/student/updateStudent/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Student updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update student");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">✏️ Edit Student</h3>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="studentName"
            className="form-control"
            value={studentData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="studentEmail"
            className="form-control"
            value={studentData.studentEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="studentPhone"
            className="form-control"
            value={studentData.studentPhone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="studentDOB"
            className="form-control"
            value={studentData.studentDOB}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            name="studentAddress"
            className="form-control"
            rows="3"
            value={studentData.studentAddress}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Update Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
