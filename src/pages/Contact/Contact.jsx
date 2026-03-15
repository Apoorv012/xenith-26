// import React, { useState, useRef, useEffect } from 'react';
// import emailjs from '@emailjs/browser';
// import './Contact.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState('');
//   const [isInputActive, setIsInputActive] = useState(false);
//   const formRef = useRef(null);

//   const SERVICE_ID = 'service_2g4av3j';
//   const TEMPLATE_ID = 'template_wpxlhwd';
//   const PUBLIC_KEY = 'iIq1zmtM2Ku8OvZoc';

//   useEffect(() => {
//     emailjs.init(PUBLIC_KEY);
//   }, []);

//   const handleInputFocus = () => setIsInputActive(true);
//   const handleInputBlur = () => setIsInputActive(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const sendEmail = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus('');

//     try {
//       await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
//       setSubmitStatus('success');
//       setFormData({ name: '', email: '', message: '' });
//     } catch (error) {
//       setSubmitStatus('error');
//       console.error('EmailJS Error:', error);
//     } finally {
//       setIsSubmitting(false);
//       setIsInputActive(false);
//     }
//   };

//   useEffect(() => {
//     if (submitStatus) {
//       const timer = setTimeout(() => {
//         setSubmitStatus('');
//       }, 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [submitStatus]);

//   return (
//     <div className={`contact-page ${isInputActive ? 'input-active' : ''}`}>
//       <div className="container">
//         <div className="left-half">
//           <div className="contact-text">
//             We would love to hear from you. Feel free to contact us via this form.
//           </div>
//         </div>

//         <div className="right-half">
//           <div className="form-container">
//             <form ref={formRef} onSubmit={sendEmail}>
//               <h1>Contact Us</h1>

//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 onFocus={handleInputFocus}
//                 onBlur={handleInputBlur}
//                 required
//                 disabled={isSubmitting}
//               />

//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onFocus={handleInputFocus}
//                 onBlur={handleInputBlur}
//                 required
//                 disabled={isSubmitting}
//               />

//               <label htmlFor="message">Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows="5"
//                 value={formData.message}
//                 onChange={handleChange}
//                 onFocus={handleInputFocus}
//                 onBlur={handleInputBlur}
//                 required
//                 disabled={isSubmitting}
//               />

//               <button type="submit" disabled={isSubmitting || submitStatus === 'success'}>
//                 {isSubmitting ? (
//                   <span className="spinner">✨ Sending...</span>
//                 ) : submitStatus === 'success' ? (
//                   <span>✅ Sent!</span>
//                 ) : (
//                   'Send Message'
//                 )}
//               </button>

//               <div className="contact-info">
//                 <p>© 2026 IEEESBJIIT. All rights reserved</p>
//               </div>
//             </form>

//             {submitStatus === 'success' && (
//               <div className="success-animation">
//                 <div className="success-circle"></div>
//                 <div className="success-checkmark">
//                   <div className="checkmark-stem"></div>
//                   <div className="checkmark-kick"></div>
//                 </div>
//                 <h3>Message Sent Successfully! 🎉</h3>
//                 <p>Check your email provider for our response.</p>
//               </div>
//             )}

//             {submitStatus === 'error' && (
//               <div className="error-animation">
//                 <div className="error-circle"></div>
//                 <h3>Oops! Something went wrong 😅</h3>
//                 <p>Please try again or contact us directly.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const formRef = useRef(null);

  const SERVICE_ID = 'service_2g4av3j';
  const TEMPLATE_ID = 'template_wpxlhwd';
  const PUBLIC_KEY = 'iIq1zmtM2Ku8OvZoc';

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleInputFocus = () => setIsInputActive(true);
  const handleInputBlur = () => setIsInputActive(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
      setIsInputActive(false);
    }
  };

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div className={`contact-page ${isInputActive ? 'input-active' : ''}`}>
      <div className="contact-wrapper">
        
        {/* Left Section - Title & Description */}
        <div className="contact-left">
          <div className="contact-logo">
            <img src="/x-logo.png" alt="Xenith Logo" />
          </div>
          <div className="contact-header">
            <h1 className="contact-main-title">Get in Touch</h1>
            <div className="contact-divider"></div>
            <p className="contact-description">
              We would love to hear from you. Feel free to contact us via this form.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="contact-accent accent-1"></div>
          <div className="contact-accent accent-2"></div>
        </div>

        {/* Right Section - Form */}
        <div className="contact-right">
          <div className="form-container">
            <form ref={formRef} onSubmit={sendEmail}>
              <h2>Contact Us</h2>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                disabled={isSubmitting}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                disabled={isSubmitting}
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                disabled={isSubmitting}
              />

              <button type="submit" disabled={isSubmitting || submitStatus === 'success'}>
                {isSubmitting ? (
                  <span className="spinner">✨ Sending...</span>
                ) : submitStatus === 'success' ? (
                  <span>✅ Sent!</span>
                ) : (
                  'Send Message'
                )}
              </button>

              <div className="contact-info">
                <p>© 2026 IEEESBJIIT. All rights reserved</p>
              </div>
            </form>

            {submitStatus === 'success' && (
              <div className="success-animation">
                <div className="success-circle"></div>
                <div className="success-checkmark">
                  <div className="checkmark-stem"></div>
                  <div className="checkmark-kick"></div>
                </div>
                <h3>Message Sent Successfully! 🎉</h3>
                <p>Check your email provider for our response.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-animation">
                <div className="error-circle"></div>
                <h3>Oops! Something went wrong 😅</h3>
                <p>Please try again or contact us directly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
