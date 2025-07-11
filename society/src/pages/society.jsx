import React, { useEffect, useState } from 'react';
import './society.css';

export default function SocietyPage() {
  const [societies, setSocieties] = useState([]);
  const [form, setForm] = useState({
    name: '',
    licenceNo: '',
    address: '',
    city: '',
    pinCode: '',
    maintenanceCostPerSqft: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const BASE_URL = 'http://localhost:5087/api/society';

  useEffect(() => {
    fetchSocieties();
  }, []);

  const fetchSocieties = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log('API Response:', data);

    if (Array.isArray(data)) {
      setSocieties(data);
    } else if (Array.isArray(data.data)) {
      setSocieties(data.data);
    } else if (data.SocietyDetails) {
      setSocieties([data.SocietyDetails]); 
    } else {
      setSocieties([]);
    }
  } catch (err) {
    console.error('Failed to fetch societies:', err);
  }
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (society = null) => {
    if (society) {
      setForm({ ...society });
      setEditingId(society.id);
    } else {
      setForm({
        name: '',
        licenceNo: '',
        address: '',
        city: '',
        pinCode: '',
        maintenanceCostPerSqft: ''
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save society');

      fetchSocieties();
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this society?')) return;

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) fetchSocieties();
      else alert('Delete failed');
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  const filteredSocieties = searchTerm.trim()
    ? societies.filter((s) =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.licenceNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.city?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : societies;

  const totalPages = Math.ceil(filteredSocieties.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredSocieties.slice(indexOfFirst, indexOfLast);

  return (
    <div className="society-page">
      <h2>Society Management</h2>

      <div className="top-bar">
        <button className="add-btn" onClick={() => openModal()}>+ Add Society</button>
        <input
          className="search-input"
          placeholder="Search by name, city, or licence..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading societies...</p>
      ) : (
        <table className="society-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Licence No</th>
              <th>Address</th>
              <th>City</th>
              <th>Pin Code</th>
              <th>Maint. Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No matching societies found.</td>
              </tr>
            ) : (
              currentItems.map((s, index) => (
                <tr key={s.id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.licenceNo}</td>
                  <td>{s.address}</td>
                  <td>{s.city}</td>
                  <td>{s.pinCode}</td>
                  <td>{s.maintenanceCostPerSqft}</td>
                  <td>
                    <button onClick={() => openModal(s)}>Edit</button>
                    <button className="cancel" onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {totalPages >= 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Edit Society' : 'Add Society'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="licenceNo" placeholder="Licence No" value={form.licenceNo} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
              <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
              <input type="text" name="pinCode" placeholder="Pin Code" value={form.pinCode} onChange={handleChange} />
              <input type="number" name="maintenanceCostPerSqft" placeholder="Maint. Cost Per Sqft" value={form.maintenanceCostPerSqft} onChange={handleChange} required />
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
