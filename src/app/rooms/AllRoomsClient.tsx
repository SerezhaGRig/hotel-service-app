"use client"

import React, { useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { RoomCard } from '@/app/components/ui/RoomCard';
import { BookingForm, Room, RoomType } from '@/app/types/hotel.types';
import { rooms } from '@/app/data/mockData';
import { DatePickerModal } from '@/app/components/modals/DatePickerModal';
import { BookingModal } from '@/app/components/modals/BookingModal';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';

export default function AllRoomsClient() {
    const router = useRouter();
    const [booking, setBooking] = useState<BookingForm>({
        checkIn: '',
        checkOut: '',
        guests: 2,
        roomType: 'all'
    });
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const roomTypes: RoomType[] = ['all', 'standard', 'deluxe', 'suite', 'family'];

    // Get all unique amenities
    const allAmenities = Array.from(
        new Set(rooms.flatMap(room => room.amenities))
    );

    const filteredRooms = rooms.filter(room => {
        const typeMatch = booking.roomType === 'all' || room.type === booking.roomType;
        const priceMatch = room.price >= priceRange.min && room.price <= priceRange.max;
        const amenityMatch = selectedAmenities.length === 0 ||
            selectedAmenities.every(amenity => room.amenities.includes(amenity));

        return typeMatch && priceMatch && amenityMatch;
    });

    const handleBookRoom = (room: Room) => {
        setSelectedRoom(room);

        if (!booking.checkIn || !booking.checkOut) {
            setShowDatePicker(true);
        } else {
            setShowBookingModal(true);
        }
    };

    const handleViewDetails = (roomId: number) => {
        router.push(`/rooms/${roomId}`);
    };

    const confirmBooking = () => {
        alert(`Booking confirmed for ${selectedRoom?.name}!`);
        setShowBookingModal(false);
        setSelectedRoom(null);
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

            <section className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Our Rooms
              </span>
                        </h1>
                        <p className="text-xl text-gray-600">Find your perfect stay</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
                                <div className="flex items-center mb-6">
                                    <Filter className="mr-2 text-blue-600" size={24} />
                                    <h2 className="text-xl font-semibold">Filters</h2>
                                </div>

                                {/* Room Type Filter */}
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Room Type</h3>
                                    <div className="space-y-2">
                                        {roomTypes.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setBooking({...booking, roomType: type})}
                                                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                                    booking.roomType === type
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Price Range</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-gray-600">
                                                Min: ${priceRange.min}
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="500"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">
                                                Max: ${priceRange.max}
                                            </label>
                                            <input
                                                type="range"
                                                min="100"
                                                max="1000"
                                                value={priceRange.max}
                                                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Amenities Filter */}
                                <div>
                                    <h3 className="font-medium mb-3">Amenities</h3>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {allAmenities.map((amenity) => (
                                            <label key={amenity} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAmenities.includes(amenity)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedAmenities([...selectedAmenities, amenity]);
                                                        } else {
                                                            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                                                        }
                                                    }}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{amenity}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rooms Grid */}
                        <div className="lg:col-span-3">
                            <div className="mb-4 flex justify-between items-center">
                                <p className="text-gray-600">
                                    Showing {filteredRooms.length} of {rooms.length} rooms
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredRooms.map((room, index) => (
                                    <div key={room.id} className="relative group">
                                        <RoomCard
                                            room={room}
                                            onBook={handleBookRoom}
                                            index={index}
                                        />
                                        <button
                                            onClick={() => handleViewDetails(room.id)}
                                            className="absolute inset-0 z-10"
                                            aria-label={`View details for ${room.name}`}
                                        >
                                            <span className="sr-only">View details</span>
                                        </button>
                                        <div className="relative z-20 pointer-events-none">
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleBookRoom(room);
                                                    }}
                                                    className="pointer-events-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredRooms.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-lg">No rooms match your criteria</p>
                                    <button
                                        onClick={() => {
                                            setBooking({...booking, roomType: 'all'});
                                            setPriceRange({ min: 0, max: 1000 });
                                            setSelectedAmenities([]);
                                        }}
                                        className="mt-4 text-blue-600 hover:text-blue-700"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modals */}
            {showDatePicker && selectedRoom && (
                <DatePickerModal
                    selectedRoom={selectedRoom}
                    booking={booking}
                    onBookingChange={setBooking}
                    onClose={() => {
                        setShowDatePicker(false);
                        setSelectedRoom(null);
                    }}
                    onContinue={handleDateSelection}
                />
            )}

            {showBookingModal && selectedRoom && (
                <BookingModal
                    selectedRoom={selectedRoom}
                    booking={booking}
                    onClose={() => setShowBookingModal(false)}
                    onConfirm={confirmBooking}
                />
            )}

            <Footer />
        </div>
    );
}
