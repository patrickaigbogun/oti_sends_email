// app/page.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('An error occurred.');
    }
  };

  return (
    <form className='text-gray-700' onSubmit={handleSubmit}>
      <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your Name" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your Email" />
      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default Form;
