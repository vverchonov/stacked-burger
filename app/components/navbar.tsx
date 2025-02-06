'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  onClick?: () => void;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isFranchisePage = pathname === '/franchise';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const homeLink: NavLink = { href: '/', label: 'HOME' };
  
  const mainNavLinks: NavLink[] = [
    { href: '#locations', label: 'LOCATIONS', onClick: () => scrollToSection('locations-block') },
    { href: '#menu', label: 'MENU', onClick: () => scrollToSection('menu-block') },
    { href: '#about', label: 'ABOUT', onClick: () => scrollToSection('we-are-block') },
    { href: '/franchise', label: 'FRANCHISE' },
    { href: '#contact', label: 'CONTACT', onClick: () => scrollToSection('contact-block') },
  ];

  const navLinks = isFranchisePage ? [homeLink] : mainNavLinks;

  return (
    <nav 
      className="bg-[#1E1E1E] text-white fixed w-full z-50 top-0"
      style={{
        boxShadow: '0px 4px 17.1px 6px #00000063'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Stacked Burger logo"
                  width={48}
                  height={48}
                  className="mr-3"
                  priority
                />
                <span className="text-2xl font-bold tracking-wide">STACKED BURGER</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <button
                    key={link.href}
                    onClick={link.onClick}
                    className="hover:text-[#F06002] hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-[#F06002] hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-300 hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <button
                  key={link.href}
                  onClick={() => {
                    link.onClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:text-[#F06002] hover:underline transition-colors duration-200"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 hover:text-[#F06002] hover:underline transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
