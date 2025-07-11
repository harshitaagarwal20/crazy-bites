import React, { useState, useEffect } from 'react';
import './society.css';

const BASE_URL = 'http://localhost:5087/api/transaction';
const getDefaultForm = () => ({
  societyId: '', month: '', amount: '', dueDate: '',
  status: 'Pending', paymentDate: '', paymentMethod: ''
});

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(getDefaultForm());
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const fetchTransactions = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      const arr = Array.isArray(data) ? data : data.data || data.transactions || [];
      setTransactions(Array.isArray(arr) ? arr : []);
    } catch (err) {
      console.error(err);
      setTransactions([]);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'amount' ? +value : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      fetchTransactions();
      closeModal();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEdit = (txn) => {
    setForm({
      societyId: txn.societyId || '', month: txn.month || '', amount: txn.amount || '',
      dueDate: txn.dueDate?.slice(0, 10) || '', status: txn.status || 'Pending',
      paymentDate: txn.paymentDate?.slice(0, 10) || '', paymentMethod: txn.paymentMethod || ''
    });
    setEditingId(txn.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) fetchTransactions();
      else alert('Delete failed');
    } catch (err) {
      alert(err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(getDefaultForm());
  };

  const filtered = transactions.filter(txn =>
    [txn.societyId, txn.month, txn.status, txn.paymentMethod]
      .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageTxns = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="society-page">
      <h2>Transaction Management</h2>
      <div className="top-bar">
        <button className="add-btn" onClick={() => setShowModal(true)}>Add Transaction</button>
        <input
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="society-table">
          <thead>
            <tr>
              {['#', 'Society ID', 'Month', 'Amount', 'Due Date', 'Status', 'Payment Date', 'Method', 'Actions']
                .map((h, i) => <th key={i}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {pageTxns.length === 0 ? (
              <tr><td colSpan="9" style={{ textAlign: 'center' }}>No transactions found.</td></tr>
            ) : pageTxns.map((txn, i) => (
              <tr key={txn.id}>
                <td>{(currentPage - 1) * perPage + i + 1}</td>
                <td>{txn.societyId}</td><td>{txn.month}</td><td>{txn.amount}</td>
                <td>{txn.dueDate ? new Date(txn.dueDate).toLocaleDateString() : '—'}</td>
                <td>{txn.status}</td>
                <td>{txn.paymentDate ? new Date(txn.paymentDate).toLocaleDateString() : '—'}</td>
                <td>{txn.paymentMethod || '—'}</td>
                <td>
                  <button onClick={() => handleEdit(txn)}>Edit</button>
                  <button className="cancel" onClick={() => handleDelete(txn.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active-page' : ''}
            >{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Edit Transaction' : 'Add Transaction'}</h3>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'societyId', type: 'text', required: true },
                { name: 'month', type: 'text', required: true },
                { name: 'amount', type: 'number' },
                { name: 'dueDate', type: 'date', required: true },
                { name: 'paymentDate', type: 'date' },
                { name: 'paymentMethod', type: 'text' },
              ].map(({ name, type, required }) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  placeholder={name.replace(/([A-Z])/g, ' $1')}
                  value={form[name]}
                  onChange={handleChange}
                  required={required}
                />
              ))}
              <select name="status" value={form.status} onChange={handleChange} required>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
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
