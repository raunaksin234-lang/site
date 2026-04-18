import express from 'express'
import Contact from '../models/Contact.js'
import { sendContactEmail } from '../utils/sendEmail.js'

const router = express.Router()

router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const contact = new Contact({
      name,
      email,
      message
    })

    await contact.save()

    // Send email notification
    try {
      await sendContactEmail({ name, email, message })
      console.log(`Email sent for contact from ${name}`)
    } catch (emailError) {
      console.error('Error sending email:', emailError.message)
      // Don't fail the contact submission if email fails
    }

    res.status(201).json({ message: 'Contact submitted successfully', contact })
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact', error: error.message })
  }
})

export default router
