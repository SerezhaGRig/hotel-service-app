"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Room, BookingForm } from '@/app/types/hotel.types';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { DatePickerModal } from '@/app/components/modals/DatePickerModal';
import { BookingModal } from '@/app/components/modals/BookingModal';
import { Button } from '@/app/components/ui/Button';
import { MapPin, Users, Wifi, Car, Coffee, Bed, Bath, Tv, AirVent, ChevronLeft, Star, Calendar } from 'lucide-react';
import Image from 'next/image';

interface RoomDetailClientProps {
    room: Room;
}

// Extended amenity icons mapping
const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Parking': Car,
    'Restaurant': Coffee,
    'King Bed': Bed,
    'Queen Bed': Bed,
    'Mini Bar': Coffee,
    'TV': Tv,
    'Air Conditioning': AirVent,
    'Bathroom': Bath,
};

export default function RoomDetailClient({ room }: RoomDetailClientProps) {
    const router = useRouter();
    const [booking, setBooking] = useState<BookingForm>({
        checkIn: '',
        checkOut: '',
        guests: 2,
        roomType: room.type
    });
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Mock additional images for the gallery
    const roomImages = [
        room.image,
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
        "https://images.unsplash.com/photo-1595599512948-b9831b5e34e3?w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80"
    ];

    const handleBookRoom = () => {
        if (!booking.checkIn || !booking.checkOut) {
            setShowDatePicker(true);
        } else {
            setShowBookingModal(true);
        }
    };

    const confirmBooking = () => {
        alert(`Booking confirmed for ${room.name}!`);
        setShowBookingModal(false);
    };

    const handleDateSelection = () => {
        if (!booking.checkIn || !booking.checkOut) {
            alert('Please select both check-in and check-out dates');
            return;
        }

        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);

        if (checkOut <= checkIn) {
            alert('Check-out date must be after check-in date');
            return;
        }

        setShowDatePicker(false);
        setShowBookingModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            {/* Hero Section with Gallery */}
            <section className="pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
                    >
                        <ChevronLeft size={20} className="mr-2" />
                        Back to Rooms
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div>
                            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={roomImages[selectedImageIndex]}
                                    alt={room.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {roomImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`relative h-20 rounded-lg overflow-hidden ${
                                            selectedImageIndex === index ? 'ring-2 ring-blue-600' : ''
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${room.name} view ${index + 1}`}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Room Details */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{room.name}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="ml-1 text-gray-700">4.8 (324 reviews)</span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center text-gray-700">
                                    <MapPin size={18} className="mr-1" />
                                    <span>{room.size} m²</span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center text-gray-700">
                                    <Users size={18} className="mr-1" />
                                    <span>Up to {room.capacity} guests</span>
                                </div>
                            </div>

                            <div className="mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${room.price}
                </span>
                                <span className="text-gray-600 text-xl ml-2">per night</span>
                            </div>

                            {/* Quick Booking Section */}
                            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                                <h3 className="text-xl font-semibold mb-4">Quick Booking</h3>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                                            <input
                                                type="date"
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                value={booking.checkIn}
                                                onChange={(e) => setBooking({...booking, checkIn: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                                            <input
                                                type="date"
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                value={booking.checkOut}
                                                onChange={(e) => setBooking({...booking, checkOut: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={handleBookRoom} fullWidth size="lg">
                                    Book Now
                                </Button>
                            </div>

                            {/* Amenities */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {room.amenities.map((amenity, index) => {
                                        const Icon = amenityIcons[amenity] || Coffee;
                                        return (
                                            <div key={index} className="flex items-center text-gray-700">
                                                <Icon size={20} className="mr-3 text-blue-600" />
                                                <span>{amenity}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-semibold mb-4">About this room</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Experience luxury and comfort in our {room.name}. This beautifully appointed room features
                                modern amenities and elegant décor, perfect for both business and leisure travelers.
                                Enjoy breathtaking views and unparalleled service during your stay.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                The room includes premium bedding, a spacious work area, and a luxurious bathroom
                                with high-end toiletries. Our dedicated staff is available 24/7 to ensure your
                                stay is nothing short of exceptional.
                            </p>
                        </div>

                        <div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-semibold mb-4">House Rules</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        Check-in: 3:00 PM - 11:00 PM
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        Check-out: Until 11:00 AM
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        No smoking
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        No pets allowed
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        No parties or events
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modals */}
            {showDatePicker && (
                <DatePickerModal
                    selectedRoom={room}
                    booking={booking}
                    onBookingChange={setBooking}
                    onClose={() => setShowDatePicker(false)}
                    onContinue={handleDateSelection}
                />
            )}

            {showBookingModal && (
                <BookingModal
                    selectedRoom={room}
                    booking={booking}
                    onClose={() => setShowBookingModal(false)}
                    onConfirm={confirmBooking}
                />
            )}

            <Footer />
        </div>
    );
}
