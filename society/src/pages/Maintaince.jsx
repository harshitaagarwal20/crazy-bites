import React, { useEffect, useState } from 'react';
import './society.css';

export default function MaintenancePage() {
  const [maintenances, setMaintenances] = useState([]);
  const [flatsList, setFlatsList] = useState([]);

  const [form, setForm] = useState({
    societyId: '',
    flatId: '', // will store flatUId
    description: '',
    amount: '',
    dueDate: '',
    status: 'pending',
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const BASE_URL = 'http://localhost:5087/api/maintenance';

  const fetchMaintenances = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (Array.isArray(data.maintenance)) {
        setMaintenances(data.maintenance);
      } else {
        console.error('Unexpected format:', data);
      }
    } catch (err) {
      console.error('❌ Failed to fetch maintenances:', err.message || err);
    }
  };

  const fetchFlatsList = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5087/api/flat', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setFlatsList(data.flats || data.data || []);
    } catch (err) {
      console.error('❌ Error fetching flats:', err.message || err);
    }
  };

  useEffect(() => {
    fetchMaintenances();
    fetchFlatsList();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (m = null) => {
    if (m) {
      setForm({
        societyId: m.societyId || '',
        flatId:
          m.flatId ||
          (Array.isArray(m.flatNumber)
            ? m.flatNumber[0]?.flatUId || ''
            : m.flat?.flatUId || ''),
        description: m.description || '',
        amount: m.amount || '',
        dueDate: m.dueDate ? m.dueDate.slice(0, 10) : '',
        status: m.status || 'pending',
      });
      setEditingId(m.id);
    } else {
      setForm({
        societyId: '',
        flatId: '',
        description: '',
        amount: '',
        dueDate: '',
        status: 'pending',
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

    const payload = {
      societyId: parseInt(form.societyId, 10),
      flatId: form.flatId,
      description: form.description,
      amount: form.amount,
      dueDate: form.dueDate,
      status: form.status,
    };

    try {
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
        await fetchMaintenances();
        closeModal();
      } else {
        alert(`❌ Error: ${result.message || 'Failed to save record'}`);
      }
    } catch (err) {
      console.error('❌ Error saving maintenance:', err);
      alert('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const res = await fetch(`${BASE_URL}/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          fetchMaintenances();
        } else {
          const err = await res.json();
          alert(`Delete failed: ${err.message || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('Error deleting maintenance:', err);
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="society-page">
      <h2>Maintenance Management</h2>
      <button className="add-btn" onClick={() => openModal()}>
        Add Maintenance
      </button>

      <table className="society-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Society ID</th>
            <th>Flat ID (flatUId)</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.societyId}</td>
              <td>{m.flat?.flatUId || m.flatId || '-'}</td>
              <td>{m.description}</td>
              <td>{new Date(m.dueDate).toLocaleDateString()}</td>
              <td>{m.status}</td>
              <td>
                <button onClick={() => openModal(m)}>Edit</button>
                <button onClick={() => handleDelete(m.id)} className='cancel'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Edit Maintenance' : 'Add Maintenance'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                name="societyId"
                placeholder="Society ID"
                value={form.societyId}
                onChange={handleChange}
                required
              />

              <select
                name="flatId"
                value={form.flatId}
                onChange={handleChange}
                required
              >
                <option value="">Select Flat</option>
                {flatsList.map((flat) => (
                  <option key={flat.flatUId} value={flat.flatUId}>
                    {flat.flatNumber} (UID: {flat.flatUId})
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
              <div className="modal-buttons">
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
