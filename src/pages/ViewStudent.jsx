import React, { useEffect, useState } from "react";
import axios from "axios";
import './ViewStudent.css';

import { useParams } from "react-router-dom";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:7002/student/getStudentByID/${id}`);
        setStudent(res.data.student);
      } catch (err) {
        console.error("Failed to fetch student:", err);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      {/* ✅ Profile Image Section */}
      <div className="flex justify-center items-center mt-6">
        <img
          src={
            student.image
              ? `http://localhost:7002/${student.image}`
              : "https://via.placeholder.com/200?text=No+Image"
          }
          alt={student.name || "No Image"}
          className="w-48 h-48 rounded-full object-cover border-4 border-gray-300 shadow-md"
        />
      </div>

      {/* ✅ Student Info */}
      <h2 className="text-2xl font-semibold mt-6 text-center">{student.name}</h2>
      <p className="text-gray-600 text-center mb-4">{student.email}</p>

      <div className="space-y-2 text-gray-700">
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Batch:</strong> {student.batch}</p>
        <p><strong>Status:</strong> {student.isActive ? "Active ✅" : "Inactive ❌"}</p>
      </div>
    </div>
  );
};

export default ViewStudent;
