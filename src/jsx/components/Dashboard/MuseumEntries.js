import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const MuseumEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({ 
    firstname: '',
    phone: '',
    address: '',
    num_of_persons: '1',
    total_amt: '50',
    payment: '0',
    gallery: '1',
    movie_show: '0',
    discount: '0'
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {  
    try {
      setLoading(true);
      const response = await axios.get('https://sri-chaitanya-mahaprabhu-museum-entry.onrender.com/api/museum');
      setEntries(response.data);
    } catch (error) {
      swal('Error', 'Failed to fetch entries', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({ 
      firstname: entry.firstname,
      phone: entry.phone,
      address: entry.address,
      num_of_persons: entry.num_of_persons,
      total_amt: entry.total_amt,
      payment: entry.payment,
      gallery: entry.gallery,
      movie_show: entry.movie_show,
      discount: entry.discount
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`https://sri-chaitanya-mahaprabhu-museum-entry.onrender.com/api/museum/${editingEntry.id}`, formData);
      swal('Success', 'Entry updated successfully', 'success');
      setShowModal(false);
      fetchEntries();
    } catch (error) {
      swal('Error', error.response?.data?.error || 'Failed to update entry', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entryId) => {
    const willDelete = await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this entry!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      try {
        setLoading(true);
        await axios.delete(`https://sri-chaitanya-mahaprabhu-museum-entry.onrender.com/api/museum/${entryId}`);
        swal('Success', 'Entry deleted successfully', 'success');
        fetchEntries();
      } catch (error) {
        swal('Error', error.response?.data?.error || 'Failed to delete entry', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Museum Entries</h4>
            </div>
            <div className="card-body">
              {loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Persons</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map(entry => (
                      <tr key={entry.id}>
                        <td>{entry.id}</td>
                        <td>{entry.firstname}</td>
                        <td>{entry.phone}</td>
                        <td>{entry.address}</td>
                        <td>{entry.num_of_persons}</td>
                        <td>₹{entry.total_amt}</td>
                        <td>{entry.date}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(entry)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(entry.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Number of Persons</label>
            <input
              type="number"
              className="form-control"
              value={formData.num_of_persons}
              onChange={(e) => setFormData({...formData, num_of_persons: e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Amount</label>
            <input
              type="number"
              className="form-control"
              value={formData.total_amt}
              onChange={(e) => setFormData({...formData, total_amt: e.target.value})}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Update Entry
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MuseumEntries;