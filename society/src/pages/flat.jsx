import React, { useState, useEffect } from 'react';
import './society.css';

export const Flat = () => {
  const [flats, setFlats] = useState([]);
  const [form, setForm] = useState({
    flatUId: '',
    flatNumber: '',
    block: '',
    floor: '',
    flatType: '',
    areapersqfeet: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const BASE_URL = 'http://localhost:5087/api/flat';

  const fetchFlats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found. Please login.');

      const res = await fetch(BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (Array.isArray(data.user)) setFlats(data.user);
      else if (Array.isArray(data.flats)) setFlats(data.flats);
      else if (Array.isArray(data.data)) setFlats(data.data);
      else {
        console.error('Unexpected flat structure:', data);
        setFlats([]);
      }
    } catch (error) {
      console.error('Failed to fetch flats:', error);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;
      const token = localStorage.getItem('token');

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        fetchFlats();
        closeModal();
      } else {
        const result = await res.json();
        console.error('❌ Error submitting:', result.message);
      }
    } catch (error) {
      console.error('❌ Submit error:', error);
    }
  };

  const handleEdit = (flat) => {
    setForm({
      flatUId: flat.flatUId || '',
      flatNumber: flat.flatNumber || '',
      block: flat.block || '',
      floor: flat.floor || '',
      flatType: flat.flatType || '',
      areapersqfeet: flat.areapersqfeet || '',
    });
    setEditingId(flat.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flat?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchFlats();
    } catch (error) {
      console.error('❌ Delete error:', error);
    }
  };

  const openModal = () => {
    setForm({
      flatUId: '',
      flatNumber: '',
      block: '',
      floor: '',
      flatType: '',
      areapersqfeet: '',
    });
    setEditingId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({
      flatUId: '',
      flatNumber: '',
      block: '',
      floor: '',
      flatType: '',
      areapersqfeet: '',
    });
  };

  // 🔍 Filtered and Paginated Data
  const filteredFlats = flats.filter(flat => {
    const val = searchTerm.toLowerCase();
    return (
      flat.flatNumber?.toString().toLowerCase().includes(val) ||
      flat.block?.toLowerCase().includes(val) ||
      flat.floor?.toString().toLowerCase().includes(val) ||
      flat.flatType?.toLowerCase().includes(val)
    );
  });

  const totalPages = Math.ceil(filteredFlats.length / itemsPerPage);
  const paginatedFlats = filteredFlats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset page when search changes
  }, [searchTerm]);

  return (
    <div className="society-page">
      <h2>Flat Management</h2>

      <div className="top-bar">
        <button className="add-btn" onClick={openModal}>Add Flat</button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Flat No, Block, Floor or Type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="society-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Flat UId</th>
              <th>Flat Number</th>
              <th>Block</th>
              <th>Floor</th>
              <th>Flat Type</th>
              <th>Area (Sq.Ft)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFlats.map(flat => (
              <tr key={flat.id}>
                <td>{flat.id}</td>
                <td>{flat.flatUId}</td>
                <td>{flat.flatNumber}</td>
                <td>{flat.block}</td>
                <td>{flat.floor}</td>
                <td>{flat.flatType}</td>
                <td>{flat.areapersqfeet}</td>
                <td>
                  <button onClick={() => handleEdit(flat)}>Edit</button>
                  <button className="cancel" onClick={() => handleDelete(flat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Edit Flat' : 'Add Flat'}</h3>
            <form onSubmit={handleSubmit}>
              {editingId && (
                <input
                  name="flatUId"
                  placeholder="Flat UId"
                  value={form.flatUId}
                  onChange={handleChange}
                  readOnly
                  style={{ backgroundColor: '#f4f4f4', cursor: 'not-allowed' }}
                />
              )}
              <input
                name="flatNumber"
                placeholder="Flat Number"
                value={form.flatNumber}
                onChange={handleChange}
                required
              />
              <input
                name="block"
                placeholder="Block"
                value={form.block}
                onChange={handleChange}
                required
              />
              <input
                name="floor"
                placeholder="Floor"
                value={form.floor}
                onChange={handleChange}
              />
              <input
                name="flatType"
                placeholder="Flat Type"
                value={form.flatType}
                onChange={handleChange}
                required
              />
              <input
                name="areapersqfeet"
                type="number"
                placeholder="Area per Sq.Ft"
                value={form.areapersqfeet}
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
