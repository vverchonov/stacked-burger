'use client';

import Image from 'next/image';

const locations = [
  {
    title: 'KING ST.',
    address: '125 KING st. LONDON, ON.',
    hours: '10am-10pm',
    phone: '226 645 6466',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.6707589309474!2d-81.2497807!3d43.0006637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef21b01c07ef5%3A0x28c7d7699a056b99!2s125%20King%20St%2C%20London%2C%20ON%20N6A%201C3!5e0!3m2!1sen!2sca!4v1708532183010!5m2!1sen!2sca'
  },
  {
    title: 'CHERRYHILL MALL',
    address: '125 KING st. LONDON, ON.',
    hours: '10am-10pm',
    phone: '226 645 6466',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.6707589309474!2d-81.2497807!3d43.0006637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef21b01c07ef5%3A0x28c7d7699a056b99!2s125%20King%20St%2C%20London%2C%20ON%20N6A%201C3!5e0!3m2!1sen!2sca!4v1708532183010!5m2!1sen!2sca'
  }
];

const LocationsBlock = () => {
  return (
    <div id="locations-block" className="relative bg-white py-32">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/locations/back.webp"
          alt="Background pattern"
          fill
          className="object-cover opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Title */}
 

        {/* Locations Grid */}
        <div className="space-y-4 flex flex-col items-center gap-4">
          {/* First Location */}
          <div className="flex flex-col md:flex-row items-start gap-2 mx-auto">
            {/* Map */}
            <div className="md:w-1/2 w-full">
            <h2 className="text-[#F06002] text-7xl font-bold mb-2">
                TRY IT ON
            </h2>
              <div 
                className="aspect-square rounded-3xl overflow-hidden max-w-[600px] mx-auto"
                style={{
                  border: '13px solid #F06002',
                  boxShadow: '0px 0px 36.9px 0px #00000066'
                }}
              >
                <iframe
                  src={locations[0].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Location Info */}
            <div className="md:w-1/2 space-y-4 flex justify-center flex-col my-auto mx-4">
              <h3 className="text-6xl font-bold">
                <span className="text-black">KING</span>
                <span className="text-[#F06002]">ST.</span>
              </h3>
              <p className="text-[#F06002] text-2xl">{locations[0].address}</p>
              <p className="text-[#F06002] text-2xl">{locations[0].hours}</p>
              <p className="text-[#F06002] text-2xl font-bold">{locations[0].phone}</p>
              <p className="text-[#F06002] text-xl">{locations[0].description}</p>
            </div>
          </div>

          {/* Second Location */}
          <div className="flex flex-col-reverse md:flex-row items-start gap-2">
            {/* Location Info */}
            <div className="md:w-1/2 space-y-4 flex justify-center text-right flex-col my-auto mx-4">
              <h3 className="text-6xl font-bold">
                <span className="text-black">CHERRYHILL</span>
                <br />
                <span className="text-[#F06002]">MALL</span>
              </h3>
              <p className="text-[#F06002] text-2xl">{locations[1].address}</p>
              <p className="text-[#F06002] text-2xl">{locations[1].hours}</p>
              <p className="text-[#F06002] text-2xl font-bold">{locations[1].phone}</p>
              <p className="text-[#F06002] text-xl">{locations[1].description}</p>
            </div>

            {/* Map */}
            <div className="md:w-1/2 w-full">
            <h2 className="text-[#F06002] text-left text-7xl font-bold mb-2">
                AND
            </h2>
              <div 
                className="aspect-square rounded-3xl overflow-hidden max-w-[600px] mx-auto"
                style={{
                  border: '13px solid #F06002',
                  boxShadow: '0px 0px 36.9px 0px #00000066'
                }}
              >
                <iframe
                  src={locations[1].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsBlock; 