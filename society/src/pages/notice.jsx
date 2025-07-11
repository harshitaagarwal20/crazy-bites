import React, { useEffect, useState } from 'react';
import './society.css';

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'General',
    isPinned: false,
    userId: '',
  });

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5087/api/notice', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Unexpected response (non-JSON):', text);
        return;
      }

      const data = await res.json();
      if (Array.isArray(data.notices)) {
        setNotices(data.notices);
      } else if (Array.isArray(data.data)) {
        setNotices(data.data);
      } else if (Array.isArray(data)) {
        setNotices(data);
      } else {
        console.error('Unexpected format:', data);
      }
    } catch (err) {
      console.error('Failed to fetch notices:', err.message || err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUsers(data?.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (userId) {
      form.userId = userId;
    }

    const res = await fetch('/api/notice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newNotice = await res.json();
      setNotices((prev) => [...prev, newNotice.data || newNotice]);
      setShowModal(false);
      resetForm();
      alert('Notice created!');
    } else {
      const error = await res.json();
      alert(`Error: ${error.message || 'Failed to create notice'}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`/api/notice/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotices(notices.filter((n) => n.id !== id));
        alert('Notice deleted');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      category: 'General',
      isPinned: false,
      userId: '',
    });
  };

  // Filter and sort
  const filteredNotices = notices.filter((notice) => {
    const q = searchTerm.toLowerCase();
    return (
      notice.title?.toLowerCase().includes(q) ||
      notice.content?.toLowerCase().includes(q) ||
      notice.category?.toLowerCase().includes(q)
    );
  });

  const sortedNotices = [...filteredNotices].sort((a, b) => b.isPinned - a.isPinned);

  // Pagination
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = sortedNotices.slice(indexOfFirstNotice, indexOfLastNotice);

  return (
    <div className="society-page">
      <h2>📢 Notices</h2>

      <div className="top-bar">
        <button className="add-btn" onClick={() => setShowModal(true)}>
           Add Notice
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Search by title, category, or content..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="society-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Pinned</th>
            <th>Created By</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((n, index) => (
            <tr key={n.id}>
              <td>{indexOfFirstNotice + index + 1}</td>
              <td>{n.title}</td>
              <td>{n.category}</td>
              <td>{n.isPinned ? '📌' : '—'}</td>
              <td>{n.creator?.full_name || n.userId}</td>
              <td>{new Date(n.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(n.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(sortedNotices.length / noticesPerPage)}
        </span>
        <button
          disabled={currentPage >= Math.ceil(sortedNotices.length / noticesPerPage)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit} className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h3>Create New Notice</h3>

              <label>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <label>Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
              />

              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="General">General</option>
                <option value="Urgent">Urgent</option>
                <option value="Event">Event</option>
                <option value="Maintenance">Maintenance</option>
              </select>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isPinned"
                  checked={form.isPinned}
                  onChange={handleChange}
                />
                📌 Pin this notice
              </label>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
