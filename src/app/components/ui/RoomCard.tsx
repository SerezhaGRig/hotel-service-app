"use client"

import React, { useState } from 'react';
import { Users, MapPin, ChevronRight } from 'lucide-react';
import { Room } from '@/app/types/hotel.types';
import { Button } from './Button';

interface RoomCardProps {
    room: Room;
    onBook: (room: Room) => void;
    index: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onBook, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animationDelay: `${index * 100}ms`
            }}
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isHovered && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-gray-900">Quick View</span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{room.name}</h3>
                <div className="flex items-center justify-between mb-4">
                    <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${room.price}
            </span>
                        <span className="text-gray-600 ml-1">/night</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Users size={16} className="mr-1" />
                        <span>{room.capacity} guests</span>
                    </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{room.size} m²</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
              {amenity}
            </span>
                    ))}
                </div>

                <Button onClick={() => onBook(room)} fullWidth>
                    Book Now
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
};
