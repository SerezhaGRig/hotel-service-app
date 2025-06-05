"use client"

import React from 'react';
import { X, User, Mail, Phone, Calendar, Users, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface BookingDetailsModalProps {
    booking: any;
    onClose: () => void;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Guest Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-900">Guest Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-700">
                                <User size={18} className="mr-3 text-gray-400" />
                                <span>{booking.guestName}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Mail size={18} className="mr-3 text-gray-400" />
                                <span>{booking.email}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Phone size={18} className="mr-3 text-gray-400" />
                                <span>{booking.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-900">Booking Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-700">
                                <Calendar size={18} className="mr-3 text-gray-400" />
                                <span>{booking.checkIn} - {booking.checkOut}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Users size={18} className="mr-3 text-gray-400" />
                                <span>{booking.guests} Guests</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <DollarSign size={18} className="mr-3 text-gray-400" />
                                <span>${booking.totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Booking Status</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
              {booking.status}
            </span>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button>
                        Update Status
                    </Button>
                </div>
            </div>
        </div>
    );
};
