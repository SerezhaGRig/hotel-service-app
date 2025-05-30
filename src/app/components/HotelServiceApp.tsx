"use client"

import React, { useState } from 'react';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { RoomsSection } from './sections/RoomsSection';
import { AmenitiesSection } from './sections/AmenitiesSection';
import { ContactSection } from './sections/ContactSection';
import { DatePickerModal } from './modals/DatePickerModal';
import { BookingModal } from './modals/BookingModal';
import { Room, BookingForm } from '@/app/types/hotel.types';
import '@/app/styles/animations.css';

export default function HotelServiceApp() {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [booking, setBooking] = useState<BookingForm>({
        checkIn: '',
        checkOut: '',
        guests: 2,
        roomType: 'all'
    });
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleBookRoom = (room: Room) => {
        setSelectedRoom(room);

        if (!booking.checkIn || !booking.checkOut) {
            setShowDatePicker(true);
        } else {
            setShowBookingModal(true);
        }
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
            <HeroSection />
            <RoomsSection
                booking={booking}
                onBookingChange={setBooking}
                onBookRoom={handleBookRoom}
            />
            <AmenitiesSection />
            <ContactSection />

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
