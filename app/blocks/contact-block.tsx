'use client';

import { useState } from 'react';

const ContactBlock = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('message', formData.message);
    form.append('isFranchise', 'false');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();

      console.log('data:',data)
      
      if (response.ok) {
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div id="contact-block" className="bg-[#1E1E1E] text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-[#F06002] font-arial-black text-7xl font-bold mb-4">
          CONTACT
        </h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Title Section */}
          <div className="md:w-fit">
            <h3 className="text-white font-arial-black text-7xl font-bold">
              US
            </h3>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="NAME"
                className="w-full bg-transparent border border-white/30 rounded-full px-6 py-4 
                         focus:outline-none focus:border-[#F06002] transition-colors"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL"
                className="w-full bg-transparent border border-white/30 rounded-full px-6 py-4 
                         focus:outline-none focus:border-[#F06002] transition-colors"
                required
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="MESSAGE"
                rows={6}
                className="w-full bg-transparent border border-white/30 rounded-3xl px-6 py-4 
                         focus:outline-none focus:border-[#F06002] transition-colors resize-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-transparent border border-white/30 rounded-full px-6 py-4 
                         hover:bg-[#F06002] hover:border-[#F06002] transition-all duration-300
                         focus:outline-none text-lg font-semibold"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactBlock; 