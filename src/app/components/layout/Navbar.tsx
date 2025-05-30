"use client"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScroll } from '@/app/hooks/useScroll';
import { Button } from '@/app/components/ui/Button';

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrolled = useScroll();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/rooms', label: 'All Rooms' },
        { href: '/#amenities', label: 'Amenities' },
        { href: '/#contact', label: 'Contact' }
    ];

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                            scrolled ? 'text-gray-900' : 'text-white'
                        }`}>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LuxStay
              </span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
<a
                            key={link.label}
                            href={link.href}
                            className={`transition-all duration-300 hover:text-blue-600 ${
                            scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                        }`}
                            >
                        {link.label}
                            </a>
                            ))}
                        <Button size="sm">Book Now</Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`transition-colors duration-300 ${
                                scrolled ? 'text-gray-700' : 'text-white'
                            }`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden transition-all duration-300 ${
                isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden bg-white`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
<a
                        key={link.label}
                        href={link.href}
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                    {link.label}
                        </a>
                        ))}
                </div>
            </div>
        </nav>
    );
};
