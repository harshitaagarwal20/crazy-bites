// src/Components/ParkingPage.jsx
import React, { useEffect, useState } from 'react';
import './society.css';

export default function ParkingPage() {
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
  const [parkings, setParkings] = useState([]);
  const [flats, setFlats] = useState([]);
  const [form, setForm] = useState({
    parkingNumber: '',
    vehicleNumber: '',
    vehicleType: '',
    ownerName: '',
    flatId: '',
    status: 'vacant',
    isVisitorSlot: false
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 🔍

  const BASE_URL = 'http://localhost:5087/api/parking';

  useEffect(() => {
    fetchParkings();
    fetchFlats();
  }, []);

  const fetchParkings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      const list = Array.isArray(data.parkings)
        ? data.parkings
        : Array.isArray(data)
        ? data
        : data.data;
      setParkings(list || []);
    } catch (err) {
      console.error('❌ Error fetching parkings:', err);
    }
  };

  const fetchFlats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5087/api/flat', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      const flatList = Array.isArray(data.user)
        ? data.user
        : Array.isArray(data.flats)
        ? data.flats
        : data.data;
      setFlats(flatList || []);
    } catch (err) {
      console.error('❌ Error fetching flats:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;

    try {
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
        fetchParkings();
        closeModal();
      } else {
        const err = await res.json();
        alert(err.message || 'Submission failed');
      }
    } catch (err) {
      console.error('❌ Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchParkings();
    } catch (err) {
      console.error('❌ Delete error:', err);
    }
  };

  const openModal = (p = null) => {
    if (p) {
      setForm({
        parkingNumber: p.parkingNumber,
        vehicleNumber: p.vehicleNumber || '',
        vehicleType: p.vehicleType || '',
        ownerName: p.ownerName || '',
        flatId: p.flatId || '',
        status: p.status || 'vacant',
        isVisitorSlot: !!p.isVisitorSlot
      });
      setEditingId(p.id);
    } else {
      setForm({
        parkingNumber: '',
        vehicleNumber: '',
        vehicleType: '',
        ownerName: '',
        flatId: '',
        status: 'vacant',
        isVisitorSlot: false
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  
 const filtered = parkings.filter((p) => {
  const q = searchTerm.toLowerCase();
  return (
    p.parkingNumber?.toLowerCase().includes(q) ||
    p.vehicleNumber?.toLowerCase().includes(q) ||
    p.ownerName?.toLowerCase().includes(q) ||
    p.vehicleType?.toLowerCase().includes(q) ||
    p.status?.toLowerCase().includes(q)
  );
});

const totalPages = Math.ceil(filtered.length / itemsPerPage);
const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;
const currentItems = filtered.slice(indexOfFirst, indexOfLast);


  return (
    <div className="society-page">
      <h2>Parking Management</h2>

      <div className="top-bar">
        <button className="add-btn" onClick={() => openModal()}>Add Parking</button>
        <input
          type="text"
          className="search-input"
          placeholder="Search parking..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="society-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Parking No.</th>
            <th>Vehicle No.</th>
            <th>Vehicle Type</th>
            <th>Owner</th>
            <th>Flat</th>
            <th>Status</th>
            <th>Visitor Slot</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>No records found.</td>
            </tr>
          ) : currentItems.map((p,idx ) => (
            <tr key={p.id}>
              <td>{indexOfFirst + idx + 1}</td>
              <td>{p.parkingNumber}</td>
              <td>{p.vehicleNumber}</td>
              <td>{p.vehicleType}</td>
              <td>{p.ownerName}</td>
              <td>{p.flatId}</td>
              <td>{p.status}</td>
              <td>{p.isVisitorSlot ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => openModal(p)}>Edit</button>
                <button className="cancel" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages >= 1 && (
  <div className="pagination">
    <button
      className="pagination-btn"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    >
      ◀ Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <span
        key={i}
        className={` ${currentPage === i + 1 }`}
        
      >
      Page {i + 1}
      </span>
    ))}

    <button
      className="pagination-btn"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    >
      Next ▶
    </button>
  </div>
)}


      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Edit Parking' : 'Add Parking'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="parkingNumber"
                placeholder="Parking Number"
                value={form.parkingNumber}
                onChange={handleChange}
                required
              />
              <input
                name="vehicleNumber"
                placeholder="Vehicle Number"
                value={form.vehicleNumber}
                onChange={handleChange}
              />
              <label>Vehicle Type</label>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="scooty">Scooty</option>
              </select>
              <input
                name="ownerName"
                placeholder="Owner Name"
                value={form.ownerName}
                onChange={handleChange}
              />
              <select name="flatId" value={form.flatId} onChange={handleChange} required>
                <option value="">Select a Flat</option>
                {flats.map((flat) => (
                  <option key={flat.id} value={flat.id}>
                    {flat.flatNumber || `Flat ${flat.id}`}
                  </option>
                ))}
              </select>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
              </select>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isVisitorSlot"
                  checked={form.isVisitorSlot}
                  onChange={handleChange}
                />
                Visitor Slot
              </label>
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
}
