import React, { useState } from 'react';
import axios from 'axios';

const AdminContactMsgs = () => {
  const [msgs, setMsgs] = useState([]);

  const fetchMsgs = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/MsgsFetch');
      console.log(response);
      setMsgs(response.data);
    } catch (error) {
      console.error('Error fetching Msgs:', error);
    }
  };

  const showMsgs = () => {
    console.log('showMsgs function in show Msgs');
    fetchMsgs();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='container mt-5 my-5'>
      <div className='d-flex justify-content-center mb-4'>
        <button className='btn btn-primary' onClick={showMsgs}>Show Messages</button>
      </div>
      <p className='h4 text-center mb-4'>All Msgs</p>
      <div className="table-responsive">
        <table className="table table-striped">
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
            {msgs.map((item, index) => (
              <tr key={index}>
                <td>{item.fullname}</td>
                <td>{formatDate(item.submitted_at)}</td> {/* Ensure `msgDate` exists in your backend response */}
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactMsgs;
