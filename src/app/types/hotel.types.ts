export interface Room {
    id: number;
    name: string;
    type: RoomType;
    price: number;
    capacity: number;
    size: number;
    image: string;
    amenities: string[];
    available: boolean;
}

export type RoomType = 'standard' | 'deluxe' | 'suite' | 'family' | 'all';

export interface BookingForm {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: RoomType;
}

export interface Amenity {
    icon: any; // You might want to use a more specific type
    label: string;
    description: string;
}
