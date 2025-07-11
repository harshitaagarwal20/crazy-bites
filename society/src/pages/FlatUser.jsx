import React, { useEffect, useState } from 'react';
import './society.css';

export default function FlatUserForm() {
  const [form, setForm] = useState({ id: '', flatId: '', userId: '' });
  const [flats, setFlats] = useState([]);
  const [users, setUsers] = useState([]);
  const [flatUsers, setFlatUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchFlats();
    fetchUsers();
    fetchFlatUsers();
  }, []);

  const fetchFlats = async () => {
    try {
      const res = await fetch('http://localhost:5087/api/flat', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      const list = data.flats || data.data || data.user || [];
      setFlats(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Error fetching flats:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5087/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      const list = data.users || [data];
      setUsers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchFlatUsers = async () => {
    try {
      const res = await fetch('http://localhost:5087/api/flat/assign', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      const list = Array.isArray(data) ? data.reverse() : [data];
      setFlatUsers(list || []);
    } catch (err) {
      console.error('Error fetching flat-user records:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5087/api/flat/assign/${editingId}`
      : 'http://localhost:5087/api/flat/assign';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowModal(false);
        setForm({ flatId: '', userId: '' });
        setEditingId(null);
        fetchFlatUsers();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to submit');
      }
    } catch (err) {
      console.error('Error submitting assignment:', err);
     
    }
  };

  const handleEdit = (fu) => {
    setForm({
      id: fu.id,
      flatId: fu.flatId,
      userId: fu.UserId,
    });
    setEditingId(fu.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5087/api/flat/assign/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchFlatUsers();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to delete assignment');
      }
    } catch (err) {
      console.error('Error deleting assignment:', err);
    
    }
  };

  const filteredFlatUsers = flatUsers.filter((fu) => {
    const val = searchTerm.toLowerCase();
    return (
      fu.Flat?.flatNumber?.toLowerCase().includes(val) ||
      fu.User?.full_name?.toLowerCase().includes(val)
    );
  });

  const totalPages = Math.ceil(filteredFlatUsers.length / itemsPerPage);
  const currentItems = filteredFlatUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="society-page">
      <h2>Flat User Assignment</h2>

      <div className="top-bar">
        <button
          className="add-btn"
          onClick={() => {
            setForm({ flatId: '', userId: '' });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          + Assign Flat
        </button>

        <input
          type="text"
          className="search-input"
          placeholder="Search by Flat/User..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form className="modal-content" onSubmit={handleSubmit}>
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h3>{editingId ? 'Edit Assignment' : 'Assign Flat to User'}</h3>

              
              <select name="flatId" value={form.flatId} onChange={handleChange} required>
                <option value="">Select Flat</option>
                {flats.map((flat) => (
                  <option key={flat.id} value={flat.flatUId || flat.id}>
                    {flat.flatNumber} ({flat.flatUId || flat.id})
                  </option>
                ))}
              </select>

             
              <select name="userId" value={form.userId} onChange={handleChange} required>
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name || `User ${user.id}`}
                  </option>
                ))}
              </select>

              <div className="modal-buttons">
                <button type="submit">{editingId ? 'Update' : 'Submit'}</button>
                <button type="button" className="cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="society-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Flat Number</th>
            <th>User Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No matching records found.</td>
            </tr>
          ) : (
            currentItems.map((fu, index) => (
              <tr key={fu.id || `flatuser-${index}`}>
                <td>{fu.id}</td>
                <td>{fu.Flat?.flatNumber || fu.flatId}</td>
                <td>{fu.User?.full_name || fu.UserId}</td>
                <td>
                  <button onClick={() => handleEdit(fu)}>Edit</button>
                  <button className="cancel" onClick={() => handleDelete(fu.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages >= 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
