"use client"

import React from 'react';
import { Check } from 'lucide-react';
import { Room, BookingForm } from '@/app/types/hotel.types';
import { Button } from '@/app/components/ui/Button';

interface BookingModalProps {
    selectedRoom: Room;
    booking: BookingForm;
    onClose: () => void;
    onConfirm: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
                                                              selectedRoom,
                                                              booking,
                                                              onClose,
                                                              onConfirm
                                                          }) => {
    const calculateNights = () => {
        if (!booking.checkIn || !booking.checkOut) return 1;
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    };

    const nights = calculateNights();
    const totalPrice = selectedRoom.price * nights;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform animate-scale-in">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Confirm Your Booking</h3>

                <div className="space-y-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <h4 className="font-semibold text-lg text-gray-900">{selectedRoom.name}</h4>
                        <p className="text-blue-600 font-bold text-xl">${selectedRoom.price} per night</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-700">
                            <span>Check-in:</span>
                            <span className="font-medium">{booking.checkIn || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Check-out:</span>
                            <span className="font-medium">{booking.checkOut || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Guests:</span>
                            <span className="font-medium">{booking.guests}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Nights:</span>
                            <span className="font-medium">{nights}</span>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${totalPrice}
              </span>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <Button onClick={onClose} variant="outline" fullWidth>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} fullWidth>
                        <Check size={20} className="mr-2" />
                        Confirm Booking
                    </Button>
                </div>
            </div>
        </div>
    );
};
