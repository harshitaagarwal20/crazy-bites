import React, { useState, useEffect } from 'react';
import './society.css';

export const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 10;

  const defaultForm = {
    id: '',
    status: 'Open',
    category: '',
    title: '',
    description: '',
  };

  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = 'http://localhost:5087/api/complain';

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setComplaints(data?.data || data?.complaints || []);
    } catch (error) {
      console.error('❌ Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;

      const payload = { ...form };
      if (!editingId) payload.userId = userId;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        fetchComplaints();
        closeModal();
        setMessage(editingId ? 'Complaint updated successfully!' : 'Complaint submitted successfully!');
      } else {
        setMessage(result.message || 'Error occurred');
      }
    } catch (error) {
      console.error('❌ Error submitting complaint:', error);
      setMessage('Error submitting complaint');
    }
  };

  const handleEdit = (complaint) => {
    setForm({
      id: complaint.id,
      status: complaint.status || 'Open',
      category: complaint.category,
      title: complaint.title,
      description: complaint.description,
    });
    setEditingId(complaint.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchComplaints();
    } catch (error) {
      console.error('❌ Error deleting complaint:', error);
    }
  };

  const openModal = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(defaultForm);
    setMessage('');
  };

  const filteredComplaints = complaints.filter((c) => {
    const query = searchTerm.toLowerCase();
    return (
      c.title?.toLowerCase().includes(query) ||
      c.description?.toLowerCase().includes(query) ||
      c.category?.toLowerCase().includes(query) ||
      c.status?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  return (
    <div className="society-page">
      <h2>Complaint Management</h2>

      <div className="top-bar">
        <button className="add-btn" onClick={openModal}>+ Add Complaint</button>
        <input
          className="search-input"
          type="text"
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {message && <p className="message">{message}</p>}

      <div style={{ overflowX: 'auto' }}>
        <table className="society-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Category</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentComplaints.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No matching complaints found.</td>
              </tr>
            ) : (
              currentComplaints.map((complaint, idx) => (
                <tr key={complaint.id}>
                  <td>{indexOfFirstComplaint + idx + 1}</td>
                  <td>{complaint.status}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.title}</td>
                  <td>{complaint.description}</td>
                  <td>
                    <button onClick={() => handleEdit(complaint)}>Edit</button>
                    <button className="cancel" onClick={() => handleDelete(complaint.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>◀ Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next ▶
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Edit Complaint' : 'Add Complaint'}</h3>
            <form onSubmit={handleSubmit}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange} required>
                <option value="Open">Open</option>
                <option value="Resolved">In Progress</option>
              </select>

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                <button type="button" className="cancel" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
