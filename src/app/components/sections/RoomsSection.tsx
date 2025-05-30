"use client"

import React from 'react';
import { RoomCard } from '@/app/components/ui/RoomCard';
import { Room, BookingForm, RoomType } from '@/app/types/hotel.types';
import { rooms } from '@/app/data/mockData';

interface RoomsSectionProps {
    booking: BookingForm;
    onBookingChange: (booking: BookingForm) => void;
    onBookRoom: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
                                                              booking,
                                                              onBookingChange,
                                                              onBookRoom
                                                          }) => {
    const roomTypes: RoomType[] = ['all', 'standard', 'deluxe', 'suite', 'family'];

    const filteredRooms = rooms.filter(room =>
        booking.roomType === 'all' || room.type === booking.roomType
    );

    return (
        <section id="rooms" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Our Luxury Rooms
            </span>
                    </h2>
                    <p className="text-xl text-gray-600">Choose from our selection of luxury accommodations</p>
                </div>

                {/* Room Type Filter */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white rounded-full shadow-lg p-1">
                        {roomTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => onBookingChange({...booking, roomType: type})}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    booking.roomType === type
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRooms.map((room, index) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onBook={onBookRoom}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
