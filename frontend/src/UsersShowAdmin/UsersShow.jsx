import React,{useState} from 'react'
import axios from 'axios';


const UsersShow = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/admin/usersFetch');
          console.log(response);
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      const showusers = () => {
        console.log('showusers function in show users');
        fetchUsers();
      };

      

  return (
    <div className='container mt-5 my-5'>
    <div className='d-flex justify-content-center mb-4'>
      <button className='btn btn-primary' onClick={showusers}>Show users</button>
    </div>
    <p className='h4 text-center mb-4'>All users</p>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"> Email</th>
            <th scope="col">Name</th>
            {/* <th scope="col">Address</th> */}
            <th scope="col">PhoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{item.Email}</td>
              <td>{item.FirstName} {item.LastName}</td>
              {/* <td>{item.Address}</td> */}
              <td>{item.PhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default UsersShow
