import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const MuseumEntry = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    phone: '',
    address: '',
    num_of_persons: '1',
    total_amt: '50',
    payment: '0',
    gallery: '1',
    movie_show: '0',
    discount: '0',
    image_name: '',
    txn_id: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? '1' : '0') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://sri-chaitanya-mahaprabhu-museum-entry.onrender.com/api/museum/public', formData);
      
      swal("Success!", "Museum entry created successfully!", "success");
      
      // Reset form
      setFormData({
        firstname: '',
        phone: '',
        address: '',
        num_of_persons: '1',
        total_amt: '50',
        payment: '0',
        gallery: '1',
        movie_show: '0',
        discount: '0',
        image_name: '',
        txn_id: ''
      });
    } catch (error) {
      swal("Error!", error.response?.data?.error || "Failed to create entry", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Museum Entry Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">Address *</label>
                    <textarea
                      className="form-control"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="col-lg-4 mb-3">
                    <label className="form-label">Number of Persons</label>
                    <input
                      type="number"
                      className="form-control"
                      name="num_of_persons"
                      value={formData.num_of_persons}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  
                  <div className="col-lg-4 mb-3">
                    <label className="form-label">Total Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="total_amt"
                      value={formData.total_amt}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  
                  <div className="col-lg-4 mb-3">
                    <label className="form-label">Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  
                  <div className="col-lg-6 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="gallery"
                        checked={formData.gallery === '1'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Gallery Visit</label>
                    </div>
                  </div>
                  
                  <div className="col-lg-6 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="movie_show"
                        checked={formData.movie_show === '1'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Movie Show</label>
                    </div>
                  </div>
                  
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">Payment Method</label>
                    <select
                      className="form-control"
                      name="payment"
                      value={formData.payment}
                      onChange={handleChange}
                    >
                      <option value="0">Cash</option>
                      <option value="1">Online</option>
                    </select>
                  </div>
                  
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">Transaction ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="txn_id"
                      value={formData.txn_id}
                      onChange={handleChange}
                      placeholder="For online payments"
                    />
                  </div>
                </div>
                
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Entry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumEntry;