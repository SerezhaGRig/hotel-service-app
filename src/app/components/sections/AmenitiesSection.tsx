"use client"

import React from 'react';
import { AmenityCard } from '@/app/components/ui/AmenityCard';
import { amenities } from '@/app/data/mockData';

export const AmenitiesSection: React.FC = () => {
    return (
        <section id="amenities" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Premium Amenities
            </span>
                    </h2>
                    <p className="text-xl text-gray-600">Everything you need for a perfect stay</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {amenities.map((amenity, index) => (
                        <AmenityCard key={index} amenity={amenity} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
