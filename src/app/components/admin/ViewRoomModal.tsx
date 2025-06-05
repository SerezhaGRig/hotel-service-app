"use client"

import React from 'react';
import { X, Edit, Users, MapPin, DollarSign, Check, X as XIcon } from 'lucide-react';
import { Room } from '@/app/types/hotel.types';
import { Button } from '@/app/components/ui/Button';

interface ViewRoomModalProps {
    room: Room;
    onEdit: () => void;
    onClose: () => void;
}

export const ViewRoomModal: React.FC<ViewRoomModalProps> = ({ room, onEdit, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="relative h-80">
                    <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white"
                    >
                        <X size={20} />
                    </button>
                    <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold ${
                        room.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {room.available ? 'Available' : 'Occupied'}
                    </div>
                </div>

                <div className="p-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h2>
                        <p className="text-gray-600">Room #{room.id}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center text-gray-600 mb-1">
                                <DollarSign size={18} className="mr-2" />
                                <span className="text-sm">Price</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900">${room.price}/night</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center text-gray-600 mb-1">
                                <Users size={18} className="mr-2" />
                                <span className="text-sm">Capacity</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900">{room.capacity} guests</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center text-gray-600 mb-1">
                                <MapPin size={18} className="mr-2" />
                                <span className="text-sm">Size</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900">{room.size} m²</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center text-gray-600 mb-1">
                                <span className="text-sm">Type</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900 capitalize">{room.type}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {room.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center text-gray-700">
                                    <Check size={18} className="mr-2 text-green-500" />
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <Button onClick={onEdit} fullWidth>
                            <Edit size={20} className="mr-2" />
                            Edit Room
                        </Button>
                        <Button onClick={onClose} variant="outline" fullWidth>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
