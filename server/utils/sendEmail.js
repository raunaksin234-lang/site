import nodemailer from 'nodemailer'

let transporter = null

const initializeTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })

    transporter.verify((error, success) => {
      if (error) {
        console.log('❌ Email transporter error:', error.message)
      } else {
        console.log('✅ Email transporter ready - Gmail SMTP connected')
      }
    })
  }
  return transporter
}

export const sendContactEmail = async (contactData) => {
  const { name, email, message } = contactData

  const emailTransporter = initializeTransporter()

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_RECIPIENT,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Sent from OScorp Creatives Contact Form</small></p>
    `
  }

  return emailTransporter.sendMail(mailOptions)
}
