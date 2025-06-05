"use client"

import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Star, Calendar, Users, MapPin, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

interface Room {
    id: number;
    name: string;
    type: string;
    price: string;
    image: string;
    description: string;
}

interface Testimonial {
    id: number;
    name: string;
    rating: number;
    text: string;
    date: string;
}

const LuxuryHotel: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeRoom, setActiveRoom] = useState(0);

    // Hero slider images
    const heroImages = [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920'
    ];

    // Rooms data
    const rooms: Room[] = [
        {
            id: 1,
            name: 'Suite Impériale',
            type: 'Presidential Suite',
            price: '€15,000',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            description: 'The epitome of Parisian luxury with breathtaking views of Place Vendôme'
        },
        {
            id: 2,
            name: 'Suite Vendôme',
            type: 'Luxury Suite',
            price: '€8,500',
            image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
            description: 'Elegant suite combining classic French style with modern comfort'
        },
        {
            id: 3,
            name: 'Chambre Deluxe',
            type: 'Deluxe Room',
            price: '€3,200',
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
            description: 'Sophisticated comfort in the heart of Paris'
        }
    ];

    // Testimonials
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Alexandra M.',
            rating: 5,
            text: 'An unforgettable experience. The service was impeccable and the attention to detail extraordinary.',
            date: 'March 2024'
        },
        {
            id: 2,
            name: 'James W.',
            rating: 5,
            text: 'The epitome of luxury. Every moment at Le Grand felt like a royal experience.',
            date: 'February 2024'
        },
        {
            id: 3,
            name: 'Sophie L.',
            rating: 5,
            text: 'Simply magnificent. The spa treatments and dining exceeded all expectations.',
            date: 'January 2024'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center space-x-12">
                        <h1 className={`text-2xl font-serif tracking-wider transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                            LE GRAND
                        </h1>
                        <div className="hidden lg:flex space-x-8">
                            {['Rooms', 'Dining', 'Spa', 'Events', 'Gallery'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-sm tracking-wide transition-colors duration-300 hover:opacity-70 ${
                                        scrolled ? 'text-gray-700' : 'text-white'
                                    }`}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className={`hidden lg:block px-6 py-2 border text-sm tracking-wide transition-all duration-300 ${
                            scrolled
                                ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                                : 'border-white text-white hover:bg-white hover:text-gray-900'
                        }`}>
                            BOOK NOW
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`lg:hidden transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {['Rooms', 'Dining', 'Spa', 'Events', 'Gallery'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-2xl text-gray-900 hover:opacity-70"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <button className="mt-8 px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                        BOOK NOW
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden">
                {heroImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Luxury hotel ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                    </div>
                ))}

                <div className="relative h-full flex items-center justify-center text-white">
                    <div className="text-center">
                        <h2 className="text-6xl md:text-8xl font-serif mb-4 animate-fade-in">Le Grand</h2>
                        <p className="text-xl md:text-2xl tracking-widest mb-8 animate-fade-in-delay">PARIS</p>
                        <p className="text-lg mb-12 max-w-2xl mx-auto px-6 animate-fade-in-delay-2">
                            Experience the pinnacle of French elegance in the heart of Place Vendôme
                        </p>
                        <div className="animate-bounce mt-12">
                            <ChevronDown size={32} className="mx-auto" />
                        </div>
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
                >
                    <ChevronLeft size={40} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
                >
                    <ChevronRight size={40} />
                </button>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl font-serif mb-8">Welcome to Le Grand Paris</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Since 1898, Le Grand has been the symbol of Parisian luxury and refinement.
                        Our legendary hotel, located on the prestigious Place Vendôme, offers an
                        unparalleled experience where French art de vivre meets contemporary comfort.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        From our Michelin-starred restaurants to our world-renowned spa, every detail
                        has been carefully curated to create unforgettable moments for our distinguished guests.
                    </p>
                </div>
            </section>

            {/* Rooms Section */}
            <section id="rooms" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-4xl font-serif text-center mb-16">Rooms & Suites</h3>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {rooms.map((room, index) => (
                            <div
                                key={room.id}
                                className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                                onMouseEnter={() => setActiveRoom(index)}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${
                                            activeRoom === index ? 'scale-110' : 'scale-100'
                                        }`}
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 text-sm">
                                        {room.type}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-2xl font-serif mb-2">{room.name}</h4>
                                    <p className="text-gray-600 mb-4">{room.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl text-gray-900">{room.price}<span className="text-sm text-gray-500">/night</span></span>
                                        <button className="text-sm border-b border-gray-900 hover:border-gray-600 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-4xl font-serif text-center mb-16">Exceptional Services</h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Users, title: 'Concierge', desc: '24/7 personalized service' },
                            { icon: Calendar, title: 'Event Planning', desc: 'Bespoke celebrations' },
                            { icon: Star, title: 'Michelin Dining', desc: 'Three-star restaurant' },
                            { icon: MapPin, title: 'Prime Location', desc: 'Heart of Place Vendôme' }
                        ].map((service, index) => (
                            <div key={index} className="text-center group">
                                <div className="mb-4 inline-block p-4 bg-gray-100 rounded-full group-hover:bg-gray-900 transition-colors duration-300">
                                    <service.icon size={32} className="text-gray-900 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h4 className="text-xl font-serif mb-2">{service.title}</h4>
                                <p className="text-gray-600">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-4xl font-serif text-center mb-16">Guest Experiences</h3>

                    <div className="space-y-12">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="text-center">
                                <div className="flex justify-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-xl italic mb-4">"{testimonial.text}"</p>
                                <p className="text-sm">
                                    {testimonial.name} • {testimonial.date}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-4xl font-serif mb-12">Visit Le Grand</h3>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="flex flex-col items-center">
                            <MapPin size={24} className="mb-4 text-gray-700" />
                            <p className="text-gray-600">
                                15 Place Vendôme<br />
                                75001 Paris, France
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Phone size={24} className="mb-4 text-gray-700" />
                            <p className="text-gray-600">
                                +33 1 43 16 30 30<br />
                                Reservations 24/7
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Mail size={24} className="mb-4 text-gray-700" />
                            <p className="text-gray-600">
                                reservations@legrand.paris<br />
                                info@legrand.paris
                            </p>
                        </div>
                    </div>

                    <button className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300">
                        MAKE A RESERVATION
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h4 className="text-2xl font-serif mb-2">LE GRAND</h4>
                            <p className="text-gray-400">Luxury Redefined Since 1898</p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Careers</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Press</a>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
      `}</style>
        </div>
    );
};

export default LuxuryHotel;
