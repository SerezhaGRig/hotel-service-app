"use client"

import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Room, BookingForm } from '@/app/types/hotel.types';
import { Button } from '@/app/components/ui/Button';

interface DatePickerModalProps {
    selectedRoom: Room;
    booking: BookingForm;
    onBookingChange: (booking: BookingForm) => void;
    onClose: () => void;
    onContinue: () => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
                                                                    selectedRoom,
                                                                    booking,
                                                                    onBookingChange,
                                                                    onClose,
                                                                    onContinue
                                                                }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform animate-scale-in">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Select Your Dates</h3>
                <p className="text-gray-600 mb-6">Choose your stay dates for {selectedRoom.name}</p>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="date"
                                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                value={booking.checkIn}
                                onChange={(e) => onBookingChange({...booking, checkIn: e.target.value})}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="date"
                                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                value={booking.checkOut}
                                onChange={(e) => onBookingChange({...booking, checkOut: e.target.value})}
                                min={booking.checkIn || new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold text-lg text-blue-600">${selectedRoom.price}</span> per night •
                            Up to {selectedRoom.capacity} guests
                        </p>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <Button onClick={onClose} variant="outline" fullWidth>
                        Cancel
                    </Button>
                    <Button onClick={onContinue} fullWidth>
                        Continue
                        <ChevronRight size={20} className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
