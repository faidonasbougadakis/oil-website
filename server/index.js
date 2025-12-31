import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const DEFAULT_RECIPIENT = process.env.DEFAULT_RECIPIENT || smtpUser || 'cretanlands@gmail.com'

// Do not print credentials or warnings here; keep server output minimal.

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
})

// Verify at startup so failures are visible in logs (no secrets printed).
transporter.verify().catch((err) => {
  console.error('SMTP verify failed:', err && err.message ? err.message : err)
})

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, fromName, fromEmail, message } = req.body || {}
    if (!subject || !fromName || !fromEmail || !message) {
      return res.status(400).send('Missing required fields')
    }

    // Validate sender email format (basic).
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(String(fromEmail).trim())) {
      return res.status(400).send('Invalid fromEmail')
    }

    // Force the recipient to the default project recipient to avoid accidental misrouting.
    // (Client-supplied `to` is ignored by default.)
    const toAddress = DEFAULT_RECIPIENT

    // Use authenticated SMTP user as the envelope From to satisfy providers
    // (Gmail frequently rejects mails where MAIL FROM is not the authenticated account).
    const envelopeFrom = smtpUser ? `${smtpUser}` : fromEmail

    const mailOptions = {
      from: smtpUser ? `${fromName} <${smtpUser}>` : `${fromName} <${fromEmail}>`,
      to: toAddress,
      subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br/>')}</p><hr/><p>From: ${fromName} &lt;${fromEmail}&gt;</p>`,
      // Put user's address in replyTo so replies go to them
      replyTo: fromEmail,
      envelope: { from: envelopeFrom, to: toAddress },
    }

      // If SMTP credentials are not provided, respond indicating service unavailable.
      if (!smtpUser || !smtpPass) {
        return res.status(503).json({ ok: false, error: 'SMTP not configured' })
      }

      const info = await transporter.sendMail(mailOptions)
      const accepted = Array.isArray(info && info.accepted) ? info.accepted : []
      const rejected = Array.isArray(info && info.rejected) ? info.rejected : []

      // If nothing was accepted, treat as delivery handoff failure.
      if (!accepted.length) {
        return res.status(502).json({
          ok: false,
          error: 'Message was not accepted by SMTP server',
          messageId: info && info.messageId,
          rejected,
        })
      }

      return res.status(200).json({
        ok: true,
        messageId: info && info.messageId,
        accepted,
        rejected,
        envelope: info && info.envelope,
        response: info && info.response,
      })
  } catch (err) {
    console.error('Send email error', err)
    return res.status(500).send('Failed to send email')
  }
})

// Dev endpoints for saved emails removed to avoid storing emails on disk

const server = app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`)
  console.log(
    `SMTP: host=${smtpHost} port=${smtpPort} secure=${smtpSecure} recipient=${DEFAULT_RECIPIENT}`
  )
})

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Another server may be running. Stop it or set PORT to a different value.`)
    process.exit(1)
  }
  console.error('Server error', err)
  process.exit(1)
})
