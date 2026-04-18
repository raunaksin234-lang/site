import { useState, useEffect } from 'react'
import './AdminDashboard.css'

export default function AdminDashboard({ admin, token, onLogout }) {
  const [contacts, setContacts] = useState([])
  const [admins, setAdmins] = useState([])
  const [activeTab, setActiveTab] = useState('contacts')
  const [loading, setLoading] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' })
  const [showNewAdminForm, setShowNewAdminForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts()
    } else if (activeTab === 'admins' && admin.role === 'super-admin') {
      fetchAdmins()
    }
  }, [activeTab])

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setContacts(data.contacts)
      }
    } catch (err) {
      setError('Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }

  const fetchAdmins = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/admin/admins', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setAdmins(data.admins)
      }
    } catch (err) {
      setError('Failed to fetch admins')
    } finally {
      setLoading(false)
    }
  }

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return

    try {
      const response = await fetch(`http://localhost:3001/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setSuccess('Contact deleted successfully')
        fetchContacts()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to delete contact')
    }
  }

  const createAdmin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newAdmin.email || !newAdmin.password) {
      setError('Email and password are required')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAdmin)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Admin created successfully')
        setNewAdmin({ email: '', password: '' })
        setShowNewAdminForm(false)
        fetchAdmins()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.message || 'Failed to create admin')
      }
    } catch (err) {
      setError('Failed to create admin')
    }
  }

  const deleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return

    try {
      const response = await fetch(`http://localhost:3001/api/admin/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setSuccess('Admin deleted successfully')
        fetchAdmins()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to delete admin')
    }
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {admin.email}</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <div className="dashboard-container">
        <nav className="admin-nav">
          <button
            className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            📧 Contacts
          </button>
          {admin.role === 'super-admin' && (
            <button
              className={`nav-btn ${activeTab === 'admins' ? 'active' : ''}`}
              onClick={() => setActiveTab('admins')}
            >
              👤 Admins
            </button>
          )}
        </nav>

        <main className="admin-content">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {activeTab === 'contacts' && (
            <div className="tab-content">
              <h2>Contact Submissions</h2>
              {loading ? (
                <p>Loading...</p>
              ) : contacts.length === 0 ? (
                <p className="empty-state">No contacts yet</p>
              ) : (
                <div className="contacts-table">
                  <div className="table-header">
                    <div className="col-name">Name</div>
                    <div className="col-email">Email</div>
                    <div className="col-message">Message</div>
                    <div className="col-date">Date</div>
                    <div className="col-action">Action</div>
                  </div>
                  {contacts.map(contact => (
                    <div key={contact._id} className="table-row">
                      <div className="col-name">{contact.name}</div>
                      <div className="col-email">{contact.email}</div>
                      <div className="col-message">{contact.message.substring(0, 50)}...</div>
                      <div className="col-date">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                      <div className="col-action">
                        <button
                          className="delete-btn"
                          onClick={() => deleteContact(contact._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'admins' && admin.role === 'super-admin' && (
            <div className="tab-content">
              <div className="admins-header">
                <h2>Manage Admins</h2>
                <button
                  className="add-admin-btn"
                  onClick={() => setShowNewAdminForm(!showNewAdminForm)}
                >
                  {showNewAdminForm ? 'Cancel' : '+ Add Admin'}
                </button>
              </div>

              {showNewAdminForm && (
                <form className="new-admin-form" onSubmit={createAdmin}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      placeholder="new-admin@oscorp.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      placeholder="Strong password"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Create Admin</button>
                </form>
              )}

              {loading ? (
                <p>Loading...</p>
              ) : admins.length === 0 ? (
                <p className="empty-state">No admins found</p>
              ) : (
                <div className="admins-list">
                  {admins.map(adminItem => (
                    <div key={adminItem._id} className="admin-card">
                      <div className="admin-info">
                        <p className="admin-email">{adminItem.email}</p>
                        <p className="admin-role">{adminItem.role}</p>
                      </div>
                      {adminItem._id !== admin.id && (
                        <button
                          className="delete-btn"
                          onClick={() => deleteAdmin(adminItem._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
