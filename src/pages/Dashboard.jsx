import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all students
  const fetchStudents = async () => {
    try {
    const res = await axios.get("http://localhost:7002/student/getAllStudents");
setStudents(res.data.students || []);
    } catch  {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
    await axios.delete(`http://localhost:7002/student/deleteStudent/${id}`);
      toast.success("Student deleted successfully");
      fetchStudents();
    } catch {
      toast.error("Failed to delete student");
    }
  };

  // ✅ Toggle active/inactive status
  const toggleStatus = async (id, currentStatus) => {
    try {
    await axios.patch(`http://localhost:7002/student/updateStatus/${id}`, {
        isActive: !currentStatus,
      });
      toast.success(`Status updated to ${!currentStatus ? "Active" : "Inactive"}`);
      fetchStudents();
    } catch  {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📘 Student Dashboard</h3>
        <Link to="/add-student" className="btn btn-primary">
          + Add Student
        </Link>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : students.length === 0 ? (
        <p className="text-center">No students found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>
                    {s.image ? (
                      <img
                        src={`http://localhost:7002/uploads/${s.image}`}
                        alt="student"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </td>
                  <td>{s.studentName}</td>
                  <td>{s.studentEmail}</td>
                  <td>{s.studentPhone || "-"}</td>
                  <td>{s.studentDOB ? s.studentDOB.slice(0, 10) : "-"}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        s.isActive ? "btn-success" : "btn-secondary"
                      }`}
                      onClick={() => toggleStatus(s._id, s.isActive)}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/view-student/${s._id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-student/${s._id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteStudent(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
