import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../config/api';


const UsersShow = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        setLoadError(false);
        try {
          const response = await axios.get(`${API_BASE_URL}/api/admin/usersFetch`, { timeout: 15000 });
          console.log(response);
          setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching users:', error);
          setLoadError(true);
        } finally {
          setLoading(false);
        }
      };

      const showusers = () => {
        fetchUsers();
      };

      // Load the list as soon as the page opens
      useEffect(() => {
        showusers();
      }, []);

      const filteredUsers = users.filter((item) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        const name = `${item.FirstName || ''} ${item.LastName || ''}`.toLowerCase();
        const email = (item.Email || '').toLowerCase();
        const phone = (item.PhoneNumber || '').toString().toLowerCase();
        return name.includes(term) || email.includes(term) || phone.includes(term);
      });

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2 className="admin-page__title">All users</h2>
          <p className="admin-page__subtitle">
            {users.length > 0 ? `${filteredUsers.length} of ${users.length} registered users` : "Everyone who has signed up on the website."}
          </p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar__search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="admin-toolbar__search-icon" />
          <input
            type="search"
            className="form-control"
            placeholder="Search by name, email or phone…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search users by name, email or phone"
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover admin-table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              {/* <th scope="col">Address</th> */}
              <th scope="col">PhoneNumber</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUsers.length === 0 || loadError) && (
              <tr>
                <td colSpan={4} className="admin-empty">
                  {loading ? (
                    "Loading users…"
                  ) : loadError ? (
                    <span className="admin-error">
                      Couldn’t load users. Is the backend running?{" "}
                      <button className="btn btn-outline-primary btn-sm" onClick={() => { setLoading(true); fetchUsers(); }}>
                        Try again
                      </button>
                    </span>
                  ) : users.length === 0 ? (
                    "No users yet."
                  ) : (
                    "No users match your search."
                  )}
                </td>
              </tr>
            )}
            {filteredUsers.map((item, index) => (
              <tr key={index}>
                <td className="admin-cell-strong admin-table__title" data-label="Email">{item.Email}</td>
                <td data-label="Name">{item.FirstName} {item.LastName}</td>
                {/* <td>{item.Address}</td> */}
                <td className="admin-cell-muted" data-label="Phone">{item.PhoneNumber}</td>
                <td data-label="Role">
                  <span className={`chip ${item.Role === "admin" ? "chip--accent" : "chip--neutral"}`}>
                    {item.Role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersShow
