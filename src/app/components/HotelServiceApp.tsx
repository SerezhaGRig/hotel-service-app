"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Star, Menu, X, Wifi, Car, Coffee, Dumbbell, Phone, Mail, Clock, ChevronRight, Check, Sparkles, ArrowDown } from 'lucide-react';

// Types
interface Room {
    id: number;
    name: string;
    type: string;
    price: number;
    capacity: number;
    size: number;
    image: string;
    amenities: string[];
    available: boolean;
}

interface BookingForm {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
}

// Sample data
const rooms: Room[] = [
    {
        id: 1,
        name: "Deluxe Ocean View",
        type: "deluxe",
        price: 299,
        capacity: 2,
        size: 45,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
        amenities: ["Ocean View", "King Bed", "Mini Bar", "Balcony"],
        available: true
    },
    {
        id: 2,
        name: "Executive Suite",
        type: "suite",
        price: 499,
        capacity: 4,
        size: 75,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        amenities: ["City View", "Living Room", "Kitchen", "Work Desk"],
        available: true
    },
    {
        id: 3,
        name: "Standard Room",
        type: "standard",
        price: 149,
        capacity: 2,
        size: 30,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        amenities: ["Queen Bed", "City View", "Work Desk"],
        available: true
    },
    {
        id: 4,
        name: "Family Suite",
        type: "family",
        price: 399,
        capacity: 6,
        size: 90,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
        amenities: ["Two Bedrooms", "Kitchen", "Living Area", "Balcony"],
        available: true
    }
];

const amenities = [
    { icon: Wifi, label: "Free WiFi", description: "High-speed internet throughout" },
    { icon: Car, label: "Free Parking", description: "Secure valet parking service" },
    { icon: Coffee, label: "Restaurant", description: "Award-winning fine dining" },
    { icon: Dumbbell, label: "Fitness Center", description: "24/7 modern equipment" }
];

export default function HotelServiceApp() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [booking, setBooking] = useState<BookingForm>({
        checkIn: '',
        checkOut: '',
        guests: 2,
        roomType: 'all'
    });
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredRooms = rooms.filter(room =>
        booking.roomType === 'all' || room.type === booking.roomType
    );

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

    const scrollToRooms = () => {
        document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Navigation */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                                scrolled ? 'text-gray-900' : 'text-white'
                            }`}>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LuxStay
                </span>
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className={`transition-all duration-300 hover:text-blue-600 ${
                                scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                            }`}>Home</a>
                            <a href="#rooms" className={`transition-all duration-300 hover:text-blue-600 ${
                                scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                            }`}>Rooms</a>
                            <a href="#amenities" className={`transition-all duration-300 hover:text-blue-600 ${
                                scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                            }`}>Amenities</a>
                            <a href="#contact" className={`transition-all duration-300 hover:text-blue-600 ${
                                scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                            }`}>Contact</a>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                                Book Now
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`transition-colors duration-300 ${
                                    scrolled ? 'text-gray-700' : 'text-white'
                                }`}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ${
                    isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden bg-white`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                        <a href="#rooms" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Rooms</a>
                        <a href="#amenities" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Amenities</a>
                        <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen bg-cover bg-center" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80')"
            }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl mx-auto">
                        <div className="animate-fade-in-up">
                            <div className="flex items-center justify-center mb-6">
                                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                Welcome to
                                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Luxury Redefined
                </span>
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 text-white/90">
                                Experience comfort and elegance in the heart of the city
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-lg mb-8">
                                <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                                    <MapPin size={20} className="mr-2" />
                                    <span>Downtown Location</span>
                                </div>
                                <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                                    <Star size={20} className="mr-2 fill-current text-yellow-400" />
                                    <span>4.8/5 Rating</span>
                                </div>
                            </div>
                            <button
                                onClick={scrollToRooms}
                                className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Explore Our Rooms
                                <ArrowDown className="ml-2 animate-bounce" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rooms Section */}
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
                            {['all', 'standard', 'deluxe', 'suite', 'family'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setBooking({...booking, roomType: type})}
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
                            <div
                                key={room.id}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                                onMouseEnter={() => setHoveredRoom(room.id)}
                                onMouseLeave={() => setHoveredRoom(null)}
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
                                    {hoveredRoom === room.id && (
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

                                    <button
                                        onClick={() => handleBookRoom(room)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group"
                                    >
                                        Book Now
                                        <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section id="amenities" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premium Amenities
              </span>
                        </h2>
                        <p className="text-xl text-gray-600">Everything you need for a perfect stay</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {amenities.map((amenity, index) => (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 text-center"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <amenity.icon size={36} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{amenity.label}</h3>
                                <p className="text-gray-600 text-sm">{amenity.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="animate-fade-in">
                            <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Get in Touch
                </span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { icon: MapPin, title: "Address", info: "123 Luxury Avenue, Downtown City, 12345" },
                                    { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
                                    { icon: Mail, title: "Email", info: "info@luxstayhotels.com" },
                                    { icon: Clock, title: "Reception", info: "24/7 Service" }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <item.icon className="text-blue-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                            <p className="text-gray-600">{item.info}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <button
                                    onClick={() => alert('Message sent! We will get back to you soon.')}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Date Picker Modal */}
            {showDatePicker && selectedRoom && (
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
                                        onChange={(e) => setBooking({...booking, checkIn: e.target.value})}
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
                                        onChange={(e) => setBooking({...booking, checkOut: e.target.value})}
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
                            <button
                                onClick={() => {
                                    setShowDatePicker(false);
                                    setSelectedRoom(null);
                                }}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDateSelection}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold flex items-center justify-center"
                            >
                                Continue
                                <ChevronRight size={20} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {showBookingModal && selectedRoom && (
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
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${selectedRoom.price}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBooking}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold flex items-center justify-center"
                            >
                                <Check size={20} className="mr-2" />
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LuxStay Hotels
            </span>
                    </h3>
                    <p className="text-gray-400 mb-8">Experience luxury redefined</p>
                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
                    </div>
                    <p className="text-gray-500">© 2024 LuxStay Hotels. All rights reserved.</p>
                </div>
            </footer>

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
