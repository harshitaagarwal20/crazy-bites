import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import './society.css';

const BASE_URL = 'http://localhost:5087/api/amenity';
const defaultForm = { name: '', description: '', isActive: '', societyId: '' };

export default function AmenityPage() {
  const [amenities, setAmenities] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = localStorage.getItem('token');

  useEffect(() => { fetchAmenities(); }, []);

  const fetchAmenities = async () => {
    if (!token) return;
    try {
      const res = await fetch(BASE_URL, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setAmenities(data?.data || data?.amenities || data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editingId ? `${BASE_URL}/${editingId}` : BASE_URL, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Error');
      fetchAmenities();
      setShowModal(false);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this amenity?')) return;
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchAmenities();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filtered = amenities.filter((a) =>
    [a.name, a.description, a.societyId?.toString()].some((val) =>
      val?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paged = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="society-page">
      <h2>Amenity Management</h2>
      <div className="top-bar">
        <button className="add-btn" onClick={() => { setForm(defaultForm); setEditingId(null); setShowModal(true); }}>
          + Add Amenity
        </button>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search amenities..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <table className="society-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Description</th><th>Status</th><th>Society ID</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data found</td></tr>
          ) : (
            paged.map((a, i) => (
              <tr key={a.id}>
                <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td>{a.isActive === 'true' || a.isActive === true ? 'Active' : 'Inactive'}</td>
                <td>{a.societyId}</td>
                <td>
                  <button onClick={() => { setForm(a); setEditingId(a.id); setShowModal(true); }}>Edit</button>
                  <button className="cancel" onClick={() => handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>◀ Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next ▶</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Edit Amenity' : 'Add Amenity'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
              <select name="isActive" value={form.isActive} onChange={handleChange} required>
                <option value="">-- Select Status --</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <input type="text" name="societyId" placeholder="Society ID" value={form.societyId} onChange={handleChange} required />
              <div className="modal-buttons">
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                <button type="button" className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
