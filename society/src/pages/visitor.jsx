import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './society.css';

export default function VisitorPage() {
  const [visitors, setVisitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const visitorsPerPage = 10;

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    purpose: '',
    flatId: '',
    vehicleNum: '',
    senderId: '',
    recieverId: '',
    status: 'In',
    inTime: '',
    outTime: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [flats, setFlats] = useState([]);

  const BASE_URL = 'http://localhost:5087/api/visitor';

  const fetchFlats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5087/api/flat', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data.user)) setFlats(data.user);
      else if (Array.isArray(data.flats)) setFlats(data.flats);
      else if (Array.isArray(data.data)) setFlats(data.data);
      else setFlats([]);
    } catch (error) {
      console.error('Failed to fetch flats:', error);
      setFlats([]);
    }
  };

  const fetchVisitors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Unexpected non-JSON response:', text);
        return;
      }

      const data = await res.json();
      if (Array.isArray(data.visitors)) setVisitors(data.visitors);
      else if (Array.isArray(data.data)) setVisitors(data.data);
      else if (Array.isArray(data)) setVisitors(data);
      else if (data.data && Array.isArray(data.data.visitors)) setVisitors(data.data.visitors);
      else setVisitors([]);
    } catch (err) {
      console.error('Failed to fetch visitors:', err.message || err);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchFlats();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const openModal = (visitor = null) => {
    if (visitor) {
      setForm({
        name: visitor.name,
        mobile: visitor.mobile,
        purpose: visitor.purpose,
        flatId: visitor.flatId,
        vehicleNum: visitor.vehicleNum,
        senderId: visitor.senderId,
        recieverId: visitor.recieverId,
        status: visitor.status,
        inTime: visitor.inTime?.slice(0, 16) || '',
        outTime: visitor.outTime?.slice(0, 16) || ''
      });
      setEditingId(visitor.id);
    } else {
      setForm({
        name: '',
        mobile: '',
        purpose: '',
        flatId: '',
        vehicleNum: '',
        senderId: '',
        recieverId: '',
        status: 'In',
        inTime: '',
        outTime: ''
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      fetchVisitors();
      closeModal();
    } else {
      const error = await res.json();
      alert(`Submission failed: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchVisitors();
  };

  // Pagination
  const filteredVisitors = visitors.filter((v) => {
    const value = searchTerm.toLowerCase();
    return (
      v.name?.toLowerCase().includes(value) ||
      v.mobile?.toLowerCase().includes(value) ||
      v.flatId?.toString().includes(value) ||
      v.purpose?.toLowerCase().includes(value)
    );
  });

  const indexOfLast = currentPage * visitorsPerPage;
  const indexOfFirst = indexOfLast - visitorsPerPage;
  const currentVisitors = filteredVisitors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVisitors.length / visitorsPerPage);

  return (
    <div className="society-page">
      <h2>Visitor Management</h2>

      <div className="top-bar">
        <button className="add-btn" onClick={() => openModal()}>Add Visitor</button>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <table className="society-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Purpose</th>
            <th>Flat ID</th>
            <th>Vehicle </th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentVisitors.length === 0 ? (
            <tr>
              <td colSpan="12" style={{ textAlign: 'center' }}>No matching visitors found.</td>
            </tr>
          ) : (
            currentVisitors.map((v, index) => (
              <tr key={v.id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{v.name}</td>
                <td>{v.mobile}</td>
                <td>{v.purpose}</td>
                <td>{v.flatId}</td>
                <td>{v.vehicleNum}</td>
                <td>{v.senderId}</td>
                <td>{v.recieverId}</td>
                <td>{v.status}</td>
                <td>{v.inTime ? new Date(v.inTime).toLocaleString() : '—'}</td>
                <td>{v.outTime ? new Date(v.outTime).toLocaleString() : '—'}</td>
                <td>
                  
                    <div className="modal-buttons">
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                <button type="button" className="cancel" onClick={closeModal}>Cancel</button>
              </div>
                 
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active-page' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
              <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange} required />
              <select name="flatId" value={form.flatId} onChange={handleChange} required>
                <option value="">Select Flat</option>
                {flats.map(flat => (
                  <option key={flat.id} value={flat.id}>
                    {flat.flatNumber || `Flat ${flat.id}`}
                  </option>
                ))}
              </select>
              <input name="vehicleNum" placeholder="Vehicle Number" value={form.vehicleNum} onChange={handleChange} />
              <input name="senderId" placeholder="Sender ID" value={form.senderId} onChange={handleChange} />
              <input name="recieverId" placeholder="Receiver ID" value={form.recieverId} onChange={handleChange} />
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="In">In</option>
                <option value="Out">Out</option>
              </select>
              <input type="datetime-local" name="inTime" value={form.inTime} onChange={handleChange} />
              <input type="datetime-local" name="outTime" value={form.outTime} onChange={handleChange} />
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
