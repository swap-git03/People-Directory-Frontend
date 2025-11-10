/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddStudent() {
  const [formData, setFormData] = useState({
    peopleName: "",
    peopleEmail: "",
    peoplePhone: "",
    peopleDOB: "",
    peopleAddress: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      const res = await axios.post("http://localhost:7002/people/createPeople", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Student added successfully!");
      setFormData({
        peopleName: "",
        peopleEmail: "",
        peoplePhone: "",
        peopleDOB: "",
        peopleAddress: "",
        image: null,
      });
    } catch (err) {
      toast.error("Error adding student");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Student</h2>

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="peopleName"
            value={formData.peopleName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="peopleEmail"
            value={formData.peopleEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="peoplePhone"
            value={formData.peoplePhone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="peopleDOB"
            value={formData.peopleDOB}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="peopleAddress"
            value={formData.peopleAddress}
            onChange={handleChange}
            rows="2"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
