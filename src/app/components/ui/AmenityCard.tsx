"use client"

import React from 'react';
import { Amenity } from '@/app/types/hotel.types';

interface AmenityCardProps {
    amenity: Amenity;
    index: number;
}

export const AmenityCard: React.FC<AmenityCardProps> = ({ amenity, index }) => {
    const Icon = amenity.icon;

    return (
        <div
            className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 text-center"
            style={{
                animationDelay: `${index * 100}ms`
            }}
        >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon size={36} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{amenity.label}</h3>
            <p className="text-gray-600 text-sm">{amenity.description}</p>
        </div>
    );
};
