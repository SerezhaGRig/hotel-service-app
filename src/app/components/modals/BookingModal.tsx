"use client"

import React, { useState } from 'react';
import { Check, User, Mail, Phone } from 'lucide-react';
import { Room, BookingForm } from '@/app/types/hotel.types';
import { Button } from '@/app/components/ui/Button';

interface BookingModalProps {
    selectedRoom: Room;
    booking: BookingForm;
    onClose: () => void;
    onConfirm: () => void;
}

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
                                                              selectedRoom,
                                                              booking,
                                                              onClose,
                                                              onConfirm
                                                          }) => {
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

    const calculateNights = () => {
        if (!booking.checkIn || !booking.checkOut) return 1;
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    };

    const validateForm = () => {
        const newErrors: Partial<CustomerInfo> = {};

        if (!customerInfo.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!customerInfo.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!customerInfo.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-()]+$/.test(customerInfo.phone)) {
            newErrors.phone = 'Phone number is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirm = () => {
        if (validateForm()) {
            // In a real app, you would send customerInfo along with booking data
            console.log('Booking confirmed with customer info:', customerInfo);
            onConfirm();
        }
    };

    const handleInputChange = (field: keyof CustomerInfo, value: string) => {
        setCustomerInfo({ ...customerInfo, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    const nights = calculateNights();
    const totalPrice = selectedRoom.price * nights;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl transform animate-scale-in">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Confirm Your Booking</h3>

                {/* Room and Booking Details */}
                <div className="space-y-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <h4 className="font-semibold text-lg text-gray-900">{selectedRoom.name}</h4>
                        <p className="text-blue-600 font-bold text-xl">${selectedRoom.price} per night</p>
                    </div>

                    <div className="space-y-2 text-sm">
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

                {/* Customer Information Form */}
                <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-lg text-gray-900">Your Information</h4>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <User size={16} className="inline mr-1" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                                errors.name ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail size={16} className="inline mr-1" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                                errors.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="john@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Phone size={16} className="inline mr-1" />
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                                errors.phone ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-600 mb-6">
                    By confirming this booking, you agree to our terms and conditions and privacy policy.
                </p>

                <div className="flex space-x-4">
                    <Button onClick={onClose} variant="outline" fullWidth>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} fullWidth>
                        <Check size={20} className="mr-2" />
                        Confirm Booking
                    </Button>
                </div>
            </div>
        </div>
    );
};
