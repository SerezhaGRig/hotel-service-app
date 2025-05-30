"use client"

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactDetails = [
    { icon: MapPin, title: "Address", info: "123 Luxury Avenue, Downtown City, 12345" },
    { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
    { icon: Mail, title: "Email", info: "info@luxstayhotels.com" },
    { icon: Clock, title: "Reception", info: "24/7 Service" }
];

export const ContactInfo: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-5xl font-bold mb-8">
        <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Get in Touch
        </span>
            </h2>
            <div className="space-y-6">
                {contactDetails.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex items-start group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                <p className="text-gray-600">{item.info}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
