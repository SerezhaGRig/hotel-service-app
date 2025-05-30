"use client"

import React from 'react';

const footerLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' }
];

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            LuxStay Hotels
          </span>
                </h3>
                <p className="text-gray-400 mb-8">Experience luxury redefined</p>
                <div className="flex justify-center space-x-6 mb-8">
                    {footerLinks.map((link) => (
<a
                        key={link.label}
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        >
                    {link.label}
                        </a>
                        ))}
                </div>
                <p className="text-gray-500">© 2024 LuxStay Hotels. All rights reserved.</p>
            </div>
        </footer>
    );
};
