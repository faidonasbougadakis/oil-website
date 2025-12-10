import { useState } from 'react'

const translations = {
  gr: {
    title: "Επικοινωνία",
    subtitle: "Έχετε ερωτήσεις ή σχόλια; Στείλτε μας ένα μήνυμα και θα επικοινωνήσουμε μαζί σας.",
    firstName: "Όνομα",
    lastName: "Επώνυμο",
    email: "Email",
    theme: "Θέμα (Θέμα email)",
    message: "Μήνυμα",
    submit: "Αποστολή μηνύματος",
    submitting: "Αποστολή...",
    sending: "ή στείλτε απευθείας στο email:",
    contactDetails: "Στοιχεία επικοινωνίας",
    useAny: "Χρησιμοποιήστε οποιαδήποτε από τις παρακάτω επιλογές για να επικοινωνήσετε.",
    emailLabel: "Email",
    phoneLabel: "Τηλέφωνο",
    addressLabel: "Διεύθυνση",
    hoursLabel: "Ώρες λειτουργίας",
    messageUs: "Στείλτε μας μήνυμα",
    visitProfile: "Επισκεφθείτε το προφίλ",
    copy: "Αντιγραφή",
    copied: "Αντιγράφηκε",
    errorRequired: "Παρακαλώ συμπληρώστε όλα τα πεδία.",
    errorEmail: "Παρακαλώ δώστε μια έγκυρη διεύθυνση ηλεκτρονικού ταχυδρομείου.",
    success: "Μήνυμα απεστάλη. Ευχαριστούμε!",
    error: "Κάτι πήγε στραφώνια. Παρακαλώ δοκιμάστε ξανά αργότερα.",
  },
  en: {
    title: "Contact Us",
    subtitle: "Have questions or feedback? Send us a message and we'll get back to you.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    theme: "Theme (email subject)",
    message: "Message",
    submit: "Send Message",
    submitting: "Sending...",
    sending: "or email directly:",
    contactDetails: "Contact details",
    useAny: "Use any of the options below to reach out.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    messageUs: "Message us",
    visitProfile: "Visit profile",
    copy: "Copy",
    copied: "Copied",
    errorRequired: "Please fill out all fields.",
    errorEmail: "Please provide a valid email address.",
    success: "Message sent. Thank you!",
    error: "Something went wrong. Please try again later.",
  },
};

export default function ContactUs({ language = "en" }: { language: "gr" | "en" }) {
  const t = translations[language];
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [theme, setTheme] = useState('General inquiry')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // small UI states for contact details interactions
  const [copiedPopup, setCopiedPopup] = useState<{ key: 'email' | 'phone' | null; x: number; y: number }>({ key: null, x: 0, y: 0 })

  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setErrorMsg(null)

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(t.errorRequired)
      return
    }
    if (!validateEmail(email)) {
      setErrorMsg(t.errorEmail)
      return
    }

    setSubmitting(true)
    setStatus('idle')

    try {
      const subject = `${theme} — ${firstName} ${lastName}`
      const payload = {
        to: 'cretanlands@gmail.com',
        subject,
        fromName: `${firstName} ${lastName}`,
        fromEmail: email,
        message,
      }

      // Allow configuring a separate API base URL via Vite env: VITE_API_BASE
      // If not provided and we're running in production (GitHub Pages),
      // fallback to opening the user's email client instead of attempting a POST to GitHub Pages.
      const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''
      const apiUrl = API_BASE ? `${API_BASE.replace(/\/$/, '')}/api/send-email` : '/api/send-email'

      if (import.meta.env.PROD && !API_BASE) {
        // On GitHub Pages there's no server to accept POST requests; open mail client instead.
        const mailto = `mailto:${payload.to}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(`From: ${payload.fromName} <${payload.fromEmail}>\n\n${payload.message}`)}`
        window.location.href = mailto
        setStatus('success')
      } else {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const errText = await res.text().catch(() => 'Failed to send')
          throw new Error(errText)
        }

        setStatus('success')
      }

      setFirstName('')
      setLastName('')
      setEmail('')
      setTheme('General inquiry')
      setMessage('')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg(t.error)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleCopy(text: string, key: 'email' | 'phone', event: React.MouseEvent<HTMLAnchorElement>) {
    try {
      await navigator.clipboard.writeText(text)
      const rect = event.currentTarget.getBoundingClientRect()
      setCopiedPopup({ key, x: rect.left + rect.width / 2, y: rect.top })
      setTimeout(() => setCopiedPopup({ key: null, x: 0, y: 0 }), 2000)
    } catch {
      /* ignore */
    }
  }

  // contact details (adjust as needed)
  const contact = {
    sales_email: 'sales@cretan-land.gr',
    info_email:'info@cretan-land.gr',
    phone: '+30 6986720400',
    phone2: '+30 281 0228351',
    address: 'Μανουσογιάννη 3 71202 Ηράκλειο Κρήτης Ελλάδα',
    hours: 'Mon–Fri, 08:00–16:00',
  }

  return (
    <section
      id="contact-us"
      aria-labelledby="contact-heading"
      className="py-12 w-full"
      style={{ backgroundColor: '#8F9079' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Form column */}
          <div
            className="lg:col-span-2 rounded-2xl p-8 transform transition duration-300 hover:-translate-y-1 shadow-md"
            style={{
              background: 'linear-gradient(135deg, #F6F5EE 0%, #F0F0E6 100%)',
            }}
          >
            <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-center text-black mb-4">
              {t.title}
            </h2>
            <p className="mt-2 text-sm text-black/90">
              {t.subtitle}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 gap-y-6"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-black">
                    {t.firstName}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 shadow-sm text-gray-900 focus:border-[#9B9C5D] focus:ring-[#9B9C5D]/40"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-black">
                    {t.lastName}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 shadow-sm text-gray-900 focus:border-[#9B9C5D] focus:ring-[#9B9C5D]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black">
                    {t.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 shadow-sm text-gray-900 focus:border-[#9B9C5D] focus:ring-[#9B9C5D]/40"
                  />
                </div>

                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-black">
                    {t.theme}
                  </label>
                  <input
                    id="theme"
                    name="theme"
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 shadow-sm text-gray-900 focus:border-[#9B9C5D] focus:ring-[#9B9C5D]/40"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 shadow-sm text-gray-900 focus:border-[#9B9C5D] focus:ring-[#9B9C5D]/40"
                />
              </div>

              {errorMsg && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMsg}
                </p>
              )}

              {status === 'success' && (
                <p className="text-sm text-green-600" role="status">
                  {t.success}
                </p>
              )}

              <div className="flex flex-col items-center gap-4 mt-4 max-[500px]:flex-col max-[500px]:items-center sm:flex-row sm:items-center sm:justify-start">
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ backgroundColor: '#9B9C5D' }} // Olive Fruit button
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow hover:scale-[1.01] transition-transform disabled:opacity-50"
                >
                  {submitting ? t.submitting : t.submit}
                </button>

                <div className="flex-1 min-w-0 text-center max-[500px]:text-center sm:text-left flex items-center justify-center sm:justify-start">
                  <p className="text-sm text-black break-words">
                    {t.sending}
                    <br />
                    <a href={`mailto:${contact.sales_email}`} className="font-semibold text-black break-words">
                      {contact.sales_email}
                    </a>
                    <br />
                    <a href={`mailto:${contact.info_email}`} className="font-semibold text-black break-words">
                      {contact.info_email}
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Contact details column */}
          <aside className="relative flex items-center">
            <div className="bg-gradient-to-tr from-[#F6F5EE] to-[#F0F0E6] border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center justify-center w-full">
              <h3 className="text-lg font-semibold text-black">{t.contactDetails}</h3>
              <p className="mt-2 text-sm text-black">{t.useAny}</p>

              <dl className="mt-6 space-y-4 text-sm text-black">
                <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <svg className="w-5 h-5 text-[#9B9C5D] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M2 6.5C2 5.119 3.119 4 4.5 4h15C20.881 4 22 5.119 22 6.5v11c0 1.381-1.119 2.5-2.5 2.5h-15C3.119 20 2 18.881 2 17.5v-11z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6.5L12 13 2 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <dt className="font-medium block">{t.emailLabel}</dt>

                    <dd className="relative mt-1">
                      <a
                        href={`mailto:${contact.sales_email}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleCopy(contact.sales_email, 'email', e as any)
                        }}
                        className="text-sm break-words text-gray-800 cursor-pointer hover:text-[#9B9C5D] transition-colors block"
                        title={`Click to copy: ${contact.sales_email}`}
                      >
                        {contact.sales_email}
                      </a>
                    </dd>

                    <dd className="relative mt-1">
                      <a
                        href={`mailto:${contact.info_email}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleCopy(contact.info_email, 'email', e as any)
                        }}
                        className="text-sm break-words text-gray-800 cursor-pointer hover:text-[#9B9C5D] transition-colors block"
                        title={`Click to copy: ${contact.info_email}`}
                      >
                        {contact.info_email}
                      </a>

                      {copiedPopup.key === 'email' && (
                        <div
                          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in pointer-events-none"
                        >
                          {t.copy}
                        </div>
                      )}
                    </dd>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <svg className="w-5 h-5 text-[#9B9C5D] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.1 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 4.18 2 2 0 0 1 4 2h3.09a1 1 0 0 1 1 .75c.12.66.34 1.3.64 1.9a1 1 0 0 1-.24 1.04L7.91 7.91a15.07 15.07 0 0 0 6 6l1.22-1.22a1 1 0 0 1 1.04-.24c.59.3 1.23.52 1.9.64a1 1 0 0 1 .75 1V20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <dt className="font-medium">{t.phoneLabel}</dt>
                    <dd className="relative">
                      <a
                        href={`tel:${contact.phone}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleCopy(contact.phone, 'phone', e as any)
                        }}
                        className="text-sm text-gray-800 cursor-pointer hover:text-[#9B9C5D] transition-colors"
                      >
                        {contact.phone}
                      </a>
                      {contact.phone2 && (
                        <div className="mt-1">
                          <a
                            href={`tel:${contact.phone2}`}
                            onClick={(e) => {
                              e.preventDefault()
                              handleCopy(contact.phone2, 'phone', e as any)
                            }}
                            className="text-sm text-gray-800 cursor-pointer hover:text-[#9B9C5D] transition-colors"
                          >
                            {contact.phone2}
                          </a>
                        </div>
                      )}
                      {copiedPopup.key === 'phone' && (
                        <div
                          className="absolute top-0 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in pointer-events-none"
                        >
                          {t.copy}
                        </div>
                      )}
                    </dd>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <svg className="w-5 h-5 text-[#9B9C5D] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <dt className="font-medium">{t.addressLabel}</dt>
                    <dd className="text-sm text-black">{contact.address}</dd>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <svg className="w-5 h-5 text-[#9B9C5D] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <dt className="font-medium">{t.hoursLabel}</dt>
                    <dd className="text-sm text-black">{contact.hours}</dd>
                  </div>
                </div>
              </dl>
            
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}