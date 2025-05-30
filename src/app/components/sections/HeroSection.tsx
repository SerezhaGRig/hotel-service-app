"use client"

import React from 'react';
import {MapPin, Star, ArrowDown, Sparkles} from 'lucide-react';
import {Button} from '@/app/components/ui/Button';

export const HeroSection: React.FC = () => {
    const scrollToRooms = () => {
        document.getElementById('rooms')?.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <section className="relative h-screen bg-cover bg-center" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80')"
        }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"/>
            <div className="relative h-full flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                    <div className="animate-fade-in-up">
                        <div className="flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse"/>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Welcome to
                            <span
                                className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Luxury Redefined
              </span>
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 text-white/90">
                            Experience comfort and elegance in the heart of the city
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-lg mb-8">
                            <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                                <MapPin size={20} className="mr-2"/>
                                <span>Downtown Location</span>
                            </div>
                            <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                                <Star size={20} className="mr-2 fill-current text-yellow-400"/>
                                <span>4.8/5 Rating</span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={scrollToRooms} variant="secondary" size="lg">
                                Explore Our Rooms
                                <ArrowDown className="ml-2 animate-bounce" size={20}/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
