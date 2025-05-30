import { Room, Amenity } from '@/app/types/hotel.types';
import { Wifi, Car, Coffee, Dumbbell } from 'lucide-react';

export const rooms: Room[] = [
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

export const amenities: Amenity[] = [
    { icon: Wifi, label: "Free WiFi", description: "High-speed internet throughout" },
    { icon: Car, label: "Free Parking", description: "Secure valet parking service" },
    { icon: Coffee, label: "Restaurant", description: "Award-winning fine dining" },
    { icon: Dumbbell, label: "Fitness Center", description: "24/7 modern equipment" }
];
