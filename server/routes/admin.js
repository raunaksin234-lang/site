import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import Contact from '../models/Contact.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Hardcoded super admin credentials
const SUPER_ADMIN_EMAIL = 'admin@oscorp.com'
const SUPER_ADMIN_PASSWORD = 'admin123'

// Register or check super admin
const initializeSuperAdmin = async () => {
  try {
    const admin = await Admin.findOne({ email: SUPER_ADMIN_EMAIL })
    if (!admin) {
      const newAdmin = new Admin({
        email: SUPER_ADMIN_EMAIL,
        password: SUPER_ADMIN_PASSWORD,
        role: 'super-admin'
      })
      await newAdmin.save()
    }
  } catch (error) {
    console.log('Error initializing super admin:', error)
  }
}

// Initialize on startup
initializeSuperAdmin()

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await admin.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
})

// Get all contacts
router.get('/contacts', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json({ contacts })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message })
  }
})

// Get single contact
router.get('/contacts/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.json({ contact })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message })
  }
})

// Delete contact
router.delete('/contacts/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message })
  }
})

// Create new admin (super-admin only)
router.post('/create-admin', protect, async (req, res) => {
  try {
    if (req.admin.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can create new admins' })
    }

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' })
    }

    const newAdmin = new Admin({
      email,
      password,
      role: 'admin'
    })

    await newAdmin.save()

    res.status(201).json({
      message: 'Admin created successfully',
      admin: { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error: error.message })
  }
})

// Get all admins (super-admin only)
router.get('/admins', protect, async (req, res) => {
  try {
    if (req.admin.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can view all admins' })
    }

    const admins = await Admin.find().select('-password')
    res.json({ admins })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message })
  }
})

// Delete admin (super-admin only)
router.delete('/admins/:id', protect, async (req, res) => {
  try {
    if (req.admin.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can delete admins' })
    }

    if (req.params.id === req.admin.id) {
      return res.status(400).json({ message: 'Cannot delete your own admin account' })
    }

    const admin = await Admin.findByIdAndDelete(req.params.id)
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    res.json({ message: 'Admin deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error: error.message })
  }
})

export default router
