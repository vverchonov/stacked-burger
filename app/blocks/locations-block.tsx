'use client';

import Image from 'next/image';

const locations = [
  {
    title: 'KING ST.',
    address: '125 KING st. LONDON, ON.',
    addressUrl: 'https://maps.google.com/?q=125+King+St,+London,+ON+N6A+1C3',
    hours: 'Sunday - Thursday: 11am-10pm, Friday - Saturday: 10am-11pm',
    phone: '519 679 9009',
    phoneUrl: 'tel:+15196799009',
    description: 'Were located right on King, across the street from Covent Garden Market',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.6707589309474!2d-81.2497807!3d43.0006637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef21b01c07ef5%3A0x28c7d7699a056b99!2s125%20King%20St%2C%20London%2C%20ON%20N6A%201C3!5e0!3m2!1sen!2sca!4v1708532183010!5m2!1sen!2sca'
  },
  {
    title: 'CHERRYHILL MALL',
    address: '301 Oxford St W, London, ON N6H 1S6',
    addressUrl: 'https://maps.google.com/?q=Stacked+Burger+Cherryhill,+301+Oxford+St+W,+London,+ON+N6H+1S6',
    hours: 'Monday - Friday: 10am-9pm, Saturday: 10am-7pm, Sunday: 12pm-6pm',
    phone: '519 667 0202',
    phoneUrl: 'tel:+15196670202',
    description: 'We are located right inside the Cherry Hill mall',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.4320692921933!2d-81.275161!3d42.9902358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef1890fd1d6b7%3A0xb24ec1f8b8dbc57!2sStacked%20Burger%20Cherryhill!5e0!3m2!1sen!2sca!4v1740089332554!5m2!1sen!2sca'
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
        {/* Locations Grid */}
        <div className="space-y-4 flex flex-col items-center gap-4">
          {/* First Location */}
          <div className="flex flex-col md:flex-row items-start gap-2 mx-auto w-full">
            {/* Map */}
            <div className="md:w-1/2 w-full">
              <div className="max-w-[600px] mx-auto">
                <h2 className="text-[#F06002] text-7xl font-arial-black font-bold mb-2">
                  TRY IT ON
                </h2>
                <div 
                  className="aspect-square rounded-3xl overflow-hidden"
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
            </div>

            {/* Location Info */}
            <div className="md:w-1/2 space-y-4 flex justify-center flex-col my-auto mx-4">
              <h3 className="text-4xl lg:text-6xl font-bold font-arial-black">
                <span className="text-black">KING</span>
                <span className="text-[#F06002]">ST.</span>
              </h3>
              <a 
                href={locations[0].addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F06002] text-2xl hover:underline transition-all cursor-pointer"
              >
                {locations[0].address}
              </a>
              <p className="text-[#F06002] text-2xl">{locations[0].hours}</p>
              <a 
                href={locations[0].phoneUrl}
                className="text-[#F06002] text-2xl font-bold hover:underline transition-all cursor-pointer"
              >
                {locations[0].phone}
              </a>
              <p className="text-[#F06002] text-xl">{locations[0].description}</p>
            </div>
          </div>

          {/* Second Location */}
          <div className="flex flex-col-reverse md:flex-row items-start gap-2 w-full">
            {/* Location Info */}
            <div className="md:w-1/2 space-y-4 flex justify-center text-right flex-col my-auto mx-4">
              <h3 className="text-4xl lg:text-6xl font-bold font-arial-black">
                <span className="text-black">CHERRYHILL</span>
                <br />
                <span className="text-[#F06002]">MALL</span>
              </h3>
              <a 
                href={locations[1].addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F06002] text-2xl hover:underline transition-all cursor-pointer text-right"
              >
                {locations[1].address}
              </a>
              <p className="text-[#F06002] text-2xl">{locations[1].hours}</p>
              <a 
                href={locations[1].phoneUrl}
                className="text-[#F06002] text-2xl font-bold hover:underline transition-all cursor-pointer"
              >
                {locations[1].phone}
              </a>
              <p className="text-[#F06002] text-xl">{locations[1].description}</p>
            </div>

            {/* Map */}
            <div className="md:w-1/2 w-full">
              <div className="max-w-[600px] mx-auto">
                <h2 className="text-[#F06002] text-7xl font-arial-black font-bold mb-2">
                  AND
                </h2>
                <div 
                  className="aspect-square rounded-3xl overflow-hidden"
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
    </div>
  );
};

export default LocationsBlock; 