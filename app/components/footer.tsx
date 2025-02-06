'use client';

const Footer = () => {
  return (
    <footer className="bg-[#F06002] w-full py-4 text-white text-center">
      <div className="container mx-auto">
        <p className="text-lg">
          © {new Date().getFullYear()} Stacked Burger - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer; 