'use client';

import { useState } from 'react';

const InterestedBlock = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-[#1E1E1E] py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h2 className="text-[#F06002] font-arial-black text-5xl lg:text-8xl font-bold mb-16 text-center">
            INTERESTED?
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                     text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            />
            
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                     text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                     text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            />
            
            <textarea
              name="message"
              placeholder="MESSAGE"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full bg-transparent border border-white/20 rounded-3xl px-8 py-5 
                     text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                     transition-colors resize-none text-xl"
            />

            <button
              type="submit"
              className="w-full bg-[#1E1E1E] text-white border border-white/20 rounded-full 
                     px-8 py-5 text-xl font-medium hover:bg-[#F06002] hover:border-[#F06002]
                     transition-all duration-300 focus:outline-none"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterestedBlock; 