import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AdminContactMsgs = () => {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchMsgs = async () => {
    setLoadError(false);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/MsgsFetch`, {}, { timeout: 15000 });
      console.log(response);
      setMsgs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching Msgs:', error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  const showMsgs = () => {
    fetchMsgs();
  };

  // Load the list as soon as the page opens
  useEffect(() => {
    showMsgs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2 className="admin-page__title">All Msgs</h2>
          <p className="admin-page__subtitle">
            {msgs.length > 0 ? `${msgs.length} messages, newest first` : "Messages sent from the Contact Us page."}
          </p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover admin-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {(msgs.length === 0 || loadError) && (
              <tr>
                <td colSpan={5} className="admin-empty">
                  {loading ? (
                    "Loading messages…"
                  ) : loadError ? (
                    <span className="admin-error">
                      Couldn’t load messages. Is the backend running?{" "}
                      <button className="btn btn-outline-primary btn-sm" onClick={() => { setLoading(true); fetchMsgs(); }}>
                        Try again
                      </button>
                    </span>
                  ) : (
                    "No messages yet."
                  )}
                </td>
              </tr>
            )}
            {msgs.map((item, index) => (
              <tr key={index}>
                <td className="admin-cell-strong admin-table__title" data-label="Name">{item.fullname}</td>
                <td className="text-nowrap" data-label="Date">{formatDate(item.submitted_at)}</td>
                <td className="text-nowrap admin-cell-muted" data-label="Phone">{item.phone_number}</td>
                <td className="admin-cell-muted" data-label="Email">{item.email}</td>
                <td className="admin-cell-wrap admin-table__block" data-label="Message">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactMsgs;
