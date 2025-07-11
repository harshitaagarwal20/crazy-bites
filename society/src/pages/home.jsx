import React, { useEffect, useState } from 'react';
import './society.css';

export function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    password: '',
    email: '',
    LicenceNo: '',
    role: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5087/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch users');

      if (Array.isArray(data.users)) setUsers(data.users);
      else if (Array.isArray(data)) setUsers(data);
      else setUsers([data]);
    } catch (err) {
      console.error('Fetch User Error:', err.message);
      setError(err.message || 'Something went wrong');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setFormData(
      user || {
        full_name: '',
        mobile: '',
        password: '',
        email: '',
        LicenceNo: '',
        role: '',
      }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleSubmit = async () => {
    const method = editingUser ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');
    const url = editingUser
      ? `http://localhost:5087/api/user/${editingUser.id}`
      : `http://localhost:5087/api/user/register`;

    try {
      const payload = { ...formData };
      if (editingUser) delete payload.password;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Operation failed');

      await fetchUserData();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`http://localhost:5087/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Delete failed');

      await fetchUserData();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const val = searchTerm.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(val) ||
      user.email?.toLowerCase().includes(val) ||
      user.mobile?.toLowerCase().includes(val) ||
      user.LicenceNo?.toLowerCase().includes(val) ||
      user.role?.toLowerCase().includes(val)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="society-page">
      <h2>User Details</h2>

      <div className="top-bar">
        <button onClick={() => handleOpenModal()} className="add-btn">+ Add User</button>
        <input
          type="text"
          placeholder="Search by name, email, mobile, licence, role..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {!users.length && !error && <p>Loading...</p>}

      {currentUsers.length > 0 ? (
        <>
          <table className="society-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>LicenceNo</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td>{user.full_name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.email}</td>
                  <td>{user.LicenceNo}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleOpenModal(user)}>Edit</button>
                       </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No users match your search.</p>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            {!editingUser && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="LicenceNo"
              placeholder="Licence No"
              value={formData.LicenceNo}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={handleSubmit}>
                {editingUser ? 'Update' : 'Create'}
              </button>
              <button onClick={handleCloseModal} className="cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
