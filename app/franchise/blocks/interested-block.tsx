'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const InterestedBlock = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isCanadianResident: '',
    province: '',
    city: '',
    investmentCapital: ''
  });

  const canadianProvinces = [
    { name: 'Alberta', code: 'AB' },
    { name: 'British Columbia', code: 'BC' },
    { name: 'Manitoba', code: 'MB' },
    { name: 'New Brunswick', code: 'NB' },
    { name: 'Newfoundland and Labrador', code: 'NL' },
    { name: 'Nova Scotia', code: 'NS' },
    { name: 'Ontario', code: 'ON' },
    { name: 'Prince Edward Island', code: 'PE' },
    { name: 'Quebec', code: 'QC' },
    { name: 'Saskatchewan', code: 'SK' },
    { name: 'Northwest Territories', code: 'NT' },
    { name: 'Nunavut', code: 'NU' },
    { name: 'Yukon', code: 'YT' }
  ];

  const investmentOptions = [
    '$500,000+',
    '$250,000 - $500,000',
    '$150,000 - $250,000',
    'Below $150,000',
    'I only want a brochure at this stage'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'isCanadianResident', 'province', 'city', 'investmentCapital'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('isCanadianResident', formData.isCanadianResident);
    form.append('province', formData.province);
    form.append('city', formData.city);
    form.append('investmentCapital', formData.investmentCapital);
    form.append('isFranchise', 'true');

    try {
      console.log('Sending franchise form...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();
      console.log('API Response:', {
        status: response.status,
        ok: response.ok,
        data: data
      });

      if (response.ok) {
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          isCanadianResident: '',
          province: '',
          city: '',
          investmentCapital: ''
        });
        toast.success('Franchise request sent successfully!');
      } else {
        toast.error(`Failed to send request: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending franchise request:', error);
      toast.error('Failed to send request. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            {/* First Name and Last Name in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="FIRST NAME *"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                       text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                       transition-colors text-xl"
              />

              <input
                type="text"
                name="lastName"
                placeholder="LAST NAME *"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                       text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                       transition-colors text-xl"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="EMAIL *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                     text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            />

            <input
              type="tel"
              name="phone"
              placeholder="PHONE *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                     text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            />

            {/* Canadian Residency */}
            <select
              name="isCanadianResident"
              value={formData.isCanadianResident}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-6 pr-24
                     text-white focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            >
              <option value="" disabled className="bg-[#1E1E1E] text-white/60">Are you a Canadian permanent resident or citizen? *</option>
              <option value="yes" className="bg-[#1E1E1E] text-white">Yes</option>
              <option value="no" className="bg-[#1E1E1E] text-white">No</option>
            </select>

            {/* Province Selection */}
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-6 pr-24
                     text-white focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            >
              <option value="" disabled className="bg-[#1E1E1E] text-white/60">Province of Interest *</option>
              {canadianProvinces.map((province) => (
                <option key={province.code} value={province.code} className="bg-[#1E1E1E] text-white">
                  {province.name} ({province.code})
                </option>
              ))}
            </select>

            {/* City Input */}
            <input
              type="text"
              name="city"
              placeholder="CITY OF INTEREST *"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-5 
                     text-white placeholder-white/60 focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            />

            {/* Investment Capital */}
            <select
              name="investmentCapital"
              value={formData.investmentCapital}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-white/20 rounded-full px-8 py-6 pr-24
                     text-white focus:outline-none focus:border-[#F06002]
                     transition-colors text-xl"
            >
              <option value="" disabled className="bg-[#1E1E1E] text-white/60">What is your available investment capital? *</option>
              {investmentOptions.map((option, index) => (
                <option key={index} value={option} className="bg-[#1E1E1E] text-white">
                  {option}
                </option>
              ))}
            </select>

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