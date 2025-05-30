"use client"

import React from 'react';
import {MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle} from 'lucide-react';

const contactDetails = [
    {icon: MapPin, title: "Address", info: "123 Luxury Avenue, Downtown City, 12345", isLink: false},
    {icon: Phone, title: "Phone", info: "+1 (555) 123-4567", isLink: true, href: "tel:+15551234567"},
    {icon: Mail, title: "Email", info: "info@luxstayhotels.com", isLink: true, href: "mailto:info@luxstayhotels.com"},
    {icon: Clock, title: "Reception", info: "24/7 Service", isLink: false}
];

const socialLinks = [
    {icon: Facebook, name: "Facebook", href: "https://facebook.com/luxstayhotels", color: "hover:text-blue-600"},
    {icon: Instagram, name: "Instagram", href: "https://instagram.com/luxstayhotels", color: "hover:text-pink-600"},
    {icon: MessageCircle, name: "WhatsApp", href: "https://wa.me/15551234567", color: "hover:text-green-600"}
];

export const ContactInfo: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-5xl font-bold mb-8">
        <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Get in Touch
        </span>
            </h2>
            <div className="space-y-6 mb-8">
                {contactDetails.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex items-start group">
                            <div
                                className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="text-blue-600" size={24}/>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                {item.isLink ? (
                                    <a
                                        href={item.href}
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        {item.info}
                                    </a>
                                ) : (
                                    <p className="text-gray-600">{item.info}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Social Media Section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Connect With Us</h3>
                <div className="flex gap-4">
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                                aria-label={social.name}
                            >
                                <Icon size={24} className="text-gray-700"/>
                            </a>
                        );
                    })}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                    Follow us for exclusive offers and updates!
                </p>
            </div>
        </div>
    );
};
